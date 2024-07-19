"use client";

import { User } from "next-auth";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Link from "next/link";

interface Props {
	user: User;
}
const Navbar = ({ user }: Props) => {
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
			<ul>
				<li>
					{!user && <button onClick={() => signIn("google")}>Sign In</button>}
					{user && (
						<Image
							src={user.image!}
							width={48}
							height={48}
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
