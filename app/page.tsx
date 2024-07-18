import Stripe from "stripe";
import Product from "./components/Product";

const getProducts = async () => {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
		apiVersion: "2024-06-20",
	});
	const products = await stripe.products.list();
	const productsWithPrice = await Promise.all(
		products.data.map(async (product) => {
			const prices = await stripe.prices.list({ product: product.id });
			return {
				id: product.id,
				name: product.name,
				price: prices.data[0].unit_amount_decimal,
				image: product.images[0],
				currency: prices.data[0].currency,
			};
		})
	);
	return productsWithPrice;
};

const Home = async () => {
	const products = await getProducts();
	return (
		<div>
			{products.map((product) => (
				<Product product={product} key={product.id} />
			))}
		</div>
	);
};
export default Home;
