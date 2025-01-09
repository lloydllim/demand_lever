'use client'
import { Button } from "@/components/ui/button"
import { Flex, Text } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { deleteAuthCookies } from '@/app/api/auth/actions'

export default function LoginExpired() {

	useEffect(() => {
		deleteAuthCookies().then( () => {
			console.log( "Cookies deleted...")
		})
	}, [])
	
	return <Flex
		w={'100%'}
		p={3}
		flexDirection={'column'}
		alignItems={'center'}
		justifyContent={'center'}>
		<Text textAlign={'center'}> Login session expired </Text>
		<Button
			w={'50%'}
			onClick={() => window.location.href = "/login" }
		> Go to Login Page </Button>
	</Flex>
}