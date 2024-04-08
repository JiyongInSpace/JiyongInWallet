import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin

      if (account) {
        token.id_token = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      // if (session?.user) {
      //   session.user.id_token = token.id_token;
      // }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
