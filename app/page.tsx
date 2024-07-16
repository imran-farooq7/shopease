"use client";
import { signIn } from "next-auth/react";

const Home = () => {
	return (
		<button className="bg-cyan-300" onClick={() => signIn("google")}>
			Shop Ease
		</button>
	);
};
export default Home;
