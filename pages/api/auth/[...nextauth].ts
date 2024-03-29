import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
    secret: "IpkxNmtrZ3yK6eWq4E/SdFLbZihzgi5tQ3ghH6l9xEI=",
    session: {
        strategy: "jwt",
    },
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                identifier: {
                    label: "Username or email",
                    type: "text",
                    placeholder: "userone",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied

                if (credentials == null) return null;

                try {
                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_SERVER_API}/api/auth/local`,
                        {
                            identifier: credentials.identifier,
                            password: credentials.password,
                        },
                    );
                    const data = response.data;
                    return {
                        jwt: data.jwt,
                        name: data.user.username,
                        ...data.user,
                    };
                } catch (error) {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        session: async ({ session, token }) => {
            // @ts-ignore
            session.id = token.id;
            // @ts-ignore
            session.jwt = token.jwt;
            return Promise.resolve(session);
        },
        jwt: async ({ token, user }) => {
            const isSignIn = user ? true : false;
            if (isSignIn) {
                token.id = user?.id;
                // @ts-ignore
                token.jwt = user?.jwt;
            }
            return Promise.resolve(token);
        },
    },
    pages: {
        signIn: '/auth/signin',
    }
};
export default NextAuth(authOptions);
