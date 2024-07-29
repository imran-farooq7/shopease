"use client";

import { User } from "next-auth";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useCartState } from "@/store/store";
import Cart from "./Cart";
import { AiFillShopping } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
	user: User;
}
const Navbar = ({ user }: Props) => {
	const cartStore = useCartState();
	return (
		<nav className="flex justify-between mt-5 items-center">
			<Link href={"/"}>
				<Image
					src={"/shopease.png"}
					width={100}
					height={100}
					alt="logo"
					className="object-cover"
				/>
			</Link>
			<ul className="flex items-center gap-5">
				<li
					className="relative cursor-pointer"
					onClick={() => cartStore.toggleCart()}
				>
					<AiFillShopping size={30} />
					<AnimatePresence>
						{cartStore.cart.length > 0 && (
							<motion.span
								animate={{ scale: 1 }}
								initial={{ scale: 0 }}
								exit={{ scale: 0 }}
								className="absolute flex items-center justify-center font-bold bg-teal-700 text-sm text-white rounded-full w-5 h-5 left-4 bottom-4"
							>
								{cartStore.cart.length}
							</motion.span>
						)}
					</AnimatePresence>
				</li>
				<li>
					{!user && <button onClick={() => signIn("google")}>Sign In</button>}
					{user && (
						<div className="flex gap-3 items-center cursor-pointer dropdown dropdown-bottom dropdown-left">
							<Image
								src={user.image!}
								width={40}
								height={40}
								alt={user.name!}
								className="rounded-full"
								tabIndex={0}
							/>
							<ul
								tabIndex={0}
								className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-4 shadow"
							>
								<li className="my-3">
									<Link
										href={"/dashboard"}
										className="hover:bg-base-300 p-4 rounded-md"
									>
										Orders
									</Link>
								</li>
								<li>
									<button
										className="bg-red-400 px-6 py-3 rounded-lg text-white text-sm hover:bg-red-600"
										onClick={() => signOut()}
									>
										Sign Out
									</button>
								</li>
							</ul>
						</div>
					)}
				</li>
			</ul>
			<AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
		</nav>
	);
};
export default Navbar;
