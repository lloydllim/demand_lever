import SalesManagerLayout from "@/app/layouts/SalesManagerLayout.jsx/layout";
import dynamic from "next/dynamic";
import { cookies } from 'next/headers'
import { verifyToken  } from "@/app/api/lib/auth";

const SalesProspectsComponent = dynamic(() => import ('@/components/pages/sales/prospects/SalesProspectsComponent') )

export default async function SalesManagerProspectPage() {
	// const cookieStore = await cookies()
	// const session = cookieStore.get( 'session' )
	// const isUser = await verifyToken( session.value )

	return <SalesManagerLayout>
		<SalesProspectsComponent />
	</SalesManagerLayout>
}