import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { prisma } from "../../../services/client/PrismClient";
import Adapters from "next-auth/adapters";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
});
