import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { create_user, is_user_exist, get_user } from "@/app/api/users/actions"

const SECRET_KEY = process.env.JWT_TOKEN

export const { handlers } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account, user, trigger, session }) {

        },
        async session({ session, token }) {

        },
        async signIn({ user, account, profile }) {
            const cookieStore = await cookies()
            const { name, email, picture } = profile
            const { refresh_token, access_token, expires_at } = account

            let userInfo = null
            
            const userExist = await is_user_exist({ user_email: email })

            if ( userExist ) {
                userInfo = await get_user({ user_email: email })
            } else {
                userInfo = await create_user({
                    user_name: name,
                    user_email: email,
                    user_picture: picture,
                    user_type: 'admin', 
                    user_access_token: access_token,
                    user_refresh_token: refresh_token,
                    user_token_expired_at: expires_at,
                    user_refresh_token: refresh_token,
                    user_login_type: 'google'
                })
            }
            
            console.info( 'user info is >>> ', userInfo )

            const token = jwt.sign({
                user_id: userInfo.user_id,
                user_name: userInfo.user_name,
                user_email: userInfo.user_email,
                user_picture: userInfo.user_picture,
                user_access_token: userInfo.user_access_token,
                user_refresh_token: userInfo.user_refresh_token,
                user_type: userInfo.user_type,
            }, SECRET_KEY, {
                expiresIn: '10h'
            })

            cookieStore.set( 'session', token, {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24 // 1 day
            })

            return true
        }
    },
    secret: process.env.AUTH_TOKEN,
    session: {
        strategy: "jwt"
    },
})