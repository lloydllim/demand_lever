'use client'

import { Card, Box, Flex, Text, Input, Textarea, Button, Spinner } from '@chakra-ui/react'
import { RadioGroup } from '@/components/ui/radio-group'
import { Field } from "@/components/ui/field"
import { CheckboxList } from '@/components/ui/checkbox-list'
import { getSessionUser } from '@/app/api/auth/actions'
import { useEffect, useState } from 'react'
import { get_single_vendor, edit_vendor } from '@/app/api/vendors/actions'
import { Modal } from "@/components/ui/modal";

export default function VendorsProfile() {

	const [vendorInfo, setVendorInfo] = useState()
	const [loading, setLoading] = useState(false)
	const [promptModal, setPromptModal] = useState(false)

	useEffect(() => {
		getVendorInfo()
	}, [])

	const getVendorInfo = async () => {
		const session_data = await getSessionUser()
		console.info('session data is ?? ', session_data)
		const vendor = await get_single_vendor({ client_id: session_data.id })
		console.info(' vendor info >> ', vendor)
		setVendorInfo(vendor)

	}

	const saveVendorChanges = async (ev) => {
		ev.preventDefault()
		setPromptModal( false )
		setLoading(true)
		
		console.info('vendor form >>> ', vendorInfo)
		const newRecord = await edit_vendor({
			...vendorInfo
		})
		
		setVendorInfo({
			...newRecord
		})

		setPromptModal( true )
		console.info('new Recor d ', newRecord)
		setLoading(false)
	}

	const toggleModal = () => {
		setPromptModal( )
	}

	return (
		<Box w={'100%'}>
			<form onSubmit={saveVendorChanges}>

				<Card.Root
					variant={'elevated'}
					w={'100%'}
				>
					<Card.Body>
						<Flex>
							<Text fontSize={'2xl'}> Personal Profile </Text>
						</Flex>

						<Flex mt={5} gap={3}>
							<Field label="What is your personal email?">
								<Input
									p={2}
									border="1px solid #c4c4c4"
									type='text'
									value={vendorInfo?.client_personal_email}
									onChange={e => setVendorInfo({ ...vendorInfo, client_personal_email: e.target.value })}
									placeholder='Enter your perosnal email' />
							</Field>
							<Field label="What is your full name?">
								<Input
									p={2}
									border="1px solid #c4c4c4"
									type='text'
									value={vendorInfo?.client_full_name}
									onChange={e => setVendorInfo({ ...vendorInfo, client_full_name: e.target.value })}
									placeholder='Enter your full name' />
							</Field>
						</Flex>
					</Card.Body>
				</Card.Root>

				<Card.Root
					variant={'elevated'}
					w={'100%'}
					mt={5}
				>
					<Card.Body>
						<Flex>
							<Text fontSize={'2xl'}> Company Profile </Text>
						</Flex>

						<Flex mt={8}>
							<Box>
								<Text textAlign={"justify"}> What would you like to sign up for? </Text>
								<RadioGroup
									mt={3}
									defaultValue={Number(vendorInfo?.client_referral_for)}
									getSelectedChoice={e => setVendorInfo({ ...vendorInfo, client_referral_for: e?.value })}
									orientation="vertical"
									options={[
										{ label: "Vendor Referral List: $279/confirmed meeting", value: 279 },
										{ label: "Vendor Referral List: $499/confirmed meeting", value: 499 }
									]}
								/>
							</Box>
						</Flex>

						<Flex mt={5} gap={3}>
							
							<Field label="What is your company name?">
								<Input
									p={2}
									border="1px solid #c4c4c4"
									type='text'
									value={vendorInfo?.client_company_name}
									onChange={e => setVendorInfo({ ...vendorInfo, client_company_name: e.target.value })}
									placeholder='Enter your company name' />
							</Field>
							<Field label="What is the email address of the main point-of-contact?">
								<Input
									p={2}
									border="1px solid #c4c4c4"
									type='text'
									value={vendorInfo?.client_email}
									onChange={e => setVendorInfo({ ...vendorInfo, client_email: e.target.value })}
									placeholder='Enter email address' />
							</Field>
						</Flex>

						<Flex mt={5} gap={3} alignItems={'end'}>
							<Field label="What is the phone number of the main point-of-contact?">
								<Input
									p={2}
									border="1px solid #c4c4c4"
									type='tel'
									value={vendorInfo?.client_phone_number}
									onChange={e => setVendorInfo({ ...vendorInfo, client_phone_number: e.target.value })}
									placeholder='(201) 555-0123' />
							</Field>
							<Field label="What is your linkedin profile?">
								<Input
									p={2}
									border="1px solid #c4c4c4"
									value={vendorInfo?.client_linkedin_profile}
									onChange={e => setVendorInfo({ ...vendorInfo, client_linkedin_profile: e.target.value })}
									type='text'
									placeholder='Enter your linkedin profile' />
							</Field>
							<Field label="What is your company website?">
								<Input
									p={2}
									border="1px solid #c4c4c4"
									value={vendorInfo?.client_company_website}
									onChange={e => setVendorInfo({ ...vendorInfo, client_company_website: e.target.value })}
									type='text'
									placeholder='Enter your company website' />
							</Field>
						</Flex>
					</Card.Body>
				</Card.Root>

				<Card.Root
					variant={'elevated'}
					w={'100%'}
					mt={5}
				>
					<Card.Body>
						<Flex>
							<Text fontSize={'2xl'}> Market Profile </Text>
						</Flex>

						<Flex mt={8} gap={5} alignItems={'end'}>
							<Field
								label="What is your most compelling value proposition?"
							>
								<Textarea
									variant="outline"
									p={2}
									placeholder='Enter compelling value propositions'
									value={vendorInfo?.client_value_proposition}
									onChange={e => setVendorInfo({ ...vendorInfo, client_value_proposition: e.target.value })}

									border="1px solid #c4c4c4"
								></Textarea>
							</Field>
							<Field
								label="What is the industry that you target? Is it a hard requirement?"
							>
								<Textarea
									variant="outline"
									p={2}
									placeholder='Enter target industries'
									value={vendorInfo?.client_industry}
									onChange={e => setVendorInfo({ ...vendorInfo, client_industry: e.target.value })}
									border="1px solid #c4c4c4"
								></Textarea>
							</Field>
							<Field
								label="What are the job titles that our team should focus on?"
							>
								<Textarea
									variant="outline"
									p={2}
									placeholder='CEO, Founder, President, CMO, CTO, Director IT, etc.`'
									border="1px solid #c4c4c4"
									value={vendorInfo?.client_preferred_job_titles}
									onChange={e => setVendorInfo({ ...vendorInfo, client_preferred_job_titles: e.target.value })}

								></Textarea>
							</Field>
						</Flex>

						{/* <Flex mt={5}>
							<CheckboxList
								header={"What is your ideal target's company headcount ?"}
								items={
									[
										{ label: "1-10 headcount", value: "1" },
										{ label: "11-20 headcount", value: "2" },
										{ label: "21-50 headcount", value: "3" },
										{ label: "51-100 headcount", value: "4" },
										{ label: "101+ headcount", value: "5" }
									]
								}
							/>
						</Flex> */}

					</Card.Body>
				</Card.Root>

				<Flex mt={3} justifyContent={'center'} w="100%">
					<Button
						backgroundColor="black"
						px={10}
						color="white"
						type='submit'
						bgColor={loading ? 'gray.600' : 'black'}
						variant="subtle"
						fontSize="12px">
						{ loading ? <> <Spinner /> Saving Changes... </> : "Save Changes" }	
						</Button>
				</Flex>
			</form>

		<Modal
			title={`Profile Edit`}
			toggleModal={promptModal}
			cancelText="Got it"
		>
			<Text> Profile Updated</Text>
		</Modal>
		</Box>
	)
}