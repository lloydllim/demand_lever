import SalesManagerLayout from "@/app/layouts/SalesManagerLayout.jsx/layout";
import dynamic from "next/dynamic";

const SalesMeetingsComponent = dynamic(() => import( '@/components/pages/sales/meetings/SalesMeetingsComponent'))

export default function SalesMeetingsPage() {
	return <SalesManagerLayout>
		<SalesMeetingsComponent />
	</SalesManagerLayout>
}