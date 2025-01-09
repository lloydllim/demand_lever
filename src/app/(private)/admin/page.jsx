import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { verifyToken } from "@/app/api/lib/auth"

export default async function AdminPage() {
    const cookieStore = await cookies()
    const session = cookieStore.get('session') || cookieStore.get('_vercel_jwt')

    if (session && session.value) {
        let user_type = null
        let has_error = false

        try {
            const data = await verifyToken(session.value)
            user_type = data?.user_type || null
        } catch (err) {
            has_error = true
        }

        if (has_error) {
            return redirect('/login/expired')
        } else {
            if (user_type && user_type == 'admin') {
                return "Admin Dashboard"
            } else {
                return redirect(`/${user_type}`)
            }
        }
    } else {
        return redirect('/login')
    }


}