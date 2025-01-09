'use client';

import { Card, Flex, Image, Grid, GridItem, Stack, Text, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';

export default function MainLogin() {
	const router = useRouter()

	const user_types = [
		{
			name: "prospects",
			label: "Prospects",
			link: '/login/prospects'
		},
		{
			name: "vendors",
			label: "Vendors",
			link: '/login/vendors'
		},
	]

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
					</Stack>

					<Flex justifyContent="center">
						<Stack w="full" gap={5}>
							<Flex
								direction={{ base: "column", md: "row" }}
								gap={2}>

								{
									user_types.map(user_type =>
										<Flex flex={1} key={user_type.name}>
											<Card.Root
												m={2}
												variant="elevated"
												cursor="pointer"
												borderRadius="2px"
												size="lg"
												w="250px"
												h={{ base: "150px", md: "250px" }}
												display="flex"
												alignItems="center"
												onClick={() => router.push(user_type.link)}
											>
												<Flex h="100%" alignItems="center">
													<Text textAlign="center" fontWeight="semibold"> {user_type.label} </Text>
												</Flex>
											</Card.Root>
										</Flex>
									)
								}
							</Flex>
						</Stack>
					</Flex>

					<HStack w="100%" textAlign="center" mt={5} justifyContent="center">
						<Text> Do you work for PipeLinear? If so,</Text><Text cursor={'pointer'} color="blue.400" onClick={() => router.push('/login/sales')} textDecoration="underline">sign in here </Text>
					</HStack>
				</Flex>
			</GridItem>
		</Grid>
	)
}