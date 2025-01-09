'use client'

import { Card, Box, Text, Flex, Textarea, Spinner } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import { FaRegTimesCircle } from "react-icons/fa";
import { useState, useEffect } from 'react'
import { get_all_sales_post, edit_sales_post } from '@/app/api/sales-post/actions';
import { add_proposal } from '@/app/api/proposals/actions'
import { Field } from "@/components/ui/field"
import { getSessionUser } from '@/app/api/auth/actions';

export default function ProspectsDashboard() {

	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchAllPosts()
	}, [])

	const fetchAllPosts = async () => {
		setLoading(true)
		const rec = await get_all_sales_post()

		setPosts(rec)
		setLoading(false)
		console.info(rec)
	}

	return (
		<Box w='100%'>
			{
				loading ? <Flex justifyContent='center'> <Spinner mr={2} /> Loading </Flex> :
				posts.map(({ clients, sales_post_id, sales_client_id }) =>
					<SinglePost
						key={sales_post_id}
						client_id={sales_client_id}
						sales_post_id={sales_post_id}
						client_company_name={clients.client_company_name}
						client_main_pitch={clients.client_main_pitch}
						client_company_website={clients.client_company_website}
						client_full_name={clients.client_full_name}
						client_important_notes={clients.client_important_notes}
					/>
				)
			}
		</Box>
	)
}

const SinglePost = ({ client_id, client_full_name, sales_post_id, client_company_name, client_company_website, client_important_notes, client_main_pitch }) => {
	const [paragraph, setParagraph] = useState({
		error: true,
		value: ''
	})


	const [ loading, setLoading ] = useState( false )

	const submitInterest = async (ev) => {
		ev.preventDefault()
		const session_data = await getSessionUser()

		await add_proposal({
			proposal_prospect_paragraph: paragraph.value,
			proposal_client_id: client_id,
			proposal_prospect_id: session_data.id
		})

		// await edit_sales_post({ 
		// 	client_id: client_id,
		// 	sales_post_id: sales_post_id,
		// 	sales_post_status: 'for approval'
		// })
	}

	return (
		<Card.Root
			variant="elevated"
			w="100%"
			my={3}
		>
			<Card.Body>
				<Flex justifyContent={'space-between'}>
					<Box>
						<Text
							fontWeight={'bold'}
							fontSize={'lg'}
						> {client_full_name} </Text> </Box>
					<Box>
						<Text
							color={'blue.500'}
							cursor={'pointer'}
							fontSize={'xs'}> {client_company_name} | {client_company_website} </Text>
					</Box>
				</Flex>

				<Box
					mt={5}
					lineClamp={4}
					textAlign={'justify'}
					fontSize={'sm'}
					color={'gray.600'}
				>
					{client_main_pitch}
				</Box>

				<form onSubmit={submitInterest} >
					<Flex mt={4} gap={2}>
						<Field
							mt={5}
							label="Interest Paragraph"
						>
							<Textarea
								variant="outline"
								p={2}
								placeholder='Enter 2 sentences explain why you would like to attend this sales meeting'
								value={paragraph?.value}
								onChange={e => setParagraph({
									...paragraph,
									value: e.target.value
								})}
								border="1px solid #c4c4c4"
							></Textarea>
						</Field>

					</Flex>

				<Flex mt={5} alignItems={'center'}>
					<Box>
						<Button
							variant="subtle"
							backgroundColor="green.600"
							type='submit'
							color="white"
							size="xs"
							w={'120px'}
						> Submit Interest</Button>
					</Box>
					<Box color='red.500' fontSize={'2xl'} ml={1} cursor={'pointer'}>
						<FaRegTimesCircle />
					</Box>
				</Flex>
				</form>

			</Card.Body>
		</Card.Root>
	)
}

const SingleProposal = ({ name, link, description, amount, duration, claim_type, medium }) => {
	return (
		<Card.Root
			variant="elevated"
			w="100%"
			my={3}
		>
			<Card.Body>
				<Flex justifyContent={'space-between'}>
					<Box>
						<Text
							fontWeight={'bold'}
							fontSize={'lg'}
						> {name} </Text> </Box>
					<Box>
						<Text
							color={'blue.500'}
							cursor={'pointer'}
							fontSize={'xs'}> {link} </Text>
					</Box>
				</Flex>

				<Box
					mt={5}
					lineClamp={4}
					textAlign={'justify'}
					fontSize={'sm'}
					color={'gray.600'}
				>
					{description}
				</Box>

				<Flex mt={4}>
					<Box>
						<Text
							fontSize={'xs'}
							fontWeight={'semibold'}
							fontStyle={'italic'}
							color={'gray.500'}
						>
							{amount} {claim_type} | {duration.time} {duration.unit} | via {medium}
						</Text>
					</Box>
				</Flex>

				<Flex mt={5} alignItems={'center'}>
					<Box>
						<Button
							variant="subtle"
							backgroundColor="green.600"
							color="white"
							size="xs"
							w={'120px'}
						> Submit Interest</Button>
					</Box>
					<Box color='red.500' fontSize={'2xl'} ml={1} cursor={'pointer'}>
						<FaRegTimesCircle />
					</Box>
				</Flex>

			</Card.Body>
		</Card.Root>
	)
}