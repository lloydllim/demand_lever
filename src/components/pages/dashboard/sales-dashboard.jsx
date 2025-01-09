'use client'

import HeaderBar from "@/components/ui/header-bar"
import { Flex, Box, Card, Text } from "@chakra-ui/react"
import { ResizableTable } from "@/components/ui/table";
import { get_proposals, edit_proposal } from "@/app/api/proposals/actions";
import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { getSessionUser } from "@/app/api/auth/actions";

export default function SalesManagerDashboard() {

	const prospects = [
		{
			id: 0,
			first_name: "sdfsdf",
			status: "Active",
			last_name: 'sdfsdf',
			full_name: 'sdfsdf  sdfsdfsdf',
			position: "VP of Sales Transformation",
			industry: 'Information Services',
			headcount: '30000',
			notes: `"As per sdfsdf, the sdfdsf's Asdfsdfdsf
Company email: 
sdfsdf.sdfsdg@nisdfsdf.com"`,
			pitched_campaign: `"sdfsdfsdf sdfsdf sdfC sdfsdf, sdgdfgdfgdfg sdfsdf sdf sdf sd
sdfdsgdfgdfgdfgdfg
asdasfdsfsdfdsf
dfgdfgdfg 
dfgdfgdfg
Csdfsdfsdf
Qsdfsdf "`,
			company_name: "sdfdsf",
			company_description: `"ssdf sdfs dfsdfsd fsfsdfsdfsdf f adfsdf 9sdfsdfsdfsdf sdf sdf sdfhsdfsdfsdfmore insdfdsft Nsdfdsfsdf."`,
			company_website: "https://nielseniq.com/global/en/",
			frequency: '3 per Week for $300 Amazon eCard',
			services: 'Training and Development, Manager Coaching, Sales Enablement',
			date_submitted: 'April 6, 2022',
			function: "Sales",
			timezone: 'EST',
			location: 'Boca Raton, Florida',
			linkedin_profile: "https://linkedin.profile.com",
			processed: 'checked',
			created: '6/2/2022',
			last_updated: '8/26/2024',
			onboarding_week: '23'
		},
	]

	for (let i = 0; i < 100; i++) {
		prospects.push(
			{
				id: i + 1,
				first_name: "sdfsdf",
				status: "Active",
				last_name: 'sdfsdf',
				full_name: 'sdfsdf  sdfsdfsdf',
				position: "VP of Sales Transformation",
				industry: 'Information Services',
				headcount: '30000',
				notes: `"As per sdfsdf, the sdfdsf's Asdfsdfdsf
Company email: 
sdfsdf.sdfsdg@nisdfsdf.com"`,
				pitched_campaign: `"sdfsdfsdf sdfsdf sdfC sdfsdf, sdgdfgdfgdfg sdfsdf sdf sdf sd
sdfdsgdfgdfgdfgdfg
asdasfdsfsdfdsf
dfgdfgdfg 
dfgdfgdfg
Csdfsdfsdf
Qsdfsdf "`,
				company_name: "sdfdsf",
				company_description: `"ssdf sdfs dfsdfsd fsfsdfsdfsdf f adfsdf 9sdfsdfsdfsdf sdf sdf sdfhsdfsdfsdfmore insdfdsft Nsdfdsfsdf."`,
				company_website: "https://nielseniq.com/global/en/",
				frequency: '3 per Week for $300 Amazon eCard',
				services: 'Training and Development, Manager Coaching, Sales Enablement',
				date_submitted: 'April 6, 2022',
				function: "Sales",
				timezone: 'EST',
				location: 'Boca Raton, Florida',
				linkedin_profile: "https://linkedin.profile.com",
				processed: 'checked',
				created: '6/2/2022',
				last_updated: '8/26/2024',
				onboarding_week: '23'
			}
		)
	}

	const [proposals, setProposals] = useState([])
	const [loading, setLoading] = useState(false)
	const [openEditModal, setOpenEditModal] = useState(false)
	const [singleProposal, setSingleProposal] = useState({})

	useEffect(() => {
		fetchAllProposals()
	}, [])

	const fetchAllProposals = async () => {
		setLoading(true)
		const rec = await get_proposals()
		setProposals(rec)
		console.info(rec)
		setLoading(false)
	}

	const updateSalesProposal = (singleProposal) => {
		setOpenEditModal(true)
		setSingleProposal(singleProposal)
		console.info ( singleProposal )
	}

	const save_updated_changes = async () => {
		const session_data = await getSessionUser()
		const { id: proposal_manager_id } = session_data
		console.info( 'single prop ? ', session_data )

		const {
			proposal_id,
			proposal_client_id,
		} = singleProposal

		await edit_proposal({
			proposal_id: proposal_id,
			proposal_client_id: proposal_client_id,
			proposal_manager_id: proposal_manager_id,
			proposal_status: 'approved'
		})

		console.info( 'done updating ...')

		setOpenEditModal( false )
		await fetchAllProposals()
	}

	return <Flex flexDirection={'column'} w={'100%'}>
		<HeaderBar
			header_items={
				[
					{ label: "Company", value: "company" },
					{ label: "Prospects", value: "prospects" },
					{ label: "Status", value: "status" },
					{ label: "Notes", value: "notes" },
				]
			}
		/>

		<Box mt={10}>
			<ResizableTable
				columns={
					[
						{ label: "Vendor Company name", value: "clients.client_company_name" },
						{ label: "Vendor Full name", value: "clients.client_full_name" },
						{ label: "Prospect Company name", value: "prospects.prospect_company_name" },
						{ label: "Reason", value: "proposal_prospect_paragraph" },
						{ label: "Assigned Manager" , value: "sales_manager.manager_name" },
						{ label: "Status", value: "proposal_status" },
					]
				}
				data={proposals}
				editAction={(selectedItem) => updateSalesProposal(selectedItem)}

			/>
		</Box>
		<Modal
			toggleModal={openEditModal}
			title={`Proposal Information`}
			getModalState={e => setOpenEditModal(e)}
			onSubmit={save_updated_changes}
			submitText={'Approve'}
		>
			<Flex gap={3}>
				<Text> Aprrove this proposal from prospect: <b> {singleProposal?.prospects?.prospect_full_name}</b> </Text>
			</Flex>
		</Modal>
	</Flex>
}