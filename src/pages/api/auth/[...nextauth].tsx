import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { prisma } from "../../../services/client/PrismClient";
import Adapters from "next-auth/adapters";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id as string,
          name: profile.name || (profile.login as string),
          email: `${profile.id}+${profile.login}@users.noreply.github.com`,
          image: profile.avatar_url as string,
        };
      },
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  callbacks: {
    session: (session, userOrToken) => {
      const user = {
        ...session.user,
      };
      return { ...session, user, role: userOrToken.role };
    },
  },
});
