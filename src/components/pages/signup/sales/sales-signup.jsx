'use client'

import { Card, Input, Flex, Image, Grid, GridItem, Stack, Text, Box, Spinner } from '@chakra-ui/react'
import { Field } from "@/components/ui/field"
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { RiUserSharedLine, RiUserAddLine } from 'react-icons/ri'
import bcrypt from 'bcryptjs'
import { create_manager_account } from '@/app/api/sales/actions'
import { loginManager } from '@/app/api/auth/actions'
import { TiWarning } from "react-icons/ti"


export default function SalesSignUpForm() {

	const [ salesForm, setSalesForm ] = useState({
		manager_email: "",
		manager_password: "",
		manager_confirm_password: '',
		manager_name: ''
	})
	const [errorMsg, setErrorMsg] = useState('')
	const [loading, setLoading] = useState(false)

	const gotoLogin = () => {
		window.location.href = "/login/sales"
	}

	const createSalesAccount = async (ev) => {
		ev.preventDefault()
		setLoading( true )

		try {

			const hashed_password = await bcrypt.hash( salesForm.manager_password, 10 )
		
			console.info( 'sales form ? ', salesForm )
			
			await create_manager_account({
				manager_email: salesForm.manager_email,
				manager_password_hash: hashed_password,
				manager_name: salesForm.manager_name
			})
	
			const a = await loginManager( salesForm.manager_email, salesForm.manager_password )
			
			console.info( 'a : ', a )
			setLoading( false )
		} catch ( err ) {
			setErrorMsg( err )
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
						<Text textStyle="3xl" textAlign="center" fontWeight="bold" textTransform="capitalize">Sales Manager Registration</Text>
					</Stack>

					<Card.Root
						variant="elevated"
						borderRadius="2px"
						size="lg"
						w="450px"
						mt={5}
					>
						<form onSubmit={createSalesAccount}>
							<Card.Body gap={3} >
								<Stack w="full" gap={6}>
								<Field label="What's your name ?">
										<Input
											p={2}
											onChange={e => setSalesForm({ ...salesForm, manager_name: e.target.value })}
											value={salesForm?.manager_name}
											border="1px solid #c4c4c4"
											placeholder='Enter your name' />
									</Field>

									<Field label="What's your email ?">
										<Input
											p={2}
											onChange={e => setSalesForm({ ...salesForm, manager_email: e.target.value })}
											value={salesForm?.manager_email}
											border="1px solid #c4c4c4"
											placeholder='Enter your email' />
									</Field>
									<Field label="What's your password?">
										<Input
											p={2}
											type='password'
											onChange={e => setSalesForm({ ...salesForm, manager_password: e.target.value })}
											value={salesForm?.manager_password}
											border="1px solid #c4c4c4"
											placeholder='Enter password' />
									</Field>
									<Field label="Confirm your password?">
										<Input
											p={2}
											type='password'
											onChange={e => setSalesForm({ ...salesForm, manager_confirm_password: e.target.value })}
											value={salesForm?.manager_confirm_password}
											border="1px solid #c4c4c4"
											placeholder='Enter password' />
									</Field>
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
													loading ? <> <Spinner /> Creating Account... </> : <> <RiUserAddLine />Create Account </>
												}

											</Button>
										</Flex>
										<Flex flex={1}>
											<Button onClick={gotoLogin} backgroundColor="black" w="100%" color="white" variant="subtle" fontSize="12px">  <RiUserSharedLine /> Login </Button>
										</Flex>
									</Flex>
								</Stack>
							</Card.Body>
						</form>

					</Card.Root>
				</Flex>
			</GridItem>
		</Grid>
	)
}