'use client'

import { Flex, Text, useStatStyles } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { Input } from "@chakra-ui/react"
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { get_all_vendor } from "@/app/api/vendors/actions"
import SelectDropdown from "@/components/ui/select-dropdown"
import { add_sales_post } from "@/app/api/sales-post/actions"

export default function SalesPostForm() {
    const [submitted, setSubmitted] = useState(false)
    const [vendors, setVendors] = useState([])
    const [loading, setLoading] = useState(false)

    const [salesPostForm, setSalesPostForm] = useState({
        client_id: { value: '', error: true }
    })
    const [singleVendor, setSingleVendor] = useState({
        client_id: '',
        client_full_name: "",
        client_company_website: "",
        client_comapny_name: "",
        client_main_pitch: ""
    })

    const fetchAllVendors = async () => {
        const records = await get_all_vendor()
        setVendors(records)
    }

    const fieldsHasError = () => {
		return Object.values(salesPostForm).some(item => item.error === true)
	}

    useEffect(() => {
        const singleRecord = vendors.filter( v => v.client_id === salesPostForm.client_id.value ).pop()
        setSingleVendor( singleRecord )
    }, [ salesPostForm ])

    useEffect(() => {
        fetchAllVendors()
    }, [])

    const createSalesPost =  async (ev) => {
        ev.preventDefault()
        setSubmitted( true )

        if ( !fieldsHasError() ) {
            setLoading( true )
            await add_sales_post({
                client_id: salesPostForm.client_id.value
            })
            setLoading( false )
            window.location.href = "/sales/posts"
        }

    }

    return <Flex w={'100%'} flexDirection="column">
        <form fontSize={20} p={5} onSubmit={createSalesPost}>
            <Text> Publish Sales Post </Text>

            <SelectDropdown
                mt={5}
                collection={vendors}
                labelProp={'client_full_name'}
                valueProp={'client_id'}
                label={'Pick a vendor'}
                submitted={submitted}
                fieldName="Vendor"
                required
                isValid={ e => setSalesPostForm(
                    prevState => ({
                        ...prevState,
                        client_id: {
                            ...prevState?.client_id,
                            error: e
                        }
                    }))}
                getSelectedChoice={ e => setSalesPostForm(
                    prevState => ({
                        ...prevState,
                        client_id: {
                            ...prevState?.client_id,
                            value: e?.value[0]
                        }
                    }))
                }
            />

            <Flex
                mt={5}
                w={'100%'}
                justifyContent={'center'}
                gap={3}
            >
                <Field label="Company Name">
                    <Input
                        readOnly
                        disabled
                        value={singleVendor?.client_company_name || '' }
                    />
                </Field>
                <Field label="Company Website">
                    <Input
                        readOnly
                        disabled
                        value={singleVendor?.client_company_website || '' }
                    />
                </Field>
            </Flex>

            <Field label="Company Main Pitch" mt={5}>
                <Input
                    readOnly
                    disabled
                    value={singleVendor?.client_main_pitch || 'None'}
                />
            </Field>

            <Flex
                w={'100%'}
                justifyContent={'center'}
                alignItems={'center'}
                flexDirection={'column'}
                p={3}
            >
                <Button
                    bgColor={loading ? 'gray.600' : 'black'}
                    color="white"
                    mt={3}
                    type='submit'
                    w={'45%'}
                > { loading ? 'Creating' : 'Create' } Sales Post </Button>
            </Flex>

        </form>
    </Flex>
}