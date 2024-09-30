import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "@/auth/actions/auth-actions";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: "Correo electrónico",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "usuario@correo.com" },
        password: { label: "Contraseña", type: "password", placeholder: '***********' }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await signInEmailPassword(credentials!.email, credentials!.password);

        if (user) {
          return user
        }

        return null

      }
    })
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {

    async signIn({ user, account, profile, email, credentials }) {
      //console.log({ user })
      return true;
    },

    async jwt({ token, user, account, profile }) {
      const dbUser = await prisma.user.findUnique({ where: { email: token.email! } });
      console.log({ dbUser })
      if (dbUser?.isActive === false) {
        throw new Error('Usuario desactivado');
      }
      token.roles = dbUser?.roles || ['no-roles'];
      token.id = dbUser?.id || 'no-uuid';
      return token;
    },

    async session({ session, token, user }) {
      //console.log({ token });
      if (session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }
      return session;
    }
  }

}


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };