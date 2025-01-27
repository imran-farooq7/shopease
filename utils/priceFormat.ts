export const priceFormatter = (price: number) => {
	const formatter = new Intl.NumberFormat("en-US", {
		currency: "USD",
		style: "currency",
	});
	return formatter.format(Number(price));
};
