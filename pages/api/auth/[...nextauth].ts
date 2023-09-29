import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import dbConnect from "../../../libs/backend/dbConnect";
import clientPromise from "../../../libs/backend/mongodb";
import {
  getProfile,
  refreshAccessToken,
} from "../../../libs/backend/oauthUtils";
import { Account } from "../../../models/account";
import { User } from "../../../models/user";
import { Role } from "../../../types/user/user";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "guest",
      name: "guest",

      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const profile = {
          id: "0",
          uid: "0",
          name: "guest",
          role: "member",
          profileImage: "",
          isActive: true,
        };
        if (profile) {
          // Any object returned will be saved in `user` property of the JWT
          return profile;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
      profile: (profile) => ({
        id: profile.id.toString(),
        uid: profile.id.toString(),
        name: profile.properties.nickname,
        role: "member",
        profileImage: profile.properties.profile_image,
        isActive: false,
        score: 0,
      }),
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 3 * 24 * 60 * 60, // 3 days
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "guest") {
        await dbConnect();
        await User.updateOne(
          { uid: user.uid },
          { $set: user },
          { upsert: true }
        );
        return true;
      }

      const accessToken: any = account.access_token;
      if (!accessToken) {
        return false;
      }
      const kakaoProfile = await getProfile(accessToken, user.uid as string);
      if (!kakaoProfile) {
        return false;
      }
      await dbConnect();

      await User.updateOne({ uid: user.uid }, { $set: kakaoProfile });

      return true;
    },
    async session({ session, token }) {
      if (session.user.name === "guest") {
        session.id = "0";
        session.uid = "0";
        session.user.name = "guest";
        session.role = "member";
        session.error = "";
        session.isActive = true;
      } else {
        session.id = token.id.toString();
        session.uid = token.uid.toString();
        session.user.name = token.name;
        session.role = token.role as Role;
        session.error = token.error;
        session.isActive = token.isActive as boolean;
      }

      return session;
    },
    async jwt({ token, account, profile, user }) {
      if (account && account.provider === "guest") {
        return token;
      }
      if (account && user) {
        await Account.updateOne(
          { providerAccountId: account.providerAccountId },
          {
            $set: {
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
              refresh_token_expires_in: account.refresh_token_expires_in,
            },
          }
        );
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: Date.now() + account.expires_at * 1000,
          id: user.id.toString(),
          uid: (profile as any)?.id,
          name: (profile as any)?.properties?.nickname,
          picture: (profile as any)?.properties?.profile_image,
          role: user.role,
          isActive: user.isActive,
        };
      }

      if (token.accessTokenExpires) {
        if (Date.now() < (token.accessTokenExpires as number) * 1000) {
          return token;
        }
        return refreshAccessToken(token);
      } else {
        return token;
      }
    },
  },
};
export default NextAuth(authOptions);
