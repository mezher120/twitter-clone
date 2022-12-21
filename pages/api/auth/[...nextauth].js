import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google" // cambiar github por googleprovider Y LOS GOOGLE_CLIENT
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET 
    }),
    // ...add more providers here
  ],

  pages: {
    signIn: "/auth/signin"
  },

  secret: process.env.SECRET,

  callbacks: {
    async session({session, token}) {
      session.user.username = session.user.name.split(" ").join('').toLowerCase();  // creamos un nuevo name formato username
      session.user.uid = token.sub;  // agregamos nueva propieda uid con el token proporcionado por google
      return session; // devuelve el nuevo session al provider
    }
  }
}
export default NextAuth(authOptions)