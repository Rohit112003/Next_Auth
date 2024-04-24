import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/app/(models)/user";

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log("Profile Github", profile);
        let userRole = "Github User";
        if (profile?.email == "rohitk79739@gmail.com") {
          userRole = "admin";
        }
        return {
          ...profile,
          role: userRole,
        };
      },
      clientId:process.env.GITHUB_ID,
      clientSecret:process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      profile(profile) {
        console.log("Profile Github", profile);
        let userRole = "Google User"
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },

      clientId:rocess.env.GOOGLE_ID,
      clientSecret:rocess.env.GOOGLE_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        try {
          const foundUser = await User.findOne({ email: credentials.email })
            .lean()
            .exec();

          if (foundUser) {
            console.log("User Exists");
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password
            );

            if (match) {
              console.log("Good Pass");
              delete foundUser.password;

              foundUser["role"] = "Unverified Email";
              return foundUser;
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks:{
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  }
};

//aEL1BrseRzp5L36W
//mongodb+srv://rohitk79739:aEL1BrseRzp5L36W@cluster0.4yrjrwu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0