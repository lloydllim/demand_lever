'use client'

import {
	get_all_vendor as get_all_vendors_action
} from '@/app/api/vendors/actions'
import { Flex, Text } from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import { ResizableTable } from "@/components/ui/table";


export default function SalesVendorsComponent() {
	const [vendors, setVendors] = useState()

	useEffect(() => {
		fetch_all_vendors()
	}, [])

	const fetch_all_vendors = async () => {
		const records = await get_all_vendors_action()
		setVendors( records )
	}

	const update_vendor = () => {

	}

	const open_delete_prompt = ( client_id, client_full_name ) => {

	}

	return <Flex mt={10} flexDirection={'column'} w={'100%'}>
		<Text fontSize={'3xl'}> Clients </Text>

		<ResizableTable
			mt={5}
			columns={
				[
					{ label: "Full Name", value: 'client_full_name' },
					{ label: "Email Address", value: 'client_email' },
					{ label: "Linkedin Profile", value: 'client_linkedin_profile' },
					{ label: "Company Website", value: 'client_company_website' },
				]
			}
			editAction={(selectedItem) => update_vendor(selectedItem)}
			deleteAction={({ client_id, client_full_anme }) => open_delete_prompt(client_id, client_full_anme)}
			data={vendors || []}
		/>


	</Flex>
}