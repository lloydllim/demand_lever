'use client'
import { Flex, Text } from '@chakra-ui/react'
import { TiWarning } from "react-icons/ti"

export const ErrorMessage = ({ message }) => {

	return message ?
		<Flex
			textAlign={'center'}
			bgColor={'red.500'}
			justifyContent={'center'}
			w={'500px'}
			alignItems={'center'}
			borderRadius={3}
			py={2}
			color={'white'}
		>
			<TiWarning /> <Text ml={2}> {message} </Text>
		</Flex> : null
}