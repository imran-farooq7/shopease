"use client";
import { useCartState } from "@/store/store";
import { priceFormatter } from "@/utils/priceFormat";
import Image from "next/image";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
const Cart = () => {
	const { toggleCart, cart, removeCart, addCart } = useCartState();
	let content: string | JSX.Element;
	if (cart.length === 0) {
		content = (
			<div className="flex flex-col items-center text-2xl font-medium">
				<h1>Ohhh...it's empty ☹️</h1>
				<Image
					src={"/container.png"}
					width={100}
					height={100}
					alt="empty basket"
				/>
			</div>
		);
	} else {
		content = (
			<>
				<h1>Here's is your shopping list 📃</h1>;
				{cart.map((item) => (
					<div key={item.id} className="flex items-center py-4 gap-3">
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
					</div>
				))}
				<button className="py-2 bg-teal-700 mt-4 w-full rounded-md text-white">
					Checkout
				</button>
				;
			</>
		);
	}
	return (
		<div
			onClick={() => toggleCart()}
			className="fixed w-full h-screen left-0 top-0 bg-black/25 z-50"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="absolute bg-white right-0 w-1/3 h-screen p-12 overflow-y-scroll text-gray-700"
			>
				{content}
			</div>
		</div>
	);
};
export default Cart;
