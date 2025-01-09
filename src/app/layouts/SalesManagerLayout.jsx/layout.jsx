import SimpleSidebar from "@/components/sidebar";
import { cookies } from "next/headers"
import { verifyToken } from "@/app/api/lib/auth"

export default async function SalesManagerLayout({ children }) {
    const cookieStore = await cookies()
	const session = cookieStore.get('session')
	const { email } = await verifyToken(session.value)

    const username = email.split('@')[0]

    return <SimpleSidebar username={username} user_type="sales_manager" > {children} </SimpleSidebar>
}