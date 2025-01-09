import SimpleSidebar from "@/components/sidebar";
import { cookies } from "next/headers"
import { verifyToken } from "@/app/api/lib/auth"

export default async function SDRLayout({ children }) {
    const cookieStore = await cookies()
    const session = cookieStore.get('session')
    const { user_name } = await verifyToken(session.value)

    return <SimpleSidebar
        username={user_name}
        user_type="sdr" > {children} </SimpleSidebar>
}