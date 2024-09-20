import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import User from "./models/Users"
import { dbConnect } from "./lib/dbConnect"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) : Promise<any>=> {
        // src/auth.ts
        if (typeof window === 'undefined') {
            const { dbConnect } = await import('./lib/dbConnect'); // Import dynamically only on the server
            await dbConnect();
              }

        try {
            const user = await User.findOne({userName:credentials.username})
            if(!user){
                throw new Error('No User Exist')
            }

            if(!user.isVerified){
                throw new Error('Please verify your account')

            }
            // const ispasswordCorrect = await bcrypt.compare(<string>credentials.password,user.password)

            // if(!ispasswordCorrect){
            //     throw new Error('incorrect password')
            // }
            // tempory logic for testing only
            if(credentials.password != 'Python00@'){
              throw new Error('incorrect password')
            }
            
        
            return user
        } catch (error:any) {
            throw new Error(error.message)
        }
      },
    }),
  ],
  session:{
    strategy:'jwt'
  },
  secret:process.env.AUTH_SECRET,
  callbacks:{
     jwt({ token, user }) {
        if (user) { // User is available during sign-in
          token._id = user._id?.toString()
          token.isVerified = user.isVerified
          token.username = user.username

        }
        return token
      },
      session({ session, token }) {
        if(token){
            session.user._id = token._id
            session.user.isVerified = token.isVerified
            session.user.username = token.username
        }
        
        return session
      },

  }
})