'use client'

import Stepper from '@/components/ui/stepper'
import { Text, Box, Input, Flex, Textarea, useStatStyles } from '@chakra-ui/react'
import { CheckboxList } from '@/components/ui/checkbox-list'
import { RadioGroup } from '@/components/ui/radio-group'
import { Field } from "@/components/ui/field"
import { useState, useEffect } from 'react'
import {
	add_vendor as add_vendor_action,
	edit_vendor as edit_vendor_action,
	delete_vendor as delete_vendor_action,
	get_all_vendor as get_all_vendor_action
} from '@/app/api/vendors/actions'
import { login as login_action } from '@/app/api/auth/actions'
import { useRouter } from 'next/navigation'
import bcrypt from 'bcryptjs'


function InitialAgreementForm({ get_values, hidden }) {
	return <Box display={!hidden ? 'none' : 'initial'}>
		<Text textAlign={'justify'}> {`1. Pipelinear operates a sales team that primarily prospects cold outreach sales channels.`} </Text>
		<Text textAlign={'justify'}> {`2. We ask prospects to have deep-dive 30-min interview with us in exchange for an incentive to learn ongoing initiatives.`} </Text>
		<Text textAlign={'justify'}> {`3. We book sales meetings with target market prospects that are buying what our client's offer`} </Text>
		<RadioGroup
			mt={3}
			orientation="horizontal"
			options={[
				{ label: "I accept", value: true },
				{ label: "I don't accept", value: false }
			]}
		/>
	</Box>
}

function PersonalInfoForm({ get_values, hidden }) {

	const [ personalInfo, setPersonalInfo ] = useState({
		client_personal_email: '',
		client_password: '',
		confirm_password: ''
	})

	useEffect(() => {
		if ( get_values ) {
			get_values({
				...personalInfo
			})
		}
	}, [personalInfo])

	return <Box display={!hidden ? 'none' : 'initial'}>
		<Field label="What is your perosnal email address?" mt={5}>
			<Input
				p={2}
				border="1px solid #c4c4c4"
				type='text'
				value={personalInfo?.client_personal_email}
				onChange={e => setPersonalInfo({ ...personalInfo, client_personal_email: e.target.value })}
				placeholder='Enter email address' />
		</Field>
		<Field label="Enter your password" mt={5}>
			<Input
				p={2}
				border="1px solid #c4c4c4"
				type='password'
				value={personalInfo?.client_full_name}
				onChange={e => setPersonalInfo({ ...personalInfo, client_password: e.target.value })}
				placeholder='Enter password' />
		</Field>
		<Field label="Confirm your password" mt={5}>
			<Input
				p={2}
				border="1px solid #c4c4c4"
				type='password'
				value={personalInfo?.client_full_name}
				onChange={e => setPersonalInfo({ ...personalInfo, confirm_password: e.target.value })}
				placeholder='Enter password' />
		</Field>
	</Box>
}

function CompanyDetailsForm({ get_values, hidden }) {
	const [companyForm, setCompanyForm] = useState({
		client_full_name: '',
		client_company_name: '',
		client_company_website: '',
		client_email: '',
		client_phone_number: '',
		client_linkedin_profile: '',
		client_referral_for: ''
	})

	useEffect(() => {
		if (get_values) {
			get_values({
				...companyForm
			})
		}
	}, [companyForm])
	return <Flex display={!hidden ? 'none' : 'flex'} flexDirection={'column'}>
		<Box>
			<Text textAlign={"justify"}> What would you like to sign up for? </Text>
			<RadioGroup
				mt={3}
				orientation="vertical"
				getSelectedChoice={e => setCompanyForm({ ...companyForm, client_referral_for: e })}
				options={[
					{ label: "Vendor Referral List: $279/confirmed meeting", value: 279 },
					{ label: "Vendor Referral List: $499/confirmed meeting", value: 499 }
				]}
			/>
		</Box>

		<Field label="What is your full name?" mt={5}>
			<Input
				p={2}
				border="1px solid #c4c4c4"
				type='text'
				value={companyForm?.client_full_name}
				onChange={e => setCompanyForm({ ...companyForm, client_full_name: e.target.value })}
				placeholder='Enter your full name' />
		</Field>

		<Flex flexDirection={{ base: "column", md: "row" }} alignItems={"end"} gap={5} mt={5}>
			<Field label="What is your company name?">
				<Input
					p={2}
					value={companyForm?.client_company_name}
					onChange={e => setCompanyForm({ ...companyForm, client_company_name: e.target.value })}
					border="1px solid #c4c4c4"
					type='text'
					placeholder='Enter your company name' />
			</Field>

			<Field label="What is the email address of the main point-of-contact?">
				<Input
					p={2}
					border="1px solid #c4c4c4"
					type='text'
					value={companyForm?.client_email}
					onChange={e => setCompanyForm({ ...companyForm, client_email: e.target.value })}
					placeholder='Enter email address' />
			</Field>
		</Flex>

		<Field label="What is the phone number of the main point-of-contact?" mt={5}>
			<Input
				p={2}
				border="1px solid #c4c4c4"
				type='tel'
				value={companyForm?.client_phone_number}
				onChange={e => setCompanyForm({ ...companyForm, client_phone_number: e.target.value })}
				placeholder='(201) 555-0123' />
		</Field>

		<Flex flexDirection={{ base: "column", md: "row" }} alignItems={"end"} gap={5} mt={5}>
			<Field label="What is your linkedin profile?">
				<Input
					p={2}
					border="1px solid #c4c4c4"
					type='text'
					value={companyForm?.client_linkedin_profile}
					onChange={e => setCompanyForm({ ...companyForm, client_linkedin_profile: e.target.value })}
					placeholder='Enter your linkedin profile' />
			</Field>
			<Field label="What is your company website?">
				<Input
					p={2}
					border="1px solid #c4c4c4"
					type='text'
					value={companyForm?.client_company_website}
					onChange={e => setCompanyForm({ ...companyForm, client_company_website: e.target.value })}
					placeholder='Enter your company website' />
			</Field>
		</Flex>
	</Flex>
}

