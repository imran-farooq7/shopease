import { priceFormatter } from "@/utils/priceFormat";
import Image from "next/image";
import Link from "next/link";
import { format } from "path";

interface Props {
	product: {
		id: string;
		name: string;
		price: number | null;
		image: string;
		currency: string;
		description: string | null;
		quantity?: number | 1;
	};
}
const Product = ({
	product: { name, image, price, description, id },
}: Props) => {
	return (
		<Link
			href={{
				pathname: `/product/${id}`,
				query: {
					name,
					description,
					price,
					image,
					id,
				},
			}}
			className="cursor-pointer"
		>
			<div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl max-w-96 h-full">
				<div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-full">
					<Image
						alt="card-image"
						src={image}
						className="object-cover"
						width={400}
						height={400}
					/>
				</div>
				<div className="p-6">
					<div className="flex items-center justify-between mb-2">
						<p className="block font-sans text-base antialiased font-medium leading-relaxed text-teal-600">
							{name}
						</p>
						<p className="block font-sans text-base antialiased font-medium leading-relaxed text-teal-600">
							{priceFormatter(price!)}
						</p>
					</div>
					<p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75 h-full">
						{description}
					</p>
				</div>
			</div>
		</Link>
	);
};
export default Product;
