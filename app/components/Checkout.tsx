"use client";

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartState } from "@/store/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY as string);

const Checkout = () => {
	const cartState = useCartState();
	const router = useRouter();
	const [clientSecret, setClientSecret] = useState("");
	useEffect(() => {
		const createCustomerPaymentIntent = async () => {
			const res = await fetch("/api/create-payment-intent", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					cart: cartState.cart,
					payment_intent_id: cartState.paymentIntent,
				}),
			});
			if (res.status === 403) {
				router.push("/api/auth/signin");
			}
			const data = await res.json();
			return data;
		};
		createCustomerPaymentIntent();
	}, []);

	return <div>Checkout</div>;
};
export default Checkout;
