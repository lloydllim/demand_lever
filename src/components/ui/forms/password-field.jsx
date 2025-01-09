'use client'

import { Input, Text } from '@chakra-ui/react'
import { Field } from "@/components/ui/field"
import { useEffect, useState } from "react"

export const PasswordField = ({
    label,
    name,
    fieldName,
    getPasswordValue,
    isValid,
    placeholder = "",
    required = false,
    submitted = false,
    ...rest
}) => {
    const [ password, setPassword ] = useState( '' )
    const [ errorMsg, setErrorMsg ] = useState( '' )

    useEffect(() =>{
        getPasswordValue( password )
    }, [ password ])

    useEffect(() => {
        isValid( password ? false : true )
        setErrorMsg( password ? '' : `• ${fieldName} is a required field` )
    }, [ submitted, password ])

    return <Field label={label} {...rest}>
        <Input
            p={2}
            border="1px solid #c4c4c4"
            type='password'
            name={name}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={placeholder} />
        {
            required && !errorMsg || !submitted ? <Text fontSize={13} fontWeight="bold">*Required</Text> : null
        }
        {
            errorMsg && submitted ? <Text fontSize={13} color="red" fontWeight="bold"> {errorMsg} </Text> : null
        }
    </Field>
}