function MarketingDetialsForm({ get_values, hidden }) {
	const [marketingDetailsForm, setMarketingDetailsForm] = useState({
		client_value_proposition: '',
		client_industry: '',
		client_calendly: '',
		client_preferences: '',
		client_preferred_job_titles: ''
	})

	useEffect(() => {
		if (get_values) {
			get_values({
				...marketingDetailsForm
			})
		}
	}, [marketingDetailsForm])
	return <Flex display={!hidden ? 'none' : 'flex'} flexDirection={'column'}>
		<Field
			mt={5}
			label="What is your most compelling value proposition?"
		>
			<Textarea
				variant="outline"
				p={2}
				value={marketingDetailsForm?.client_value_proposition}
				onChange={e => setMarketingDetailsForm({ ...marketingDetailsForm, client_value_proposition: e.target.value })}
				placeholder='Enter compelling value propositions'
				border="1px solid #c4c4c4"
			></Textarea>
		</Field>

		<Field
			mt={5}
			label="What is the industry that you target? Is it a hard requirement?"
		>
			<Textarea
				variant="outline"
				p={2}
				value={marketingDetailsForm?.client_industry}
				onChange={e => setMarketingDetailsForm({ ...marketingDetailsForm, client_industry: e.target.value })}
				placeholder='Enter target industries'
				border="1px solid #c4c4c4"
			></Textarea>
		</Field>

		<CheckboxList
			mt={5}
			header={"What is your ideal target's company headcount ?"}
			getSelectedChoices={(e) => setMarketingDetailsForm({ ...marketingDetailsForm, client_headcount: e.join(',') })}
			items={
				[
					{ label: "1-10 headcount", value: "1-10 headcount" },
					{ label: "11-20 headcount", value: "11-20 headcount" },
					{ label: "21-50 headcount", value: "21-50 headcount" },
					{ label: "51-100 headcount", value: "51-100 headcount" },
					{ label: "101+ headcount", value: "101+ headcount" }
				]
			}
		/>

		<Field
			mt={5}
			label="What are the job titles that our team should focus on?"
		>
			<Textarea
				variant="outline"
				p={2}
				value={marketingDetailsForm?.client_preferred_job_titles}
				onChange={e => setMarketingDetailsForm({ ...marketingDetailsForm, client_preferred_job_titles: e.target.value })}
				placeholder='CEO, Founder, President, CMO, CTO, Director IT, etc.`'
				border="1px solid #c4c4c4"
			></Textarea>
		</Field>

		<Field label="What is the best Calendly link that we can use for this campaign?" mt={5}>
			<Input
				p={2}
				border="1px solid #c4c4c4"
				type='text'
				value={marketingDetailsForm?.client_calendly}
				onChange={e => setMarketingDetailsForm({ ...marketingDetailsForm, client_calendly: e.target.value })}
				placeholder='A scheduling or Calendly link is required to work with us.' />
		</Field>

		<Field
			mt={5}
			label="Please specify other parameters you would like us to qualify upon prospecting"
		>
			<Textarea
				variant="outline"
				p={2}
				value={marketingDetailsForm?.client_preferences}
				onChange={e => setMarketingDetailsForm({ ...marketingDetailsForm, client_preferences: e.target.value })}
				placeholder='We aim to accommodate your preferences but cannot guarantee adherence to all parameters due to service line specifics and resource constraints.'
				border="1px solid #c4c4c4"
			></Textarea>
		</Field>
	</Flex>
}

