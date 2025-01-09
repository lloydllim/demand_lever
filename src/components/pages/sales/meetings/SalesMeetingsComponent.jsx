'use client'
import { Flex, Text, Input, Textarea } from "@chakra-ui/react"
import { ResizableTable } from "@/components/ui/table"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FaPlusCircle } from "react-icons/fa"
import { useRouter } from "next/navigation"
import { Modal } from "@/components/ui/modal";
import { Field } from "@/components/ui/field"
import SelectDropdown from '@/components/ui/select-dropdown'

import { get_all_prospect } from '@/app/api/prospects/actions'
import { get_all_vendor } from '@/app/api/vendors/actions'
import { get_all_meeting, delete_meeting, edit_meeting } from '@/app/api/meetings/actions'

export default function SalesMeetingsComponent() {
	const router = useRouter()
	const [meetings, setMeetings] = useState([])
	const [openDeleteModal, setOpenDeleteModal] = useState(false)
	const [openEditModal, setOpenEditModal] = useState(false)
	const [meetingId, setMeetingId] = useState('')
	const [prospects, setProspects] = useState([])
	const [vendors, setVendors] = useState([])
	const [modalContent, setModalContent] = useState({
		meetings_prospect_id: '',
		meetings_clients_id: '',
		meetings_team: '',

	})
	const [meetingForm, setMeetingForm] = useState({
		meetings_prospect_id: '',
		meetings_clients_id: '',
		meeting_team: '',
		meetings_appointment_date: '',
		meetings_timezone: '',
		meetings_screenshot: '',
		meetings_campaign: '',
		meetings_notes: '',
		meetings_id: ''
	})

	useEffect(() => {
		fetchAllMeeting()
		fetchProspects()
		fetchVendors()
	}, [])

	function formatToISO(dateString) {
		// Parse the date string into a Date object
		console.info('what is date str >>>> ', dateString)
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

	const fetchProspects = async () => {
		const records = await get_all_prospect()
		setProspects(records)
	}

	const fetchVendors = async () => {
		const records = await get_all_vendor()
		setVendors(records)
	}

	const fetchAllMeeting = async () => {
		const records = await get_all_meeting()
		setMeetings(records)
	}

	const deleteMeeting = async () => {
		await delete_meeting({ meetings_id: meetingId })
		await get_all_meeting()
		setOpenDeleteModal(false)
	}

	const open_delete_prompt = (meeting_id) => {
		setOpenDeleteModal(true)
		setMeetingId(meeting_id)
	}

	const update_meeting_prompt = (e) => {
		setMeetingForm(e)
		setOpenEditModal(true)
	}

	const save_updated_changes = async () => {
		console.info( ' meeting form ?? ', meetingForm )
		await edit_meeting({
			meeetings_id: meetingForm.meetings_id,
			meetings_client_id: meetingForm.meetings_clients_id,
			meetings_prospect_id: meetingForm.prospects.prospect_id,
			meetings_team: meetingForm.meeting_team,
			meetings_timezone: meetingForm.meetings_timezone,
			meetings_campaign: Number( meetingForm.meetings_campaign ),
			meetings_appointment_date: meetingForm.meetings_appointment_date,
			meetings_screenshot: meetingForm.meetings_screenshot,
			meetings_notes: meetingForm.meetings_notes
		})
		await fetchAllMeeting()
		setOpenEditModal( false )
	}

	return <Flex mt={10} flexDirection={'column'} w={'100%'}>
		<Flex
			flexDirection={'row'}
			alignItems={'center'}
			w={'100%'}
			justifyContent={'space-between'}
		>
			<Text fontSize={20}> Meetings </Text>
			<Button onClick={() => router.push('/sales/meetings/new')}> <FaPlusCircle /> Add </Button>
		</Flex>


		<ResizableTable
			mt={3}
			columns={
				[
					// { label: "Meeting Id", value: "meetings_id" },
					{ label: "Appointment Date", value: "meetings_appointment_date" },
					{ label: "Notes", value: "meetings_notes" },
					{ label: "Campaign", value: "meetings_campaign" },
					{ label: "Client Name", value: "clients.client_full_name" },
					{ label: "Client Website", value: "clients.client_company_website" },
					{ label: "Prospect Name", value: "prospects.prospect_full_name" },
					{ label: "Propsect Company Name", value: "prospects.prospect_company_name" },
					{ label: "Prospect Website", value: "prospects.prospect_website" },
					{ label: "Prospect Phone", value: "prospects.prospect_phone_number" },
				]
			}
			data={meetings}
			editAction={(selectedItem) => update_meeting_prompt(selectedItem)}
			deleteAction={({ meetings_id }) => open_delete_prompt(meetings_id)}
		/>

		<Modal
			toggleModal={openEditModal}
			title={`Edit Meeting`}
			getModalState={e => setOpenEditModal(e)}
			onSubmit={save_updated_changes}
		>
			<Flex gap={3} position={'relative'}>
				<SelectDropdown
					collection={prospects}
					labelProp={'prospect_full_name'}
					valueProp={'prospect_id'}
					label={'Pick a prospect'}
					getSelectedChoice={e => { console.info( 'selected prospect ?? ', e ); setMeetingForm({ ...meetingForm, meetings_prospect_id: e?.value[0] })}}
				/>

				<SelectDropdown
					collection={vendors}
					labelProp={'client_full_name'}
					valueProp={'client_id'}
					label={'Pick a vendpr'}
					getSelectedChoice={e => setMeetingForm({ ...meetingForm, meetings_prospect_id: e?.value[0] })}
				/>

				<SelectDropdown
					label="Pick a team"
					collection={[
						{ label: 'Team 1', value: 'Team 1' },
						{ label: 'Team 2', value: 'Team 2' },
						{ label: 'Team 3', value: 'Team 3' }
					]}
					labelProp={'label'}
					valueProp={'value'}
					getSelectedChoice={e => setMeetingForm({ ...meetingForm, meetings_team: e?.value[0] })}
				/>
			</Flex>

			<Flex gap={3} mt={3} position={'relative'}>
				<Field label="Appointment Date" >
					<Input
						p={2}
						border="1px solid #c4c4c4"
						type='datetime-local'
						name='meetings_appointment_date'
						value={formatToISO(meetingForm?.meetings_appointment_date)}
						onChange={e => setMeetingForm({ ...meetingForm, meetings_appointment_date: new Date(e.target.value) })}
						placeholder='Enter appointment date' />
				</Field>
				<SelectDropdown
					label="Pick a Timezone"
					collection={[
						{ label: 'CST (GMT-6)', value: 'CST' },
						{ label: 'MST (GMT-7)', value: 'MST' },
						{ label: 'PST (GMT+8)', value: 'PST' },
						{ label: 'AST (GMT-9)', value: 'AST' },
						{ label: 'HAST (GMT-10)', value: 'HAST' }
					]}
					labelProp={'label'}
					valueProp={'value'}
					getSelectedChoice={e => setMeetingForm({ ...meetingForm, meetings_timezone: e?.value[0] })}
				/>
			</Flex>

			<Flex flexDirection={{ base: "column", md: 'row' }} gap={2}>

				<SelectDropdown
					mt={5}
					label="Pick a campaign, Most frequently, the answer is '$279' "
					collection={[
						{ label: '279.00', value: '279' },
						{ label: '499.00', value: '499' },
					]}
					labelProp={'label'}
					valueProp={'value'}
					getSelectedChoice={e => setMeetingForm({ ...meetingForm, meetings_campaign: e?.value[0] })}
				/>
			</Flex>

			<Field
				mt={5}
				label="Enter additional notes"
			>
				<Textarea
					variant="outline"
					p={2}
					value={meetingForm?.meetings_notes}
					onChange={e => setMeetingForm({ ...meetingForm, meetings_notes: e.target.value })}
					placeholder='Enter notes'
					border="1px solid #c4c4c4"
				></Textarea>
			</Field>

		</Modal>

		<Modal
			toggleModal={openDeleteModal}
			getModalState={e => setOpenDeleteModal(e)}
			onSubmit={deleteMeeting}
			submitText="Delete"
			title={`Remove Record`}
		>
			<Text> Are you sure to delete this meeting </Text>
		</Modal>
	</Flex>
}