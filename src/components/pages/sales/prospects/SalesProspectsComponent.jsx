'use client'

import { ResizableTable } from "@/components/ui/table";
import { Flex, Input, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Field } from "@/components/ui/field";
import {
	get_all_prospect,
	delete_prospect as delete_prospect_action,
	edit_prospect as edit_prospect_action
} from "@/app/api/prospects/actions";


export default function SalesProspects() {
	const [ prospects, setProspects ] = useState([])
	const [ openEditModal, setOpenEditModal ] = useState( false )
	const [ openDeleteModal, setOpenDeleteModal ] = useState( false )
	const [ modalContent, setModalContent ] = useState({
		prospect_first_name: '',
		prospect_last_name: '',
		prospect_id: ''
	})
	const [ modalContentDelete, setModalContentDelete ] = useState( {
		prospect_id: '',
		prospect_first_name: ''
	} )

	useEffect(() => {
		fetch_all_prospect()
	}, [])

	const fetch_all_prospect = async () => {
		const records = await get_all_prospect()
		setProspects(records)
	}

	const update_prospect = (selectedItem) => {
		setModalContent(selectedItem)
		setOpenEditModal(true)
	}

	const save_updated_changes = async () => {
		const { prospect_id, prospect_first_name, prospect_last_name } = modalContent
		
		await edit_prospect_action({
			prospect_id: prospect_id,
			prospect_first_name: prospect_first_name,
			prospect_last_name: prospect_last_name
		})
		await fetch_all_prospect()
		setOpenEditModal( false )
	}
	
	const delete_prospect = async () => {
		await delete_prospect_action({ prospect_id: modalContentDelete.prospect_id })
		await fetch_all_prospect()
		setOpenDeleteModal( false )
	}

	const open_delete_prompt = ( prospect_id, prospect_first_name ) => {
		setModalContentDelete({
			prospect_id: prospect_id,
			prospect_first_name: prospect_first_name
		})
		setOpenDeleteModal( true )
	}

	return <Flex mt={10} flexDirection={'column'} w={'100%'}>
		<Text fontSize={'3xl'}> Prospects </Text>

		<ResizableTable
			mt={3}
			columns={
				[
					{ label: "First Name", value: 'prospect_first_name' },
					{ label: "Last Name", value: 'prospect_last_name' },
					{ label: "Full Name", value: 'prospect_full_name' },
					{ label: "Job title", value: 'prospect_job_title' },
					{ label: "Status", value: 'prospect_status' },
				]
			}
			editAction={(selectedItem) => update_prospect(selectedItem)}
			deleteAction={({ prospect_id, prospect_first_name }) => open_delete_prompt(prospect_id, prospect_first_name)}
			data={prospects || []}
		/>
		<Modal
			toggleModal={openEditModal}
			title={`Edit ${modalContent.prospect_first_name}`}
			getModalState={e => setOpenEditModal(e)}
			onSubmit={save_updated_changes}
		>
			<Flex gap={3}>
				<Field label="What's your first name ?">
					<Input
						p={2}
						border="1px solid #c4c4c4"
						name='first_name'
						value={modalContent?.prospect_first_name}
						onChange={e => setModalContent({ ...modalContent, prospect_first_name: e.target.value })}
						placeholder='Enter your first name' />
				</Field>

				<Field label="What's your last name ?">
					<Input
						p={2}
						border="1px solid #c4c4c4"
						name='last_name'
						value={modalContent?.prospect_last_name}
						onChange={e => setModalContent({ ...modalContent, prospect_last_name: e.target.value })}
						placeholder='Enter your last name' />
				</Field>
			</Flex>
		</Modal>
		<Modal
			toggleModal={ openDeleteModal }
			getModalState={ e => setOpenDeleteModal(e) }
			onSubmit={delete_prospect}
			submitText="Delete"
			title={ `Remove Record`}
		>
			<Text> Are you sure to delete the record of <b>{modalContentDelete.prospect_first_name}</b> </Text> 
		</Modal>
	</Flex>
}