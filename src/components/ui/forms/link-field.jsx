import { useStatStyles } from "@chakra-ui/react"
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
    required = false,
    submitted = false,
    ...rest
}) => {
    const linkRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/
    const [ text, setText ] = useState( '' )
    const [ errorMsg, setErrorMsg ] = useState( '' )
    
    useEffect(() => {
        if ( getTextValue ) {
            getTextValue( text )
        }
    }, [ text ])

    useEffect(() => {
        if ( isValid ) {
            isValid( text ? false : true )
        }
        if ( !isValidLink() ) {
            setErrorMsg( text ? '' : `• ${fieldName} is not a valid link` )
            isValid( true )
        } else {
            isValid( false )
        }
    }, [ submitted , text ])

    const isValidLink = () => {
        return linkRegex.test( text )
    }

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