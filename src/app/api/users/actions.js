'use server'

import prisma from '@/app/api/lib/db'

export async function create_user( {
    user_name: user_name,
    user_email: user_email,
    user_login_type: user_login_type,
    user_picture: user_picture = null,
    user_password: user_password = null,
    user_token_expired_at: user_token_expired_at = null,
    user_access_token: user_access_token = null,
    user_refresh_token: user_refresh_token = null,
    user_type: user_type = null,
} ) {
    return await prisma.user.create({
        data: {
            user_name: user_name,
            user_email: user_email,
            user_picture: user_picture,
            user_access_token: user_access_token,
            user_type: user_type,
            user_refresh_token: user_refresh_token,
            user_token_expired_at: user_token_expired_at,
            user_login_type: user_login_type,
            user_password: user_password
        }
    })
}

export async function get_user({
    user_email: user_email
}) {
    return await prisma.user.findUnique({
        where: {
            user_email: user_email
        }
    })
}

export async function is_user_exist({
    user_email: user_email
}) {
    
    const user = await prisma.user.findUnique({
        where: {
            user_email: user_email
        }
    })
    return user
}