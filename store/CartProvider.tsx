"use client";

import React, { createContext, useContext, useRef } from "react";
import { createCartStore } from "./store";
import { useStore } from "zustand";

export type CartStoreApi = ReturnType<typeof createCartStore>;
export const CartStoreContext = createContext<CartStoreApi | undefined>(
	undefined
);
export interface CartStoreProps {
	children: React.ReactNode;
}
export const CartStoreProvider = ({ children }: CartStoreProps) => {
	const storeRef = useRef<CartStoreApi>();
	if (!storeRef.current) {
		storeRef.current = createCartStore();
	}

	return (
		<CartStoreContext.Provider value={storeRef.current}>
			{children}
		</CartStoreContext.Provider>
	);
};
export const useCartStore = () => {
	const cartStoreContext = useContext(CartStoreContext);

	if (!cartStoreContext) {
		throw new Error(`useCounterStore must be used within CounterStoreProvider`);
	}

	return useStore(cartStoreContext);
};
