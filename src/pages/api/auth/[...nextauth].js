import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";


export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                username: { label: "username", type: "text", placeholder: "Username" },
                password: { label: "password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials, req) {
                const { username, password } = credentials;
                const res = await axios.post('http://127.0.0.1:8000/api/user/login', {
                    username,
                    password
                })
                    .then((res) => {
                        console.log(res);
                        const data = res.data;
                        return data;
                    })
                    .catch((err) => {
                        throw new Error(err.response.data.detail)
                    });
                return res;
            }

        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token;
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
    }

})

