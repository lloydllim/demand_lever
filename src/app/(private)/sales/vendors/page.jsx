import SalesManagerLayout from "@/app/layouts/SalesManagerLayout.jsx/layout";
import dynamic from "next/dynamic";

const SalesVendorsComponent = dynamic(() => import( '@/components/pages/sales/vendors/SalesVendorsComponent'))

export default function SalesVendorsPage() {
	return <SalesManagerLayout>
		<SalesVendorsComponent />
	</SalesManagerLayout>
}