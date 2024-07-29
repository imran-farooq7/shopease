"use client";

import { useCartStore } from "@/store/CartProvider";
import { priceFormatter } from "@/utils/priceFormat";
import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";
interface Props {
	clientSecret: string;
}

const CheckoutForm = ({ clientSecret }: Props) => {
	const stripe = useStripe();
	const elements = useElements();
	const { cart, setCheckout } = useCartStore();
	const [isLoading, setIsLoading] = useState(false);
	const totalPrice = cart.reduce((acc, item) => {
		return acc + item.price * item.quantity!;
	}, 0);
	useEffect(() => {
		if (!stripe) {
			return;
		}
		if (!clientSecret) {
		}
	}, [stripe, elements]);
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!stripe || !elements) {
			return;
		}
		setIsLoading(true);
		const res = await stripe.confirmPayment({
			elements: elements,
			redirect: "if_required",
		});
		if (!res.error) {
			setCheckout("success");
			setIsLoading(false);
		} else {
			console.log(res.error);
		}
	};

	return (
		<form onSubmit={handleSubmit} id="payment-form">
			<PaymentElement id="payment-element" />
			<h1 className="mt-4 font-bold">Total:{priceFormatter(totalPrice)}</h1>
			<button
				className="bg-cyan-400 text-white w-full rounded-lg px-4 py-2 mt-4"
				type="submit"
				disabled={isLoading || !stripe || !elements}
			>
				<span id="button-text">
					{isLoading ? <span>Processing....</span> : <span>Pay Now</span>}
				</span>
			</button>
		</form>
	);
};
export default CheckoutForm;
