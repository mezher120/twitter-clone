import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google" // cambiar github por googleprovider Y LOS GOOGLE_CLIENT
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  pages: {
    signin: "/auth/signin"
  }
}
export default NextAuth(authOptions)