function TermsAndPrivacy({ get_values, hidden }) {

	const [termsAndPrivacy, setTermsAndPrivacy] = useState(false)

	useEffect(() => {
		if (get_values) {
			get_values(termsAndPrivacy)
		}
	}, [termsAndPrivacy])

	return <Flex display={!hidden ? 'none' : 'flex'} flexDirection={'column'}>
		<Text>
			Read the <span> Terms of Service </span> & <span> Privacy Policy </span>
		</Text>

		<RadioGroup
			mt={3}
			orientation="horizontal"
			getSelectedChoice={e => setTermsAndPrivacy(e)}
			options={[
				{ label: "I accept", value: true },
				{ label: "I don't accept", value: false }
			]}
		/>
	</Flex>
}

function ExpectationAlignment({ get_values, hidden }) {
	const [exceptionAlignment, setExceptionalAlignment] = useState()

	useEffect(() => {
		if (get_values) {
			get_values(exceptionAlignment)
		}
	}, [exceptionAlignment])

	return <Flex display={!hidden ? 'none' : 'flex'} flexDirection={'column'}>
		<Text textAlign={'justify'}>
			PipeLinear offers incentives like Amazon eGift cards to prospects to have a 30 minute interview about services company goals and purchasing processes.

			This information is maintained in a database until we find a vendor that closely fits what our prospect is looking for, prospects may be incentivized again for a meeting or other action.
		</Text>
		<RadioGroup
			mt={3}
			orientation="horizontal"
			getSelectedChoice={e => setExceptionalAlignment(e)}
			options={[
				{ label: "I accept", value: true },
				{ label: "I don't accept", value: false }
			]}
		/>
	</Flex>
}

export default function VendorSignup() {
	const [companyDetailsForm, setCompanyDetailsForm] = useState()
	const [marketingDetailsForm, setMarketingDetailsForm] = useState()
	const [initialAgreement, setInitialAgreement] = useState()
	const [personalInfoForm, setPersonalInfoForm] = useState()
	const [termsPrivacy, setTermsPrivacy] = useState()
	const [currentStep, setCurrentStep] = useState(1)
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const steps = [
		{
			id: 1,
			label: "Initial Agreement",
			component: <InitialAgreementForm
				key={1}
				hidden={currentStep == 1}
				get_values={e => setInitialAgreement(e)}
			/>
		},
		{
			id: 2,
			label: "Personal Information",
			component: <PersonalInfoForm
				key={2}
				hidden={currentStep == 2}
				get_values={e => setPersonalInfoForm(e)}
			/>
		},
		{
			id: 3,
			label: "Company Profile",
			component: <CompanyDetailsForm
				key={3}
				hidden={currentStep == 3}
				get_values={e => setCompanyDetailsForm(e)}
			/>
		},
		{
			id: 4,
			label: "Market Profile",
			component: <MarketingDetialsForm
				key={4}
				hidden={currentStep == 4}
				get_values={e => setMarketingDetailsForm(e)}
			/>
		},
		{
			id: 5,
			label: "Terms of Service & Privacy Policy",
			component: <TermsAndPrivacy
				key={5}
				hidden={currentStep == 5}
				get_values={e => setTermsPrivacy(e)}
			/>
		},
		{
			id: 6,
			label: "Expectation Alignment",
			component: <ExpectationAlignment
				key={6}
				hidden={currentStep == 6} />
		}

	]

	const submitForm = async () => {
		setLoading(true)

		console.info(companyDetailsForm)
		console.info(marketingDetailsForm)

		const {
			client_personal_email,
			client_password
		} = personalInfoForm

		const hashed_password = await bcrypt.hash( client_password, 10 )

		const record = await add_vendor_action({
			...companyDetailsForm,
			...marketingDetailsForm,
			client_password_hash: hashed_password,
			client_personal_email: client_personal_email
		})
		await login_action( client_personal_email, client_password, 'vendors' )
		router.push('/vendors')
		console.info(' [added success] record is ', record)
	}

	return <Stepper
		steps={steps}
		getCurrentStep={e => setCurrentStep(e)}
		loading={loading}
		loadingText='Saving record...'
		onSubmit={() => submitForm()}
	/>
}