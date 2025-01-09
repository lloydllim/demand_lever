'use client'

import React from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  IconButton,
  VStack,
  HStack,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaCheckSquare as CheckIcon } from "react-icons/fa";

const ChatUI = () => {
  const bg = "gray.800";
  const textColor = "gray.200";

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      messages_body: "hello",
      messages_is_from: 0
    },
    {
      messages_body: "Hi",
      messages_is_from: 1
    },
    {
      messages_body: "How are you ?",
      messages_is_from: 0
    }
  ])

  const sendMessage = () => {
    setMessages([ ...messages, {
      messages_body: message,
      message_is_from: 1
    }])
    setMessage( '' )
  }

  return (
    <Box h="100vh" w={'100%'} p={4}>
      {/* Header */}

      {/* Chat Area */}
      <VStack
        bg="white"
        borderRadius="lg"
        shadow="md"
        p={4}
        spacing={4}
        align="stretch"
      >
        {/* Visitor Message */}

        {
          messages.map( ( message, index ) => {
            if (message.messages_is_from == 1) {
              return <HStack align="start" spacing={3} key={index}>
                <Box bg={bg} p={3} borderRadius="md" >
                  <Text fontSize="sm" color={textColor}>
                    {message.messages_body}
                  </Text>
                </Box>
              </HStack>
            } else {
              return <HStack alignSelf="end" spacing={3} key={index}>
                <Box bg={bg} p={3} borderRadius="md" >
                  <Text fontSize="sm" fontWeight="bold" color={textColor}>
                    {message.messages_body}
                  </Text>
                </Box>
              </HStack>
            }
          })
        }


        {/* Agent Message */}


        {/* Resolution Notice */}
        {/* <HStack align="center" justify="end" spacing={2}>
          <CheckIcon color="green.500" />
          <Text fontSize="sm" color="green.500">
            Resolved conversation
          </Text>
        </HStack> */}
      </VStack>

      {/* Message Input */}
      <Flex mt={4} alignItems="center">
        <Input
          placeholder="Send your message..."
          variant="outline"
          borderRadius="full"
          bg="white"
          value={message}
          onChange={e => setMessage(e.target.value)}
          mr={2}
        />
        <Button colorScheme="blue" borderRadius="full" onClick={sendMessage}>
          Send
        </Button>
      </Flex>
    </Box>
  );
};

export default ChatUI;
