import { redirect } from "next/navigation"
import SDRLayout from "@/app/layouts/SDRLayouts/layout";

import checkAuth from "@/utils/checkAuth";

import ConversationsList from "@/components/pages/sdr/conversations/ConversationsListDashboard";

export default async function ConversationPage() {
    checkAuth( {
        user_type: "sdr",
        error_fallback: redirect( '/login/expired' ),
        success_callback: <SDRLayout> <ConversationsList /> </SDRLayout>,
        null_session_fallback: redirect( '/' )
    } )
}