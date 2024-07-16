import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Stripe from "stripe";
import prisma from "./prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),

	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],
	events: {
		createUser: async ({ user }) => {
			const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
				apiVersion: "2024-06-20",
			});
			const customer = await stripe.customers.create({
				email: user.email!,
				name: user.name!,
			});
			await prisma.user.update({
				where: {
					id: user.id,
				},
				data: {
					stripeId: customer.id,
				},
			});
		},
	},
});
