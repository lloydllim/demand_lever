'use client';

import { Card, Flex, Grid, GridItem, Stack, Text, Image } from '@chakra-ui/react'
import { Field } from "@/components/ui/field"
import { Button } from '@/components/ui/button'
import { RiUserSharedLine, RiUserAddLine } from 'react-icons/ri'
import { useState, useEffect } from 'react'

import { EmailField } from '@/components/ui/forms/email-field';
import { PasswordField } from '@/components/ui/forms/password-field';
import { TextField } from '@/components/ui/forms/text-field';
import { create_user } from '@/app/api/users/actions';
import { login as login_action } from '@/app/api/auth/actions'

import ProspectSignup from '@/components/pages/signup/prospects/prospect-signup';
import VendorSignUp from '@/components/pages/signup/vendors/vendor-signup';
import bcrypt from 'bcryptjs'

export default function SignupForm({ user_type }) {
	const [signupForm, setSignupForm] = useState({
		user_email: { value: '', error: true },
		user_name: { value: '', error: true },
		user_password: { value: '', error: true },
		confirm_password: { value: '', error: true }
	})

	const [ submitted, setSubmitted ] = useState( false )
	const [ loading, setLoading ] = useState( false )

	const fieldsHasError = () => {
		return Object.values(signupForm).some(item => item.error === true)
	}

	const submitForm = async ( ev ) => {
		ev.preventDefault()
		setSubmitted( true )
		
		if ( ! fieldsHasError() ) {
			setLoading( true )
			try {
				const hash_pass = await bcrypt.hash( signupForm.user_password.value, 10 )

				const userRecord = await create_user({
					user_email: signupForm.user_email.value,
					user_name: signupForm.user_name.value,
					user_password: hash_pass,
					user_type: user_type,
					user_login_type: "manual"
				})

				await login_action( userRecord.user_email , signupForm.user_password.value )
				window.location.href = `/${user_type}`
				setLoading( false )
			} catch ( err ) {
				console.error( 'error in creating account ' , err )
			}
		}
		
	
	}
	return (
		<Grid height="100vh">
			<GridItem>
				<Flex
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					height="100%">

					<Stack my={6}>
						<Image src="/images/pipelineaer_logo.png"
							alt="Example image"
							fit="contain"
							width={300}
						/>

						<Text textStyle="3xl" textAlign="center" fontWeight="bold" textTransform="capitalize"> Sign Up</Text>
					</Stack>
					<Card.Root
						variant="elevated"
						borderRadius="2px"
						size="lg"
						w={{ base: "97%", md: "800px" }}
						mt={5}
					>
						<form w={'100%'} onSubmit={submitForm}>
							<Card.Body>
								<Flex
									flexDirection={{ base: "column", md: "row" }}
									gap={2}
								>
									<EmailField
										label={"What's your email address"}
										name={'email'}
										placeholder='Enter your email'
										fieldName={'Email Address'}
										submitted={submitted}
										required
										isValid={e => setSignupForm(prevState => ({
											...prevState,
											user_email: {
												...prevState.user_email,
												error: e
											}
										}))}
										getEmailValue={e => setSignupForm(prevState => ({
											...prevState,
											user_email: {
												...prevState.user_email,
												value: e
											}
										}))}
									/>
									<TextField
										label={"What's your name"}
										name={'name'}
										placeholder='Enter your name'
										fieldName={'User Name'}
										required
										submitted={submitted}
										isValid={e => setSignupForm(prevState => ({
											...prevState,
											user_name: {
												...prevState.user_name,
												error: e
											}
										}))}
										getTextValue={e => setSignupForm(prevState => ({
											...prevState,
											user_name: {
												...prevState.user_name,
												value: e
											}
										}))}
									/>
								</Flex>

								<Flex
									flexDirection={{ base: "column", md: "row" }}
									gap={2}
									mt={5}
								>
									<PasswordField
										label={"What's your password"}
										name={'password'}
										placeholder='Type your password'
										submitted={submitted}
										required
										fieldName={'Password'}
										isValid={e => setSignupForm(prevState => ({
											...prevState,
											user_password: {
												...prevState.user_password,
												error: e
											}
										}))}
										getPasswordValue={e => setSignupForm(prevState => ({
											...prevState,
											user_password: {
												...prevState.user_password,
												value: e
											}
										}))}
									/>
									<PasswordField
										label={"Confirm your password"}
										name={'confirm_password'}
										submitted={submitted}
										placeholder='Retype your password'
										fieldName={'Confirm password'}
										required
										isValid={e => setSignupForm(prevState => ({
											...prevState,
											confirm_password: {
												...prevState.confirm_password,
												error: e
											}
										}))}
										getPasswordValue={e => setSignupForm(prevState => ({
											...prevState,
											confirm_password: {
												...prevState.confirm_password,
												value: e
											}
										}))}
									/>
								</Flex>

								<Button
									variant="subtle"
									mt={5}
									type="submit"
									disabled={loading}
								>
								{
									loading ? "Creating Account..." : 'Create Account'
								}
								</Button>
								<Text textAlign="center" py={2}> Or </Text>

								<Button
									variant="outline"
									color='black'
									type="button"
									onClick={() => window.location.href = "/login"}
								> Login to existing account </Button>
							</Card.Body>

						</form>
					</Card.Root>
				</Flex>
			</GridItem>
		</Grid>

	)
}