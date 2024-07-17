"use client";

import { User } from "next-auth";
import Image from "next/image";
import { signIn } from "next-auth/react";

interface Props {
	user: User;
}
const Navbar = ({ user }: Props) => {
	return (
		<nav className="flex justify-between">
			<h1>Shop Ease</h1>
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
