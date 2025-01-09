'use client'

import { Input, Flex, Button } from '@chakra-ui/react'
import { useState } from 'react'

export default function HeaderBar({ header_items }) {
	const [activeTab, setActiveTab] = useState()

	return <>
		<Flex
			gap={3}
			w={'100%'}>
			{
				header_items.map(({ label, value }) =>
					<Button
						key={value}
						backgroundColor={ activeTab == value ? 'black' : 'white' }
						borderColor={'black'}
						borderWidth={'1px'}
						px={10}
						color={ activeTab == value ? 'white' : "black" }
						variant={ activeTab == value ? 'subtle' : 'outline'}
						onClick={() => setActiveTab( value )}
						fontSize="12px">
						{label}
					</Button>
				)
			}
		</Flex>
	</>
}