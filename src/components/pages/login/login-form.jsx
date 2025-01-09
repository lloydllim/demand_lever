'use client';

import { Card, Input, Flex, Image, Grid, GridItem, Stack, Text, Box, Spinner } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import { RiUserSharedLine, RiUserAddLine } from 'react-icons/ri'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { login as login_action } from '@/app/api/auth/actions'
import { TiWarning } from "react-icons/ti"
import { signIn } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc"

import { EmailField } from '@/components/ui/forms/email-field'
import { PasswordField } from '@/components/ui/forms/password-field'

export default function LoginForm({ user_type }) {
	const router = useRouter()
	const [submitted, setSubmitted] = useState(false)
	const [loginForm, setLoginForm] = useState({
		email: { value: '', error: true },
		password: { value: '', error: true }
	})
	const [loading, setLoading] = useState(false)
	const [errorMsg, setErrorMsg] = useState('')

	const gotoCreateAccount = () => {
		window.location.href = `/signup/${user_type}`
	}

	const fieldsHasError = () => {
		return Object.values(loginForm).some(item => item.error === true)
	}

	const loginAction = async (ev) => {
		ev.preventDefault()
		setSubmitted(true)

		console.info('login info >>> ', loginForm)
		if (!fieldsHasError()) {
			if (!loading) {
				setLoading(true)
				setErrorMsg("")
				try {
					const { email, password } = loginForm


					const { success, message } = await login_action(
						email.value,
						password.value,
					)

					if (success) {
						window.location.href = `/${user_type}`
					} else {
						console.info('error msg ? ', message)
						setLoading(false)
						setErrorMsg(message)
					}
				} catch (err) {
					console.info('error occured ', err)
				}
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
						{/* <Image src="/images/pipelineaer_logo.png"
							alt="Example image"
							fit="contain"
							width={300}
						/> */}
						<Text textStyle="3xl" textAlign="center" fontWeight="bold" textTransform="capitalize"> {user_type} Login</Text>
					</Stack>

					<Card.Root
						variant="elevated"
						borderRadius="2px"
						size="lg"
						w="450px"
						mt={5}
					>
						<form onSubmit={loginAction}>
							<Card.Body gap={3} >
								<Stack w="full" gap={6}>
									<EmailField
										label={"What's your email ?"}
										name={'email'}
										placeholder='Enter your email'
										fieldName="Email address"
										required
										submitted={submitted}
										isValid={e => setLoginForm(prevState => ({
											...prevState,
											email: {
												...prevState.email,
												error: e
											}
										}))
										}
										getEmailValue={e => setLoginForm(prevState => ({
											...prevState,
											email: {
												...prevState.email,
												value: e
											}
										}))
										}
									/>
									<PasswordField
										label={"What's your password"}
										name={'password'}
										fieldName={'Password'}
										placeholder='Enter your password'
										required
										submitted={submitted}
										isValid={e => setLoginForm(prevState => ({
											...prevState,
											password: {
												...prevState.password,
												error: e
											}
										}))}
										getPasswordValue={e => setLoginForm(prevState => ({
											...prevState,
											password: {
												...prevState.password,
												value: e
											}
										}))}
									/>
									{
										errorMsg ?
											<Flex
												textAlign={'center'}
												bgColor={'red.500'}
												justifyContent={'center'}
												alignItems={'center'}
												borderRadius={3}
												py={2}
												color={'white'}
											>
												<TiWarning /> <Text ml={2}> {errorMsg} </Text>
											</Flex> : null
									}
									<Flex direction="row" gap={2}>
										<Flex flex={1}>
											<Button
												backgroundColor="black"
												w="100%"
												bgColor={loading ? 'gray.600' : 'black'}
												color="white"
												py={5}
												type="submit"
												variant="subtle"
												fontSize="12px"
											>
												{
													loading ? <> <Spinner /> Logging in... </> : <> <RiUserSharedLine /> Login </>
												}

											</Button>
										</Flex>

										<Flex flex={1}>
											<Button onClick={gotoCreateAccount} backgroundColor="black" w="100%" color="white" variant="subtle" fontSize="12px"> <RiUserAddLine /> Sign Up </Button>
										</Flex>
									</Flex>

									{
										user_type == 'admin' ? <>
											<Flex justifyContent="center">
												<Text> Or </Text>
											</Flex>
											<Flex w={'100%'}>
												<Button
													variant="outline"
													w={'100%'}
													color="black"
													onClick={() => signIn('google')}
												> <FcGoogle /> Login with Google </Button>
											</Flex>
										</> : null
									}

								</Stack>
							</Card.Body>
						</form>
					</Card.Root>
				</Flex>
			</GridItem>
		</Grid>
	)
}