'use client'
import React from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import NewConversationModal from "./NewConversations";

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

const ConversationItem = ({ conversation }) => {
  const { name, latestMessage, time, unreadCount } = conversation;

  return (
    <Box w="100%" py={3}>
      <HStack spacing={4}>
        <FaRegUser size={30} />
        <Box flex="1">
          <HStack justify="space-between">
            <Text fontWeight="bold">{name}</Text>
            <Text fontSize="sm" color="gray.500">
              {time}
            </Text>
          </HStack>
          <HStack justify="space-between">
            <Text fontSize="sm" color="gray.600" isTruncated maxWidth="75%">
              {latestMessage}
            </Text>
            {unreadCount > 0 && (
              <Badge colorScheme="red" borderRadius="full" px={2}>
                {unreadCount}
              </Badge>
            )}
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
};

const ConversationsList = () => {
  return (
    <VStack w="100%">
      <Box w="100%" p={3} mx="auto" border="1px" borderColor="gray.200" borderRadius="md" boxShadow="sm" overflow="hidden">
        <VStack align="stretch" spacing={0}>
          {conversations.map((conversation) => (
            <React.Fragment key={conversation.id}>
              <ConversationItem conversation={conversation} />
            </React.Fragment>
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};

export default ConversationsList;
