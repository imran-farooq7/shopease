"use client";
import { useCartState } from "@/store/store";
import { priceFormatter } from "@/utils/priceFormat";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import Checkout from "./Checkout";
import OrderConfirm from "./OrderConfirm";
const Cart = () => {
	const { toggleCart, cart, removeCart, addCart, onCheckout, setCheckout } =
		useCartState();
	const totalPrice = cart.reduce((acc, item) => {
		return acc + item.price * item.quantity!;
	}, 0);
	let content: string | JSX.Element;
	if (cart.length === 0) {
		content = (
			<AnimatePresence>
				<motion.div
					animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
					initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
					exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
					className="flex flex-col items-center gap-3 text-2xl font-medium"
				>
					<button className="text-sm font-medium" onClick={() => toggleCart()}>
						Back to store 🏃
					</button>
					<h1>Ohhh...it's empty ☹️</h1>
					<Image
						src={"/container.png"}
						width={100}
						height={100}
						alt="empty basket"
					/>
				</motion.div>
			</AnimatePresence>
		);
	} else {
		content = (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<h1>Here's is your shopping list 📃</h1>
				{cart.map((item) => (
					<motion.div
						layout
						key={item.id}
						className="flex items-center py-4 gap-3"
					>
						<Image
							className="rounded-md h-24 object-cover"
							src={item.image}
							width={120}
							height={120}
							alt={item.name}
						/>
						<div>
							<h2>{item.name}</h2>
							<div className="flex gap-3">
								<h2>Quantity: {item.quantity}</h2>

								<button onClick={() => removeCart(item)}>
									<IoRemoveCircle />
								</button>
								<button onClick={() => addCart(item)}>
									<IoAddCircle />
								</button>
							</div>
							<p className="text-sm text-teal-500">
								{priceFormatter(item.price)}
							</p>
						</div>
					</motion.div>
				))}
				<p>Total: {priceFormatter(totalPrice)}</p>
				<button
					onClick={() => setCheckout("checkout")}
					className="py-2 bg-teal-700 mt-4 w-full rounded-md text-white"
				>
					Checkout
				</button>
			</motion.div>
		);
	}
	if (onCheckout === "checkout") {
		content = (
			<>
				<button
					className="text-sm font-medium mx-auto block mb-4"
					onClick={() => setCheckout("cart")}
				>
					Back to cart 🛒
				</button>
				<Checkout />
			</>
		);
	}
	if (onCheckout === "success") {
		content = <OrderConfirm />;
	}
	return (
		<div
			onClick={() => toggleCart()}
			className="fixed w-full h-screen left-0 top-0 bg-black/25 z-50"
		>
			<motion.div
				onClick={(e: Event) => e.stopPropagation()}
				layout
				className="absolute bg-white right-0 w-full lg:w-1/3 h-screen p-12 overflow-y-scroll text-gray-700"
			>
				{content}
			</motion.div>
		</div>
	);
};
export default Cart;
