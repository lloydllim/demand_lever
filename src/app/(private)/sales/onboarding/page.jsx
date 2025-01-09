import SalesManagerLayout from "@/app/layouts/SalesManagerLayout.jsx/layout";
import dynamic from "next/dynamic";

const SalesOnboardingComponent = dynamic(() => import( '@/components/pages/sales/onboarding/SalesOnboardingComponent'))

export default function SalesMeetingsPage() {
	return <SalesManagerLayout>
		<SalesOnboardingComponent />
	</SalesManagerLayout>
}