'use client'

import { Input, Text } from '@chakra-ui/react'
import { Field } from "@/components/ui/field"
import { useEffect, useState } from "react"

export const EmailField = ({
    label,
    name,
    fieldName,
    getEmailValue,
    isValid,
    placeholder = "",
    required = false,
    submitted = false,
    ...rest
}) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [ errorMsg, setErrorMsg ] = useState( '' )
    const [ email, setEmail ] = useState( '' )

    useEffect(() => {
        if ( required && isValid ) {
            isValid ( email ? false : true )
        }

        getEmailValue( email )
    }, [ email ])
    

    useEffect( () => {
        setErrorMsg( email ? '' : `• ${fieldName} is a required field`)

        if ( !isValidEmail() ) {
            setErrorMsg( `• ${fieldName} is not a valid email address` )
            isValid( true )
        } else {
            isValid( false )
        }
    }, [ email , submitted ])

    const isValidEmail = () => {
        return emailRegex.test( email )
    }

    return <Field label={label} {...rest}>
            <Input
                p={2}
                border="1px solid #c4c4c4"
                type='email'
                name={name}
                value={email}
                onChange={e => setEmail( e.target.value )}
                placeholder={placeholder}/>
            {
                required && !errorMsg || !submitted ? <Text fontSize={13} fontWeight="bold">*Required</Text> : null
            }
            {
                errorMsg && submitted ? <Text fontSize={13} color="red" fontWeight="bold"> {errorMsg} </Text> : null
            }
        </Field>
}