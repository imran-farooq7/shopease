import Image from "next/image";

interface Props {
	product: {
		id: string;
		name: string;
		price: string | null;
		image: string;
		currency: string;
	};
}
const Product = ({ product: { name, image } }: Props) => {
	return (
		<div>
			<Image src={image} width={400} height={400} alt={name} />
			{name}
		</div>
	);
};
export default Product;
