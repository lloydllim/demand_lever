'use server'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import prisma from "@/app/api/lib/db"
import { verifyToken } from '../lib/auth'

const SECRET_KEY = process.env.JWT_TOKEN

export async function login(email, password,encryptedPassword=null) {
	if (!email || !password) {
		return { success: false, message: 'Email and Password are required' }
	}

	console.info( email, password )
	try {
		const record = await prisma.user.findFirst({
			where: {
				user_email: email
			}
		})
		
		if (record && record.user_password) {
			let isPasswordCorrect = null
			let token = null

			if(encryptedPassword == null){
			isPasswordCorrect = await bcrypt.compare(password, record.user_password);
			} else {
			isPasswordCorrect = encryptedPassword === record.user_password;
			}

			if (!isPasswordCorrect) {
				return { success: false, message: 'Invalid Credentials' }
			}

			const token2 = jwt.sign({
				user_id: record.user_id,
				user_name: record.user_name,
				user_email: record.user_email,
				user_type: record.user_type
			}, SECRET_KEY, {
				expiresIn: '10h'
			})

			const cookieStore = await cookies()

			cookieStore.set('session', token2, {
				httpOnly: true,
				secure: true,
				maxAge: 60 * 60 * 24, // 1 day
			});

			return { success: true, message: 'Login successful' }
		} else {
			return { success: false, message: 'Invalid Credentials' }
		}


	} catch (error) {
		console.error('error loggin in ', error)
		return 'Error logging in', error
	}
}

export async function createAccount(email) {

}

export async function signout() {
	const cookieStore = await cookies()
	cookieStore.set('session', '', {
		httpOnly: true,
		secure: true,
		expires: new Date(0), // Expire immediately
		path: '/',
	})
}

export async function deleteAuthCookies() {
	console.info( 'deelte cookie s/ ')
	const cookieStore = await cookies()

	cookieStore.set('session', '', {
		httpOnly: true,
		secure: true,
		expires: new Date(0), // Expire immediately
		path: '/',
	})

	cookieStore.set('_vercel_jwt', '', {
		httpOnly: true,
		secure: true,
		expires: new Date(0), // Expire immediately
		path: '/',
	})

}

export async function getSessionUser() {
	const cookieStore = await cookies()

	try {
		const token = cookieStore.get('session') || cookieStore.get('_vercel_jwt')
		const userData = await verifyToken(token.value)
		console.info( 'user data is ', userData )
		return userData
	} catch (err) {

	}
}

export async function loginManager(email, password) {
	const cookieStore = await cookies()
	try {
		console.info(email, password)
		const record = await prisma.salesManager.findFirst({
			where: {
				manager_email: email
			}
		})

		if (record) {
			const isPasswordCorrect = await bcrypt.compare(
				password,
				record.manager_password_hash
			)

			if (!isPasswordCorrect) {
				return { success: false, message: 'Invalid Credentials' }
			}

			const token = jwt.sign({
				id: record.manager_id,
				email: record.manager_email,
				user_type: 'sales'
			}, SECRET_KEY, { expiresIn: '5h' })

			cookieStore.set('session', token, {
				httpOnly: true,
				secure: true,
				maxAge: 60 * 60 * 24, // 1 day
			})
			return { success: true, message: 'Login successful' }
		} else {
			return { success: false, message: 'Invalid Credentials' }
		}

	} catch (err) {
		console.info(err)
		return { success: false, message: 'Invalid Credentials' }
	}
}