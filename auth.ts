import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const prisma = new PrismaClient();
export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),

	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],
});
