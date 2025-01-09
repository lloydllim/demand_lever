'use client'

import Stepper from '@/components/ui/stepper'
import { useState, useEffect } from 'react'
import bcrypt from 'bcryptjs'
import { Field } from "@/components/ui/field"
import { Input, Flex, Box, Text, Textarea, Button } from '@chakra-ui/react'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckboxList } from '@/components/ui/checkbox-list'
import { useRouter } from 'next/navigation';
import { login as login_action } from '@/app/api/auth/actions'

import {
	add_prospect
} from '@/app/api/prospects/actions'

function PersonalDetailsForm({ get_values, hidden }) {
	const [personalDetailsForm, setPersonalDetailsForm] = useState(
		{
			firstName: '',
			password: '',
			confirm_password: '',
			lastName: '',
			linkedin: '',
			emailAddress: ''
		}
	)

	useEffect(() => {
		if ( get_values ) {
			get_values({
				...personalDetailsForm
			})
		}
	}, [personalDetailsForm])

	return <Flex display={! hidden ? 'none': 'flex'} flexDirection={'column'}>
		<Flex flexDirection={{ base: "column", md: "row" }} alignItems="end" gap={5} pt={5} display={ !hidden ? 'none': 'flex'}>
			<Field label="What's your first name ?">
				<Input
					p={2}
					border="1px solid #c4c4c4"
					name='first_name'
					value={personalDetailsForm?.firstName}
					onChange={e => setPersonalDetailsForm({ ...personalDetailsForm, firstName: e.target.value })}
					placeholder='Enter your first name' />
			</Field>

		

			<Field label="What's your last name ?">
				<Input
					p={2}
					border="1px solid #c4c4c4"
					name='last_name'
					type='text'
					value={personalDetailsForm?.lastName}
					onChange={e => setPersonalDetailsForm({ ...personalDetailsForm, lastName: e.target.value })}
					placeholder='Enter your last name' />
			</Field>
		</Flex>

		<Flex flexDirection={{ base: "column", md: "row" }} alignItems="end" gap={5} pt={5} display={ !hidden ? 'none': 'flex'}>
		<Field label="What's your password ?">
				<Input
					p={2}
					border="1px solid #c4c4c4"
					name='prospect_password'
					type='password'
					value={personalDetailsForm?.password}
					onChange={e => setPersonalDetailsForm({ ...personalDetailsForm, password: e.target.value })}
					placeholder='Enter your password' />
			</Field>

			<Field label="Confirm your password">
				<Input
					p={2}
					border="1px solid #c4c4c4"
					name='confirm_password'
					type='password'
					value={personalDetailsForm?.confirm_password}
					onChange={e => setPersonalDetailsForm({ ...personalDetailsForm, confirm_password: e.target.value })}
					placeholder='Confirm your password' />
			</Field>
		</Flex>

		<Flex flexDirection={{ base: "column", md: "row" }} alignItems="end" gap={5} pt={5}>
			<Field label="Your email address to receive a calendar invite?">
				<Text fontSize={10}> This information is only shared between DealForce, PipeLinear and the Client. No one else.</Text>
				<Input
					p={2}
					border="1px solid #c4c4c4"
					name='email_address'
					value={personalDetailsForm?.emailAddress}
					onChange={e => setPersonalDetailsForm({ ...personalDetailsForm, emailAddress: e.target.value })}
					placeholder='Enter your email address' />
			</Field>

			<Field label="What is your linkedin profile?">
				<Input
					p={2}
					border="1px solid #c4c4c4"
					name='linkedin_profile'
					value={personalDetailsForm?.linkedin}
					onChange={e => setPersonalDetailsForm({ ...personalDetailsForm, linkedin: e.target.value })}
					placeholder='Enter your linkedin profile' />
			</Field>
		</Flex>
	</Flex>
}

