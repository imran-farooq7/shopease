"use client";

import { User } from "next-auth";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useCartState } from "@/store/store";
import Cart from "./Cart";
import { AiFillShopping } from "react-icons/ai";

interface Props {
	user: User;
}
const Navbar = ({ user }: Props) => {
	const cartStore = useCartState();
	console.log(cartStore.isOpen);
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
				<li className="relative cursor-pointer ">
					<AiFillShopping size={30} />
					<span className="absolute flex items-center justify-center font-bold bg-teal-700 text-sm text-white rounded-full w-5 h-5 left-4 bottom-4">
						{cartStore.cart.length}
					</span>
				</li>
				<li>
					{!user && <button onClick={() => signIn("google")}>Sign In</button>}
					{user && (
						<Image
							src={user.image!}
							width={40}
							height={40}
							alt={user.name!}
							className="rounded-full"
						/>
					)}
				</li>
			</ul>
		</nav>
	);
};
export default Navbar;
