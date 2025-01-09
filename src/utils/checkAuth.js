import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { verifyToken } from "@/app/api/lib/auth"

export default async function checkAuth( {
    user_type: user_type,
    null_session_fallback: null_session_fallback,
    error_fallback: error_fallback,
    success_callback: success_callback,
} ) {

    const cookieStore = await cookies()
    const session = cookieStore.get( 'session' ) || cookieStore.get( '_vercel_jwt' )

    if ( session && session.value ) {
        let session_user_type = null
        let has_error = false

        try {
            const data = await verifyToken( session.value )
            session_user_type = data?.user_type || null
        } catch ( err ) {
            has_error = true
        }
        
        if ( has_error ) {
            return error_fallback || redirect( '/login/expired')
        } else  {
            if ( session_user_type && session_user_type == user_type ) {
                return success_callback
            }
        }
    } else {
        return null_session_fallback || redirect( '/' )
    }



    
}