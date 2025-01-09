
import SalesManagerLayout from "@/app/layouts/SalesManagerLayout.jsx/layout";
import dynamic from "next/dynamic";
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifyToken } from "@/app/api/lib/auth"

const SalesManagerDashboard = dynamic(() => import("@/components/pages/dashboard/sales-dashboard"));

export const metadata = {
	title: 'Sales Manager Dashboard',
};

export default async function SalesManagerPage() {
	const cookieStore = await cookies()
	const session = cookieStore.get('session') || cookieStore.get('_vercel_jwt')

	if (session && session.value) {
		let user_type = null
		let has_error = false

		try {
			const data = await verifyToken(session.value)
			user_type = data?.user_type || null
		} catch (err) {
			console.info('what is the err ', err )
			has_error = true
		}

		if (has_error) {
			 return redirect('/login/expired')
		} else {
			if (user_type && user_type == 'sales') {

				return <SalesManagerLayout>
					<SalesManagerDashboard />
				</SalesManagerLayout>
			} else {
				return redirect(`${user_type}`)
			}
		}



	} else {
		return redirect('/login')
	}


}