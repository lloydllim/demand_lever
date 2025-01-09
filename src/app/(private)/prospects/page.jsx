import ProspectsProposalsLayout from "@/app/layouts/ProspectsProposalsLayout.jsx/layout"
import ProspectsDashboard from "@/components/pages/dashboard/prospect-dashboard"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { verifyToken } from "@/app/api/lib/auth"

export const metadata = {
	title: "Prospects Page"
}

export default async function ProspectsPage() {
	const cookieStore = await cookies()
	const session = cookieStore.get('session') || cookieStore.get('_vercel_jwt')

	if (session && session.value) {
		let user_type = null
		let has_error = false

		try {
			const data = await verifyToken(session.value)
			user_type = data?.user_type || null
		} catch ( err ) {
			has_error = true
		}
		
		if ( has_error ) {
			return redirect( '/login/expired' )
		} else {
			if (user_type && user_type == 'prospects') {
				return (
					<ProspectsProposalsLayout>
						<ProspectsDashboard />
					</ProspectsProposalsLayout>)
			} else {
				redirect(`/${user_type}`)
			}
		}
		
	} else {
		return redirect('/login')
	}

}