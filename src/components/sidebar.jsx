'use client'

import React, { ReactNode, useState } from 'react'
import {
	IconButton,
	Box,
	Image,
	Flex,
	Icon,
	Text,
	Drawer,
	useDisclosure,
} from '@chakra-ui/react'

import {
	FaHome,
	FaServer,
	FaUser,
	FaHandshake,
	FaChartBar,
	FaListUl,
	FaStore,
	FaCog,
	FaUsers,
	FaRegNewspaper,
	FaLinkedin,
	FaRocketchat,
	FaAngleDown,
	FaAngleUp
} from 'react-icons/fa'
import { GrResources } from "react-icons/gr";
import { Modal } from "@/components/ui/modal"

import {
	MdOutlineNewspaper,
	MdOutlineAccessTime
} from "react-icons/md";

import { GrLogout } from "react-icons/gr"
import { signout as signout_action } from '@/app/api/auth/actions'
import { useRouter, usePathname } from 'next/navigation';

const LinkItems =
{
	'sdr': [
		{ name: 'Home', icon: FaHome, url: '/sdr' },
		{
			name: 'Scheduler', icon: FaServer, url: '/sdr/scheduler',
			children: [
				{ name: 'Request New Data', icon: FaServer, url: '/sdr/scheduler/new' }]
		},
		{ name: 'Profile', icon: FaUser, url: '/sdr/profile' },
		{ name: 'Analytics', icon: FaChartBar, url: '/sdr/analytics' },
		{ name: 'Resources', icon: GrResources, url: '/sdr/resources' },
		{
			name: 'Convesations', icon: FaRocketchat, url: '/sdr/conversations',
			children: [
				{ name: 'All', icon: FaServer, url: '/sdr/conversations/all' },
				{ name: 'Prospects', icon: FaServer, url: '/sdr/conversations/prospects' }
			]
		},
		{ name: 'LinkedIn Profile', icon: FaLinkedin, url: '/sdr/linkedin' },
		{
			name: 'Settings', icon: FaCog, url: '/sdr/settings',
			children: [{ name: 'Campaign Updates', icon: FaServer, url: '/sdr/settings/campaign-updates' }]
		},
	],
	'prospects': [
		{ name: 'Home', icon: FaHome, url: '/prospects' },
		{ name: 'Vendors', icon: FaStore, url: '/prospects/vendors' },
		{ name: 'Proposals', icon: FaRegNewspaper, url: '/prospects/proposals' },
		{ name: 'Profile', icon: FaUser, url: '/prospects/profile' },
		{ name: 'Referrals', icon: FaHandshake, url: "/prospects/referrals" },
	],
	'sales_manager': [
		{ name: 'Proposal Manager', icon: FaHome, url: '/sales' },
		{ name: 'Vendors', icon: FaStore, url: '/sales/vendors' },
		{ name: 'Prospects', icon: FaRegNewspaper, url: '/sales/prospects' },
		{ name: 'Meetings', icon: MdOutlineAccessTime, url: '/sales/meetings' },
		{ name: 'Onboarding', icon: FaHome, url: '/sales/onboarding' },
		{ name: 'Posts', icon: MdOutlineNewspaper, url: '/sales/posts' },
	]
}

export default function SimpleSidebar({ children, username, user_type }) {
	const { isOpen, onOpen, onClose } = useDisclosure()

	console.info(LinkItems)
	return (
		<Box minH="100vh" bg="gray.100">
			<SidebarContent
				user_type={user_type}
				onClose={() => onClose} display={{ base: 'none', md: 'block' }}
			/>

			<Drawer.Root
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full">
				<Drawer.Content>
					<SidebarContent user_type={user_type} onClose={onClose} />
				</Drawer.Content>
			</Drawer.Root>
			<MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p={4} >
				<Header username={username} />
				<Flex p={3} mx={4}>
					{children}
				</Flex>
			</Box>
		</Box>
	)
}


