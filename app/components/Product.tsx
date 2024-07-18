import { priceFormatter } from "@/utils/priceFormat";
import Image from "next/image";
import { format } from "path";

interface Props {
	product: {
		id: string;
		name: string;
		price: string | null;
		image: string;
		currency: string;
	};
}
const Product = ({ product: { name, image, price } }: Props) => {
	return (
		<div>
			<Image src={image} width={400} height={400} alt={name} />
			{name}
			{priceFormatter(price!)}
		</div>
	);
};
export default Product;
