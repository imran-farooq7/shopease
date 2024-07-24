import { auth } from "@/auth";
import { cartItem } from "@/store/store";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: "2024-06-20",
});
const orderTotalAmount = (items: cartItem[]) => {
	const totalAmount = items.reduce(
		(acc, item) => acc + item.price * item.quantity!,
		0
	);
	return totalAmount;
};
export async function POST(req: NextApiRequest) {
	const session = await auth();
	const { cart, payment_intent_id } = req.body;
	if (!session?.user) {
		return NextResponse.json(
			{ message: "Not logged in" },
			{
				status: 403,
			}
		);
	}
	const orderData = {
		user: { connect: session.user.id },
		totalAmount: orderTotalAmount(cart),
		currency: "usd",
		status: "pending",
		paymentIntentId: payment_intent_id,
		products: {
			create: cart.map((item: cartItem) => ({
				name: item.name,
				description: item.description,
				price: item.price,
				quantity: item.quantity,
			})),
		},
	};
	return NextResponse.json(session.user, { status: 200 });
}
