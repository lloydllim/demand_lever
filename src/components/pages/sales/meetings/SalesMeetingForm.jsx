'use client'

import { Flex, Input, Spinner, Text, Textarea } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { Field } from "@/components/ui/field"
import { Button } from '@/components/ui/button'

import { FilePicker } from '@/components/ui/forms/file-picker'
import { DatePicker } from '@/components/ui/forms/date-picker'

import SelectDropdown from '@/components/ui/select-dropdown'
import { get_all_prospect } from '@/app/api/prospects/actions'
import { get_all_vendor } from '@/app/api/vendors/actions'
import { add_meeting as add_meeting_action } from '@/app/api/meetings/actions'
import { useRouter } from 'next/navigation'

export default function SalesMeetingForm() {

	const [prospects, setProspects] = useState([])
	const [vendors, setVendors] = useState([])
	const [loading, setLoading] = useState(false)
	const [submitted, setSubmitted] = useState(false)
	const router = useRouter()

	useEffect(() => {
		fetchProspects()
		fetchVendors()
	}, [])

	const fetchProspects = async () => {
		const records = await get_all_prospect()
		setProspects(records)
	}

	const fetchVendors = async () => {
		const records = await get_all_vendor()
		setVendors(records)
	}

	const [meetingForm, setMeetingForm] = useState({
		meetings_client_id: { value: '', error: true },
		meetings_appointment_date: { value: '', error: true },
		meetings_prospect_id: { value: '', error: true },
		meetings_notes: { value: '', error: false },
		meetings_team: { value: '', error: true },
		meetings_timezone: { value: '', error: true },
		meetings_campaign: { value: '', error: true },
		meetings_screenshot: { value: '', error: true },
	})

	const fieldsHasError = () => {
		return Object.values(meetingForm).some(item => item.error === true)
	}

	const submitMeetingForm = async (ev) => {
		ev.preventDefault()
		setSubmitted(true)

		console.info( 'meeting form >> ', meetingForm )
		if (!fieldsHasError()) {
			setLoading(true)
			try {
				const res = await add_meeting_action({
					meetings_appointment_date: meetingForm.meetings_appointment_date.value,
					meetings_screenshot: meetingForm.meetings_screenshot.value,
					meetings_client_id: meetingForm.meetings_client_id.value,
					meetings_prospect_id: meetingForm.meetings_prospect_id.value,
					meetings_team: meetingForm.meetings_team.value,
					meetings_timezone: meetingForm.meetings_timezone.value,
					meetings_campaign: meetingForm.meetings_campaign.value,
					meetings_notes: meetingForm.meetings_notes.value
				})

				console.info( 'res is ? ', res )
				router.push('/sales/meetings')
				setLoading(false)
			} catch (err) {
				console.error('Error adding meeting: ', err)
			}
		}

	}

	const convertImageToBase64 = (ev) => {
		const file = event.target.files[0]

		if (file) {
			const reader = new FileReader();


			reader.onload = function (e) {
				const base64String = e.target.result.split(',')[1];
				console.log(base64String);

				setMeetingForm({
					...meetingForm,
					meetings_screenshot: base64String
				})
			};

			reader.readAsDataURL(file);
		}
	}

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


	return <Flex w={'100%'} flexDirection={'column'}>

		<form onSubmit={submitMeetingForm}>
			<Text fontSize={'xl'} fontWeight={'semibold'}> Create a new meeting </Text>
			<Flex flexDirection={{ base: "column", md: 'row' }} gap={2} mt={8} >
				<SelectDropdown
					collection={prospects}
					labelProp={'prospect_full_name'}
					valueProp={'prospect_id'}
					submitted={submitted}
					fieldName={'Prospect'}
					required
					label={'Pick a prospect'}
					isValid={e => setMeetingForm(prevState => ({
						...prevState,
						meetings_prospect_id: {
							...prevState.meetings_prospect_id,
							error: e
						}
					}))}
					getSelectedChoice={e => setMeetingForm(prevState => ({
						...prevState,
						meetings_prospect_id: {
							...prevState.meetings_prospect_id,
							value: e?.value[0],
						}
					}))
					}
				/>

				<SelectDropdown
					collection={vendors}
					labelProp={'client_full_name'}
					valueProp={'client_id'}
					label={'Pick a vendor'}
					fieldName={'Vendor'}
					submitted={submitted}
					required
					isValid={e =>
						setMeetingForm(prevState => ({
							...prevState,
							meetings_client_id: {
								...prevState.meetings_client_id,
								error: e
							}
						}))
					}
					getSelectedChoice={
						e => setMeetingForm(prevState => ({
							...prevState,
							meetings_client_id: {
								...prevState.meetings_client_id,
								value: e?.value[0],
							}
						}))
					}
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
					fieldName={'Team'}
					submitted={submitted}
					required
					isValid={ e => setMeetingForm( prevState => ({
						...prevState,
						meetings_team: {
							...prevState.meetings_team,
							error: e
						}
					}))
					}
					getSelectedChoice={e => setMeetingForm(prevState =>
					({
						...prevState,
						meetings_team: {
							...prevState.meetings_team,
							value: e?.value[0]
						}
					})
					)}
				/>
			</Flex>

			<Flex flexDirection={{ base: "column", md: 'row' }} mt={5} gap={2}>
				<DatePicker
					fieldName={'Appointment Date'}
					label={'Appointment Date'}
					name={'meetings_appointment_date'}
					submitted={submitted}
					required
					isValid={ e => setMeetingForm( prevState => ({
						...prevState,
						meetings_appointment_date: {
							...prevState.meetings_appointment_date,
							error: e
						}
						}))}
					getSelectedDate={ e => setMeetingForm( prevState => ({
						...prevState,
						meetings_appointment_date: {
							...prevState.meetings_appointment_date,
							value: e
						}
						}))
					}
				/>
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
					fieldName='Timezone'
					valueProp={'value'}
					required
					submitted={submitted}
					isValid={e => setMeetingForm({
						...meetingForm,
						meetings_timezone: {
							value: meetingForm?.meetings_timezone?.value,
							error: e
						}
					})}
					getSelectedChoice={e => setMeetingForm({
						...meetingForm,
						meetings_timezone: {
							...meetingForm?.meetings_timezone,
							value: e?.value[0],
						}
					})}
				/>
			</Flex>

			<FilePicker
				mt={5}
				name={'meetings_screenshot'}
				fieldName={'Appointment calendar screenshot'}
				accepts='images/*'
				required
				submitted={submitted}
				isValid={ e => setMeetingForm( prevState => ({
						...prevState,
						meetings_screenshot: {
							...prevState.meetings_screenshot,
							error: e
						}
					}))
				}
				getSelectedFile={ base64String => setMeetingForm( prevState =>
					({
						...prevState,
						meetings_screenshot: {
							...prevState.meetings_screenshot,
							value: base64String
						}
					}))
				}
			/>

			<Flex flexDirection={{ base: "column", md: 'row' }} gap={2}>

				<SelectDropdown
					mt={5}
					label="Pick a campaign, Most frequently, the answeris '$279' "
					collection={[
						{ label: '279.00', value: '279' },
						{ label: '499.00', value: '499' },
					]}
					labelProp={'label'}
					fieldName='Campaign'
					valueProp={'value'}
					submitted={submitted}
					required
					isValid={ e => setMeetingForm( prevState => ({
						...prevState,
						meetings_campaign: {
							...prevState.meetings_campaign,
							error: e
						}
					}))
					}
					getSelectedChoice={e => setMeetingForm( prevState => 
						({ 
							...prevState, meetings_campaign: {
								...prevState.meetings_campaign,
								value: e?.value[0]
							}
						})
					)}
				/>
			</Flex>

			<Field
				mt={5}
				label="Enter additional notes"
			>
				<Textarea
					variant="outline"
					p={2}
					value={meetingForm?.meetings_notes?.value}
					onChange={e => setMeetingForm( prevState => 
						({ 
							...prevState,
							meetings_notes: {
								...prevState.meetings_notes,
								value: e.target.value
							}
						}))}
					placeholder='Enter notes'
					border="1px solid #c4c4c4"
				></Textarea>
			</Field>

			<Flex
				w={'100%'}
				justifyContent={'center'}
				alignItems={'center'}
				flexDirection={'column'}
				p={3}
			>
				<Button
					mt={3}
					type='submit'
					w={'45%'}
					bgColor={loading ? 'gray.600' : 'black'}

				>{loading ? <> <Spinner /> Adding Meeting... </> : 'Add Meeting'}</Button>
			</Flex>
		</form>
	</Flex>
}