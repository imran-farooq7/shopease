"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/CartProvider";

const OrderConfirm = () => {
	const { setPaymentIntent, emptyCart, setCheckout, toggleCart } =
		useCartStore();
	useEffect(() => {
		setPaymentIntent("");
		emptyCart();
	}, []);

	return (
		<motion.div
			initial={{ scale: 0.5, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
		>
			<div className="flex text-center gap-3 justify-center flex-col items-center">
				<h1 className="text-2xl font-medium">Your order has been placed</h1>
				<h2 className="text-sm">Check your email inbox for receipt</h2>
				<Image
					src="/checkout.svg"
					width={100}
					height={100}
					alt="order confirm"
				/>
			</div>
			<div>
				<Link href={"/dashboard"}>
					<button
						onClick={() => {
							setCheckout("cart");
							toggleCart();
						}}
					>
						Check your order
					</button>
				</Link>
			</div>
		</motion.div>
	);
};
export default OrderConfirm;