function CompanyProfileForm({ get_values, hidden }) {
	const [companyForm, setCompanyForm] = useState({
		company_name: '',
		company_position: '',
		company_website: '',
		company_headcount: 0,
		company_linkedin: '',
		company_description: ''
	})

	useEffect(() => {
		if ( get_values ) {
			get_values({
				...companyForm
			})
		}
	},
		[companyForm])
	return <Flex display={! hidden ? 'none': 'flex'} flexDirection={'column'}>

		<Flex flexDirection={{ base: "column", md: "row" }} alignItems="end" gap={5} pt={5} >
			<Field label="What is your company name?">
				<Input
					p={2}
					border="1px solid #c4c4c4"
					name='company_name'
					value={companyForm?.company_name}
					onChange={(e) => setCompanyForm({ ...companyForm, company_name: e.target.value })}
					placeholder='Enter your company name' />
			</Field>

			<Field label="What is your position in the company?">
				<Input
					p={2}
					border="1px solid #c4c4c4"
					name='company_position'
					value={companyForm?.company_position}
					onChange={(e) => setCompanyForm({ ...companyForm, company_position: e.target.value })}

					placeholder='Enter your position' />
			</Field>
		</Flex>

		<Flex flexDirection={{ base: "column", md: "row" }} alignItems="end" gap={5} pt={5}>
			<Field label="What is your company website?">
				<Input
					p={2}
					border="1px solid #c4c4c4"
					name='company_website'
					value={companyForm?.company_website}
					onChange={(e) => setCompanyForm({ ...companyForm, company_website: e.target.value })}
					placeholder='Enter your company website' />
			</Field>
			<Field label="How many full time, part time, and contractors work at your organization?" >
				<Input
					p={2}
					border="1px solid #c4c4c4"
					type='number'
					name='company_headcount'
					value={companyForm?.company_headcount}
					onChange={e => setCompanyForm({ ...companyForm, company_headcount: Number( e.target.value ) })}
					placeholder='Enter your # of employees' />
			</Field>
		</Flex>
		
	</Flex>
}

function HyperVendorForm({ get_values, hidden }) {
	const [agreement, setAgreement] = useState(false)
	const [hyperVendorForm, setHyperVendorForm] = useState({
		phone_number: '',
		other_services: [],
		frequency: [],
		notes: ''
	})

	useEffect(() => {
		if (get_values) {
			get_values({
				...hyperVendorForm
			})
		}
	}, [hyperVendorForm])
	return <Flex display={ !hidden ? 'none': 'flex'} flexDirection={'column'}>
		<Box>
			<Text textAlign="justify">
				Please confirm that you’re okay with HyperVendor to send you text messages to coordinate meetings. We cannot complete your sign-up without a valid phone # to text.
				This also confirms we can reach out with a quick call to clarify any details.
			</Text>

			<Checkbox
				cursor="pointer"
				mt={3}
				value={agreement}
				onCheckedChange={({ checked }) => setAgreement(checked)}
			> Accept </Checkbox>
		</Box>

		{
			agreement ? <Box mt={5} pt={5} borderTopColor='gray.200' borderTopWidth={1}>

				<Field label="TEXTING: What is the best phone number to text you">
					<Input
						p={2}
						border="1px solid #c4c4c4"
						type='tel'
						value={hyperVendorForm?.phone_number}
						onChange={e => setHyperVendorForm({ ...hyperVendorForm, phone_number: e.target.value })}
						placeholder='Enter your Phone number' />
				</Field>

				<CheckboxList
					mt={5}
					header="What type of company (services/products) do you want to have meetings with?"
					items={
						[
							{ label: "Growth Marketing agencies", value: "Growth Marketing agencies" },
							{ label: "Recruiting and staffing firms", value: "Recruiting and staffing firms" },
							{ label: "Productivity software or consultants", value: "Productivity software or consultants" },
							{ label: "Software or SaaS companies", value: "Software or SaaS companies" },
							{ label: "Business growth software or consultants", value: "Business growth software or consultants" },
							{ label: "CRM, Outreach software or services", value: "CRM, Outreach software or services" },
							{ label: "Accounting and financial for taxes or cash flow growth", value: "Accounting and financial for taxes or cash flow growth" },
							{ label: "General business consulting", value: "General business consulting" },
							{ label: "Other", value: "Other" }
						]
					}
					getSelectedChoices={e => setHyperVendorForm({ ...hyperVendorForm, other_services: e })}
				/>

				<CheckboxList
					mt={5}
					header="How frequently would you like to have 30-min demo calls?"
					items={
						[
							{ label: "1 per week for $100 Amazon eCard", value: "1 per week for $100 Amazon eCard" },
							{ label: "2 per week for $200 Amaznon eCard", value: "2 per week for $200 Amaznon eCard" },
							{ label: "3 per week for $300 Amazon eCard", value: "3 per week for $300 Amazon eCard" },
						]
					}
					getSelectedChoices={e => setHyperVendorForm({ ...hyperVendorForm, frequency: e })}
				/>

				<Field
					mt={5}
					label="Additional Notes"
				>
					<Textarea
						variant="outline"
						p={2}
						placeholder='Enter additional notes'
						value={hyperVendorForm.notes}
						onChange={e => setHyperVendorForm({ ...hyperVendorForm, notes: e.target.value })}
						border="1px solid #c4c4c4"
					></Textarea>
				</Field>
			</Box> : null
		}
	</Flex>
}

