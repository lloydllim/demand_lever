'use client'
import { Flex, Text, Input } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { FaPlusCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ResizableTable } from "@/components/ui/table"
import { useState, useEffect } from "react"
import { get_all_sales_post } from "@/app/api/sales-post/actions";
import { Modal } from "@/components/ui/modal";
import { delete_sales_post, edit_sales_post } from "@/app/api/sales-post/actions";
import SelectDropdown from '@/components/ui/select-dropdown'
import { get_all_vendor } from "@/app/api/vendors/actions"
import { Field } from "@/components/ui/field"

export default function SalesPostsComponent() {
	const router = useRouter()

	const [posts, setPosts] = useState([])
	const [vendors, setVendors] = useState([])
	const [openDeleteModal, setOpenDeleteModal] = useState(false)
	const [openEditModal, setOpenEditModal] = useState(false)
	const [loading, setLoading] = useState( false )

	const [salesPostId, setSalesPostId] = useState()
	const [salesPostForm, setSalesPostForm] = useState({
		sales_client_id: {
			value: '',
			error: true
		},
		sales_post_id: {
			value: '',
			error: true 
		}
	})
	const [singleVendor, setSingleVendor] = useState({
        client_id: '',
        client_full_name: "",
        client_company_website: "",
        client_comapny_name: "",
        client_main_pitch: ""
    })

	useEffect(() => {
		fetchAllPosts()
		fetchAllVendors()
	}, [])

	const fetchAllVendors = async () => {
		const rec = await get_all_vendor()
		setVendors(rec)
	}

	const fetchAllPosts = async () => {
		const rec = await get_all_sales_post()
		setPosts(rec)

		console.info(rec)
	}

	const updateSalesPostPrompt = (selectedItem) => {
		setSingleVendor( selectedItem.clients )
		setSalesPostForm( prevState => ({
			sales_client_id: {
				...prevState.sales_client_id,
				value: selectedItem.sales_client_id
			},
			sales_post_id: {
				...prevState.sales_post_id,
				value: selectedItem.sales_post_id
			}
		}))

		console.info( selectedItem )
		setOpenEditModal( true )
	}

	const deleteSalesPostPrompt = (selectedItem) => {
		setSalesPostId(selectedItem.sales_post_id)
		setOpenDeleteModal(true)
	}

	const deleteSalesPost = async () => {
		await delete_sales_post({
			sales_post_id: salesPostId
		})
		await fetchAllPosts()
		setOpenDeleteModal(false)
	}

	const saveUpdatedChanges = () => {

	}

	return <Flex w={'100%'} flexDirection={'column'}>

		<Flex
			flexDirection={'row'}
			alignItems={'center'}
			w={'100%'}
			justifyContent={'space-between'}
		>
			<Text fontSize={20}> Sales Posts </Text>
			<Button onClick={() => router.push('/sales/posts/new')}> <FaPlusCircle /> Add </Button>
		</Flex>

		<Flex
			w={'100%'}
			mt={5}
		>
			<ResizableTable
				columns={
					[
						{ label: "Vendor Name", value: "clients.client_full_name" },
						{ label: "Vendor Email", value: "clients.client_email" },
						{ label: "Company Name", value: "clients.client_company_name" },
						{ label: "Company Website", value: "clients.client_company_website" },
						{ label: "Company Main Pitch", value: "clients.client_main_pitch" },
					]
				}
				data={posts}
				editAction={(selectedItem) => updateSalesPostPrompt(selectedItem)}
				deleteAction={(selectedItem) => deleteSalesPostPrompt(selectedItem)}
			/>
		</Flex>

		<Modal
			toggleModal={openEditModal}
			title={`Edit Sales Post`}
			getModalState={e => setOpenEditModal(e)}
			onSubmit={saveUpdatedChanges}
		>
			<Flex gap={3} position={'relative'} flexDirection='column'>

				<SelectDropdown
					collection={vendors}
					labelProp={'client_full_name'}
					valueProp={'client_id'}
					label={'Pick a vendpr'}
					defaultValue={salesPostForm.sales_client_id.value}
					isValid={
						e => setSalesPostForm(prevState =>
						({
							...prevState,
							sales_client_id: {
								...prevState.sales_client_id,
								error: e?.value[0]
							}
						}))
					}
					getSelectedChoice={
						e => setSalesPostForm(prevState =>
						({
							...prevState,
							sales_client_id: {
								...prevState.sales_client_id,
								value: e?.value[0]
							}
						}))
					}
				/>

				<Flex
					mt={5}
					w={'100%'}
					justifyContent={'center'}
					gap={3}
				>
					<Field label="Company Name">
						<Input
							readOnly
							disabled
							value={singleVendor?.client_company_name || ''}
						/>
					</Field>
					<Field label="Company Website">
						<Input
							readOnly
							disabled
							value={singleVendor?.client_company_website || ''}
						/>
					</Field>
				</Flex>

				<Field label="Company Main Pitch" mt={5}>
					<Input
						readOnly
						disabled
						value={singleVendor?.client_main_pitch || 'None'}
					/>
				</Field>
			</Flex>
		</Modal>

		<Modal
			toggleModal={openDeleteModal}
			getModalState={e => setOpenDeleteModal(e)}
			onSubmit={deleteSalesPost}
			submitText="Delete"
			title={`Remove Record`}
		>
			<Text> Are you sure to delete this meeting </Text>
		</Modal>
	</Flex>
}

function SalesPost() {

}