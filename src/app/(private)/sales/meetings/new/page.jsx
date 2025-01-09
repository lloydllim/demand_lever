import dynamic from "next/dynamic"
import SalesManagerLayout from "@/app/layouts/SalesManagerLayout.jsx/layout";

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { verifyToken } from "@/app/api/lib/auth"

import SalesMeetingsComponent from '@/components/pages/sales/meetings/SalesMeetingForm'
export const metadata = {
	title: "Meetings Page"
}

export default async function NewMeetingsPage() {
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
			if (user_type && user_type == 'sales') {
				return <SalesManagerLayout>
					<SalesMeetingsComponent />
				</SalesManagerLayout>
			} else {
				return redirect(`/${user_type}`)
			}
		}
	} else {
		return redirect('/login')
	}


}