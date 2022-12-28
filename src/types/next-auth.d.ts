import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        id: string | unknown
        jwt: string
        user: {
            /** The user's postal address. */
            id: string | unknown
            jwt: string
        } & DefaultSession["user"]
    }
}