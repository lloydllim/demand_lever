import { cookies } from "next/headers"
import LoginExpired from "@/components/pages/login/login-expired"
import { redirect } from "next/navigation"

export default async function ExpredSessionPage() {
	const cookieStore = await cookies()
		const session = cookieStore.get('session') || cookieStore.get('_vercel_jwt')
	
		if (session && session.value) {
			let user_type = null
			let has_error = false
	
			try {
				 const data = await verifyToken(session.value)
				 user_type = data.user_type
			} catch ( err ) {
				has_error = true
			}
	
			if ( has_error ) {
				return <LoginExpired />
			} else {
				redirect(`/${user_type}`)
			}
	
		} else {
			redirect( '/login' )
		}
}