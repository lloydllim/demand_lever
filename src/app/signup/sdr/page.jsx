import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifyToken } from "@/app/api/lib/auth"
import SignupForm from "@/components/pages/signup/signup-form"

export const metadata = {
    title: "SDR Signup Page"
}

export default async function ClientsSignup() {
    const cookieStore = await cookies()
    const session = cookieStore.get('session') || cookieStore.get('_vercel_jwt')

    if (session && session.value) {
        let user_type = null
        let has_error = null

        try {
            const data = await verifyToken(session.value)
            user_type = data?.user_type || null
        } catch (err) {
            has_error = true
        }

        if (has_error) {
            return redirect('/login/expired')
        } else {
            return redirect(`/${user_type}`)
        }
    } else {
        return (<SignupForm user_type={'sdr'} />)
    }
}