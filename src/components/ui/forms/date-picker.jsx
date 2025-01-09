'use client'

import { Input, Text } from '@chakra-ui/react'
import { Field } from "@/components/ui/field"
import { useEffect, useState } from "react"

export const DatePicker = ({
    fieldName,
    label,
    isValid,
    getSelectedDate,
    name,
    placeholder = "Pick a date",
    required = false,
    submitted = false,
    ...rest
}) => {
    const [ errorMsg, setErrorMsg ] = useState( '' )
    const [ pickedDate, setPickedDate ] = useState( '' )

    useEffect(() => {
        if ( getSelectedDate ) {
            getSelectedDate( new Date( pickedDate ) )
        }
        if ( required && isValid ) {
            isValid( pickedDate ? false : true )
        }
    }, [ pickedDate ])

    useEffect(() => {
        if ( required && isValid ) {
            setErrorMsg( pickedDate ? false : true )
        }
    }, [ pickedDate ])

    useEffect(() => {
        setErrorMsg( pickedDate ? '' : `• ${fieldName} is a required field`)
    }, [ submitted, pickedDate ])

    function formatToISO(dateString) {
		// Parse the date string into a Date object
		if (dateString) {
			const date = new Date(dateString);

			// Check if the date is valid
			if (!isNaN(date.getTime())) {
				// Format the date to the required format: yyyy-MM-ddThh:mm
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
				const day = String(date.getDate()).padStart(2, '0');
				const hours = String(date.getHours()).padStart(2, '0');
				const minutes = String(date.getMinutes()).padStart(2, '0');

				// Return formatted date
				return `${year}-${month}-${day}T${hours}:${minutes}`;
			} else {
				throw new Error("Invalid date format");
			}
		}

	}

    return (
        <Field label={label} {...rest}>
            <Input
                p={2}
                border="1px solid #c4c4c4"
                type='datetime-local'
                name={name}
                value={formatToISO(pickedDate)}
                onChange={e => setPickedDate( e.target.value )}
                placeholder={placeholder}/>
            {
                required && !errorMsg || !submitted ? <Text fontSize={13} fontWeight="bold">*Required</Text> : null
            }
            {
                errorMsg && submitted ? <Text fontSize={13} color="red" fontWeight="bold"> {errorMsg} </Text> : null
            }
            
        </Field>
    )
}