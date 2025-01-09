'use client'

import { Input, Text } from '@chakra-ui/react'
import { Field } from "@/components/ui/field"
import { useEffect, useState } from "react"

export const FilePicker = ({
    fieldName,
    label,
    isValid,
    getSelectedFile,
    name,
    placeholder = 'Pick a File',
    accepts = "*",
    required = false,
    submitted = false,
    ...rest
}) => {
    const [errorMsg, setErrorMsg] = useState('')
    const [pickedFile, setPickedFile] = useState('')

    useEffect(() => {
        if (getSelectedFile) {
            getSelectedFile(pickedFile)
        }
        if (required && isValid) {
            isValid(pickedFile ? false : true)
        }
    }, [pickedFile])

    useEffect(() => {
        setErrorMsg(pickedFile ? '' : `• ${fieldName} is a required field`)
    }, [submitted, pickedFile])

    const convertImageToBase64 = (event) => {
        const file = event.target.files[0]

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const base64String = e.target.result.split(',')[1];
                console.log(base64String);

                setPickedFile(base64String)
            };

            reader.readAsDataURL(file);
        }
    }

    return <Field label="Appointment calendar screenshot" {...rest}>
        <Input
            p={2}
            border="1px solid #c4c4c4"
            type='file'
            name={name}
            accept={accepts}
            onChange={e => convertImageToBase64(e)}
            placeholder={placeholder} />
        {
            required && !errorMsg || !submitted ? <Text fontSize={13} fontWeight="bold">*Required</Text> : null
        }
        {
            errorMsg && submitted ? <Text fontSize={13} color="red" fontWeight="bold"> {errorMsg} </Text> : null
        }

    </Field>
}