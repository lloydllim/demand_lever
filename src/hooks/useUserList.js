'use client'
/**
 * 
 * @param {Function} fn server action function that will return the data list
 */

import { useState, useEffect, useCallback } from "react";
import { get_users } from "@/app/api/users/actions";

const useGetList  = ( options ) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback( async() => {

        setLoading( true )
        setError( null )

        try {
            const _data = await get_users(options)
            setData( _data )
        } catch ( err ) {
            setError( `Error in ${get_users}, with error: ${ err.message}` )
        } finally {
            setLoading( false )
        }
    }, [ options ] )

    useEffect(() => {
        fetchData()
    }, [ ])


    return { data, error, loading, refresh: fetchData }
}

export default useGetList