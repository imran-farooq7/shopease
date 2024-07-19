import { create } from "zustand";
import { persist } from "zustand/middleware";
interface cartItem {
	name: string;
	id: string;
	images?: string[];
	description?: string;
	price: number;
	quantity: number;
}
interface cartStore {
	isOpen: boolean;
	cart: cartItem[];
}
export const useCartState = create<cartStore>()(
	persist(
		(set) => ({
			cart: [],
			isOpen: true,
		}),
		{ name: "cart" }
	)
);
