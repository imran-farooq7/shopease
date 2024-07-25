import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { cartItem } from "@/store/store";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: "2024-06-20",
});

const orderTotalAmount = (items: cartItem[]) => {
	const totalAmount = items?.reduce(
		(acc, item) => acc + item.price * item.quantity!,
		0
	);
	return totalAmount;
};

export async function POST(req: NextRequest) {
	const session = await auth();
	const body = await req.json();
	const { cart, payment_intent_id } = body;

	if (!session?.user) {
		return NextResponse.json(
			{ message: "Not logged in" },
			{
				status: 403,
			}
		);
	}

	const orderData = {
		userId: session.user.id!,
		amount: orderTotalAmount(cart),
		currency: "usd",
		status: "pending",
		paymentIntentId: payment_intent_id,
		products: {
			create: cart?.map((item: any) => ({
				name: item.name,
				description: item.description,
				price: parseFloat(item.price),
				quantity: item.quantity,
				image: item.image,
			})),
		},
	};

	try {
		if (payment_intent_id) {
			console.log("Existing payment intent:", payment_intent_id);
			const currentIntent = await stripe.paymentIntents.retrieve(
				payment_intent_id
			);
			if (currentIntent) {
				const updatePaymentIntent = await stripe.paymentIntents.update(
					payment_intent_id,
					{
						amount: orderTotalAmount(cart) * 100,
					}
				);
				const existingOrder = await prisma.order.findFirst({
					where: { paymentIntentId: updatePaymentIntent.id },
					include: { products: true },
				});
				if (!existingOrder) {
					console.log("Invalid payment intent");
					return NextResponse.json(
						{ message: "Invalid payment intent" },
						{ status: 400 }
					);
				}
				const updatedOrder = await prisma.order.update({
					where: { id: existingOrder.id },
					data: {
						amount: orderTotalAmount(cart),
						products: {
							deleteMany: {},
							create: cart.map((item: any) => ({
								name: item.name,
								description: item.description,
								price: parseFloat(item.price),
								quantity: item.quantity,
								image: item.image,
							})),
						},
					},
				});
				return NextResponse.json(
					{ paymentIntent: updatePaymentIntent },
					{ status: 200 }
				);
			}
		} else {
			console.log("Creating new payment intent");
			const paymentIntent = await stripe.paymentIntents.create({
				amount: orderTotalAmount(cart) * 100,
				currency: "usd",
				automatic_payment_methods: { enabled: true },
			});
			const newOrder = await prisma.order.create({
				data: {
					amount: orderData.amount,
					paymentIntentId: paymentIntent.id,
					status: orderData.status,
					userId: orderData.userId,
					products: orderData.products,
				},
			});
			return NextResponse.json({ paymentIntent }, { status: 200 });
		}
	} catch (error) {
		console.error("Error processing request:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}
