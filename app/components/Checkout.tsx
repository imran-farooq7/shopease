import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { FiSettings } from "react-icons/fi";
import { useCartStore } from "@/store/CartProvider";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Checkout = () => {
	const { cart, paymentIntent, setPaymentIntent } = useCartStore();
	const router = useRouter();
	const [clientSecret, setClientSecret] = useState("");

	const createCustomerPaymentIntent = async () => {
		const res = await fetch("/api/create-payment-intent", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				cart: cart,
				payment_intent_id: paymentIntent,
			}),
		});
		if (res.status === 403) {
			router.push("/api/auth/signin");
		}
		const data = await res.json();
		setClientSecret(data.paymentIntent.client_secret);
		setPaymentIntent(data.paymentIntent.id);
	};

	useEffect(() => {
		createCustomerPaymentIntent();
	}, []);
	const options: StripeElementsOptions = {
		clientSecret,
		appearance: {
			theme: "stripe",
			labels: "floating",
		},
	};
	return (
		<div>
			{!clientSecret && (
				<div className="flex items-center w-full justify-center">
					<p className="mr-2">Your order is being processed</p>
					<FiSettings
						size={24}
						className="animate-spin text-center text-black"
					/>
				</div>
			)}
			{clientSecret && (
				<div>
					<Elements stripe={stripePromise} options={options}>
						<CheckoutForm clientSecret={clientSecret} />
					</Elements>
				</div>
			)}
		</div>
	);
};

export default Checkout;
