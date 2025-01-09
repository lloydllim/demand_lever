'use client'
import React from "react";
import {
    Box,
    Text,
    VStack,
    HStack,
    Flex,
    Badge,
    Spinner,
} from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { create_user, get_user, get_users } from "@/app/api/users/actions";
import { useEffect, useState } from "react";
import useGetUserList from '@/hooks/useUserList'

// Sample data
const conversations = [
    {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/150?u=1",
        latestMessage: "Hey, how's it going?",
        time: "10:30 AM",
        unreadCount: 2,
    },
    {
        id: 2,
        name: "Jane Smith",
        avatar: "https://i.pravatar.cc/150?u=2",
        latestMessage: "Looking forward to the meeting!",
        time: "Yesterday",
        unreadCount: 0,
    },
    {
        id: 3,
        name: "Sam Wilson",
        avatar: "https://i.pravatar.cc/150?u=3",
        latestMessage: "Let's catch up soon.",
        time: "Monday",
        unreadCount: 1,
    },
];

const ConversationItem = ({ user }) => {

    const sendMessage = ( user_id ) => {
        
    }
    const { user_name, user_id, time, unreadCount } = user;

    return (
        <Box w="100%" py={3}>
            <HStack spacing={4}>
                <FaRegUser size={30} />
                <Box flex="1">
                    <HStack justify="space-between">
                        <Text fontWeight="bold">{user_name}</Text>
                        <Text fontSize="sm" color="gray.500">
                        </Text>
                        <Button variant="subtle" onClick={() => sendMessage( user_id )}> Send Message </Button>
                    </HStack>
                    <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.600" isTruncated maxWidth="75%">

                        </Text>

                    </HStack>
                </Box>
            </HStack>
        </Box>
    );
};

const ProspectsList = () => {
	const { data: users , error, loading } = useGetUserList( { user_type: "prospect"} )

    const addTemporaryProspects = async () => {
        await create_user({
            user_name: "Jhon Prospect",
            user_email: "Jhon@prospect.com",
            user_login_type: "manual",
            user_password: "Sample pass",
            user_type: "prospect"
        })
        await create_user({
            user_name: "Mark Prospect",
            user_email: "Mark@prospect.com",
            user_login_type: "manual",
            user_password: "Sample pass",
            user_type: "prospect"
        })
        await create_user({
            user_name: "Doe Prospect",
            user_email: "Doe@prospect.com",
            user_login_type: "manual",
            user_password: "Sample pass",
            user_type: "prospect"
        })
        alert( "temporary prospect user created")

    }

    const render = () => {
        if ( error ) {
            return <Text> Error: {error} </Text>
        }
        if ( loading ) {
            return  < Flex justifyContent="center"> < Spinner mr={2} /> <Text> Loading... </Text></Flex >
        }
        return users.map((user) => (
            <React.Fragment key={user.user_id}>
                <ConversationItem key={user.user_id} user={user} />
            </React.Fragment>
        ))
    }

    return (
        <VStack w="100%">
            <Text> Prospects List </Text>
            <Button onClick={addTemporaryProspects}> Create Temporary prospects </Button>
            <Box w="100%" p={3} mx="auto" border="1px" borderColor="gray.200" borderRadius="md" boxShadow="sm" overflow="hidden">
                <VStack align="stretch" spacing={0}>
                    {render()}
                </VStack>
            </Box>
        </VStack>
    );
};

export default ProspectsList;
