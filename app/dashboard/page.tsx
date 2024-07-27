import { priceFormatter } from "@/utils/priceFormat";
import { getOrders } from "../actions/actions";
import Image from "next/image";

const Dashboard = async () => {
	const data = await getOrders();
	if (data?.error) {
		return (
			<div>
				<h1>Please login in to view order</h1>{" "}
			</div>
		);
	}
	return (
		<div className="text-center">
			{data?.orders?.length === 0 ? (
				<h1>No Orders</h1>
			) : (
				<h1 className="text-3xl font-semibold">Your Orders</h1>
			)}
			<div className="font-medium">
				{data?.orders?.map((order) => (
					<div
						className="my-6 flex flex-col gap-4 lg:flex-row lg:gap-0 justify-between items-center rounded-lg shadow-secondary-1 bg-gray-50 p-6 text-surface"
						key={order.id}
					>
						<div>
							{" "}
							<h2 className="font-semibold">Order reference: {order.id}</h2>
							<p>Time:{new Date(order.createdAt).toLocaleDateString()}</p>
						</div>
						<p className="text-md py-2">
							Status:{" "}
							<span
								className={`${
									order.status === "complete" ? "bg-emerald-500" : "bg-red-600"
								} px-4 ml-3 py-2 rounded-lg text-white`}
							>
								{order.status}
							</span>
						</p>
						<p className="font-semibold text-emerald-600">
							Total: {priceFormatter(order.amount)}
						</p>
						<div className="">
							{order.products.map((product) => (
								<div className="py-2" key={product.id}>
									<h3 className="py-2 font-medium">{product.name}</h3>
									<div className="flex flex-col items-center gap-4">
										<Image
											src={product.image}
											alt="product"
											width={50}
											height={50}
										/>
										<div className="flex gap-2">
											<p className="font-bold text-sm text-emerald-400">
												{priceFormatter(product.price)}
											</p>
											<p className="font-bold text-sm">
												Quantity: {product.quantity}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
export default Dashboard;
