"use client";

import { useCartStore } from "@/store/CartProvider";

interface Props {
	name: string;
	price: number;
	image: string;
	description: string;
	id: string;
	quantity?: number | 1;
}
const AddCart = ({ id, image, name, price, quantity }: Props) => {
	const { addCart } = useCartStore();
	return (
		<button
			className="w-full text-white my-12 font-medium px-7 py-2 rounded-lg bg-sky-500 self-start hover:opacity-70"
			onClick={() =>
				addCart({
					id,
					name,
					image,
					price,
					quantity,
				})
			}
		>
			Add to cart
		</button>
	);
};
export default AddCart;
