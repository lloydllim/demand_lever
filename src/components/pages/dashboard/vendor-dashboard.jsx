'use client'

import { Card, Box, Flex, Text, Input, Textarea, Button } from '@chakra-ui/react'
import { RadioGroup } from '@/components/ui/radio-group'
import { Field } from "@/components/ui/field"
import { CheckboxList } from '@/components/ui/checkbox-list'
import { get_approved_proposals } from '@/app/api/proposals/actions'
import { Modal } from "@/components/ui/modal";
import { useState, useEffect } from 'react'
import { ResizableTable } from "@/components/ui/table";

export default function VendorDashboard() {

	const formData = {
		full_name: "Lloyd Kristoper Lim",
		signup_target_cost: 279,
		company: "Acme co.",
		email: "lloyd@acme.co",
		phone_number: "1234567890",
		linkedin_profile: "https://linkedin.lloyd.acme",
		company_website: "https://sample.site.com"
	}

	const [proposals, setProposals] = useState([])
	const [openEditModal, setOpenEditModal] = useState(false)
	const [singleProposal, setSingleProposal] = useState({})

	useEffect(() => {
		fetchApprovedProposals()
	}, [])

	const fetchApprovedProposals = async () => {
		const rec = await get_approved_proposals()
		console.info('rec >> ', rec)
		setProposals(rec)
	}

	const openUpdateProposalModal = (selectedItem) => {
		setSingleProposal(selectedItem)
		console.info( 'maanger >> ', selectedItem )
		setOpenEditModal(true)
	}

	const save_updated_changes = async () => {

	}

	return (
		<Box w={'100%'}>
			<ResizableTable
				columns={
					[
						{ label: "Propsect Name", value: "prospects.prospect_full_name" },
						{ label: "Manager Name", value: "sales_manager.manager_name" },
						{ label: "Proposal Status", value: "proposal_status" }
					]
				}
				data={proposals}
				editAction={(selectedItem) => openUpdateProposalModal(selectedItem)}
			/>
			<Modal
				toggleModal={openEditModal}
				title={`Approved Proposal Information`}
				getModalState={e => setOpenEditModal(e)}
				onSubmit={save_updated_changes}
				submitText={'Accept'}
			>
				<Flex gap={3}>
					<Text> Accept this proposal from prospect: <b> {singleProposal?.prospects?.prospect_full_name}</b> and was approved by manager: <b> {singleProposal?.sales_manager?.manager_name} </b>
					</Text>
				</Flex>
			</Modal>
		</Box>
	)
}