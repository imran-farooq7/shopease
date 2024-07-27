import prisma from "@/prisma/client";
import Stripe from "stripe";
import { buffer } from "stream/consumers";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: "2024-06-20",
});
export async function POST(req: NextRequest) {
	const sig = req.headers.get("stripe-signature") as string;
	const body = await req.text();

	console.log(sig, "signature");

	let event: Stripe.Event;
	if (!sig) {
		return NextResponse.json("missing stripe signature", { status: 400 });
	}

	try {
		event = stripe.webhooks.constructEvent(
			body,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET!
		);
	} catch (error) {
		return NextResponse.json(
			{ error: `Webhook Error: stripe webhook error` },
			{ status: 400 }
		);
	}
	if (event.type === "charge.succeeded") {
		const charge = event.data.object as Stripe.Charge;
		if (typeof charge.payment_intent === "string") {
			await prisma.order.update({
				where: {
					paymentIntentId: charge.payment_intent,
				},
				data: {
					status: "complete",
				},
			});
		}
	}

	return NextResponse.json({ received: true });
}
