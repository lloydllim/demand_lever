import { useEffect, useState } from "react"
import { Input, Text } from '@chakra-ui/react'
import { Field } from "@/components/ui/field"

export const TextField = ({
    label,
    name,
    fieldName,
    getTextValue,
    isValid,
    placeholder = "",
    defaultValue = null,
    required = false,
    submitted = false,
    ...rest
}) => {
    const [ text , setText ] = useState( '' )
    const [ errorMsg, setErrorMsg ] = useState( '' )

    useEffect(() => {
        if ( defaultValue ) {
            setText( defaultValue )
        }
    }, [ defaultValue ])

    useEffect(() => {
        if ( getTextValue ) {
            getTextValue( text )
        }
    }, [ text ])

    useEffect(() => {
        if ( isValid ) {
            isValid( text ? false : true )
        }
        setErrorMsg( text ? '' : `• ${fieldName} is a required field` )
    }, [ submitted , text ])

     return <Field label={label} {...rest}>
            <Input
                p={2}
                border="1px solid #c4c4c4"
                type='text'
                name={name}
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder={placeholder} />
            {
                required && !errorMsg || !submitted ? <Text fontSize={13} fontWeight="bold">*Required</Text> : null
            }
            {
                errorMsg && submitted ? <Text fontSize={13} color="red" fontWeight="bold"> {errorMsg} </Text> : null
            }
        </Field>
}