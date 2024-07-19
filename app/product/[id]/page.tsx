import { priceFormatter } from "@/utils/priceFormat";
import Image from "next/image";

interface Props {
	searchParams: {
		name: string;
		price: number;
		image: string;
		description: string;
	};
}
const ProductDetails = ({ searchParams }: Props) => {
	const { image, name, price, description } = searchParams;
	return (
		<div className="flex justify-between gap-12 p-12 text-gray-700">
			<Image src={image} alt={name} width={400} height={400} />
			<div>
				<h1 className="font-bold text-3xl text-emerald-400">{name}</h1>
				<p className="my-4">{description}</p>

				<div className="flex gap-4">
					<p className="font-bold text-teal-700 text-2xl">
						{priceFormatter(price)}
					</p>
				</div>
				<button className="text-white my-12 font-medium px-7 py-2 rounded-full bg-teal-400 self-start hover:opacity-70">
					Add to cart
				</button>
			</div>
		</div>
	);
};
export default ProductDetails;