const Header = ({ username }) => {
	const [openLogoutModal, setOpenLogoutModal] = useState()
	const router = useRouter()

	const logout = async () => {
		await signout_action()
		router.push('/login')
	}

	return (
		<Flex
			w="100%"
			p={4}
			alignItems="center"
			justifyContent="space-between">
			<Box m={3}>
				<Image
					src="/images/pipelineaer_logo.png"
					alt="Example image"
					fit="contain"
					width={150}
				/>
			</Box>
			<Flex fontSize={20} cursor={'pointer'} alignItems={'center'} onClick={() => setOpenLogoutModal(true)}>
				<Text mr={2}> {username || "User"}</Text>
				<GrLogout size={'25'} ml={2} />
			</Flex>

			<Modal
				toggleModal={openLogoutModal}
				getModalState={e => setOpenLogoutModal(e)}
				onSubmit={logout}
				submitText="Logout"
				title={`Logging out`}
			>
				<Text> Are you sure to sign off ?</Text>
			</Modal>

		</Flex>
	)
}

const SidebarContent = ({ onClose, user_type, ...rest }) => {
	return (
		<Box
			bg={'white'}
			borderRight="1px"
			borderRightColor={'gray.700'}
			w={{ base: 'full', md: 60 }}
			pos="fixed"
			h="full"
			{...rest}>
			{LinkItems[user_type].map((item) => (
				<NavItem key={item.name} item={item}>
					{item.children?.map((child) => (
						<NavItem key={child.name} item={child}> </NavItem>  // Replace with child navigation component
					))}
				</NavItem>
			))}
		</Box>
	)
}

const NavItem = ({ item, children }) => {
	const [openCollapsible, setOpenCollapsible] = useState()

	const router = useRouter()
	const pathname = usePathname()

	const gotoLink = (e, link) => {
		e.stopPropagation()
		console.info( 'link url ?? ', link )
		router.push(link)
	}
	const toggleCollapsible = () => {
		setOpenCollapsible((prev) => !prev);
	}

	const displayContent = (children) => {
		let item_url = null

		if ( children && children.length != 0 ) {
			item_url = children[0]?.props?.item.url
		}

		console.info( 'display content >>> ', children, item_url, pathname )
		return openCollapsible || item_url == pathname ? children : null
	}

	return (
		<Box
			onClick={(e) => gotoLink(e, item.url)}
			style={{ textDecoration: 'none' }}
			_focus={{ boxShadow: 'none' }}>
			<Flex
				align="center"
				p="3"
				mx="4"
				mt={3}
				borderRadius="lg"
				borderColor={"gray.200"}
				bgColor={pathname == item.url ? 'black' : 'white'}
				color={pathname == item.url ? 'white' : 'black'}
				borderWidth={2}
				role="group"
				cursor="pointer"
				_hover={{
					bg: pathname == item.url ? 'gray.800' : 'gray.200',
				}}
			>
				<Box mr={4}> {item.icon()} </Box>
				<Text> {item.name} </Text>
				{item.children?.length > 0 ? <Box flex={1} textAlign={'-webkit-right'}>
					{openCollapsible ?
						<FaAngleUp size={'18'} onClick={() => toggleCollapsible()} />
						:
						<FaAngleDown size={'18'} onClick={() => toggleCollapsible()} />
					}
				</Box> : null}
			</Flex>
			{
				item.children?.length > 0 ? <Box ml={4} > {displayContent(children)} </Box> : displayContent(children)
			}



		</Box>
	)
}


const MobileNav = ({ onOpen, ...rest }) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 24 }}
			height="20"
			alignItems="center"
			bg={('white', 'gray.900')}
			borderBottomWidth="1px"
			borderBottomColor={'gray.200'}
			justifyContent="flex-start"
			{...rest}>
			<IconButton
				variant="outline"
				onClick={onOpen}
				aria-label="open menu"
				icon={<FaListUl />}
			/>

			<Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
				Logo
			</Text>
		</Flex>
	)
}