export default function ProspectSignup() {
	const [personalDetailsForm, setPersonalDetailsForm] = useState(
		{
			firstName: '',
			lastName: '',
			password: '',
			linkedin: '',
			emailAddress: '',
			confirm_password: '',
		}
	)
	const [companyForm, setCompanyForm] = useState(
		{
			company_name: '',
			company_position: '',
			company_website: '',
			company_headcount: 0,
		}
	)
	const [hyperVendorForm, setHyperVendorForm] = useState(
		{
			phone_number: '',
			other_services: [],
			frequency: [],
			notes: ''
		}
	)
	const [currentStep, setCurrentStep] = useState(1)
	const [ loading, setLoading ] = useState( false )

	const steps = [
		{ 
			id: 1,
			label: "Personal Details",
			component: <PersonalDetailsForm key={1} hidden={currentStep == 1} get_values={e => setPersonalDetailsForm(e)} /> 
		},
		{ 
			id: 2,
			label: "Company Profile",
			component: <CompanyProfileForm key={2} hidden={currentStep == 2} get_values={e => setCompanyForm(e)} /> 
		},
		{
			id: 3,
			label: "Hyper Vendor",
			component: <HyperVendorForm key={3} hidden={currentStep == 3} get_values={e => setHyperVendorForm(e)} /> 
		},
	]
	const router = useRouter()

	const submitForm = async () => {
		setLoading( true )

		const { firstName, lastName, linkedin, emailAddress, password } = personalDetailsForm
		const { company_headcount, company_name, company_position, company_website } = companyForm
		const { phone_number, other_services, frequency, notes } = hyperVendorForm

		const hashed_password = await bcrypt.hash( password, 10 )

		const record = await add_prospect({
			prospect_last_name: firstName,
			prospect_first_name: lastName,
			prospect_linkedin_profile: linkedin,
			prospect_job_title: company_position,
			prospect_headcount: company_headcount,
			prospect_important_notes: notes,
			prospect_pitched_campaigns: '',
			prospect_company_name: company_name,
			prospect_phone_number: phone_number,
			prospect_email_address: emailAddress,
			prospect_website: company_website,
			prospect_frequency: frequency.join(','),
			prospect_other_services: other_services.join(','),
			prospect_date_submitted: new Date(),
			prospect_password_hash: hashed_password,
		})
		await login_action( emailAddress, password, 'prospects' )

		router.push( '/prospects')
		setLoading( false )
		console.info(' [added success] record is ', record)
	}
	return <>
		<Stepper
			steps={steps}
			getCurrentStep={e => setCurrentStep(e)}
			onSubmit={() => submitForm()}
			loading={ loading }
			loadingText='Saving record...'
			/>
	</>
}

