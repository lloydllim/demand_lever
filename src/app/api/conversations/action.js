'use server'

import prisma from "../lib/db"


export async function createMessage ({
    message,
    user1,
    user2
}) {

    let conversationId = await getConversationId( user1, user2 );
    if (!conversationId) {
        const conversation = await prisma.conversation.create({
            data: {
                conversation_user_1: user1,
                conversation_user_2: user2,
                conversation_created_at: new Date()
            },
          });

          conversationId = conversation.conversation_id
    }
   
    await prisma.messages.create({
        data: {
            messages_body: message,
            messages_sender_id: user1,
            messages_receiver_id: user2,
            messages_conversation_id: conversationId,
            messages_created_at: new Date()
        },
      });

}

export async function getConversationId(user1, user2) {
    const conversation = await prisma.conversation.findFirst({
      where: {
        OR: [
          { conversation_user_1: user1, conversation_user_2: user2 }, // Check if user1 initiated
          { conversation_user_1: user2, conversation_user_2: user1 }, // Check if user2 initiated
        ],
      },
    });
  
    return conversation ? conversation.conversation_id : null;
  }

  export async function getConversationMessages(user1, user2) {
    const conversationId = getConversationId(user1, user2);

    return await prisma.messages.findMany({
        where: {
            messages_conversation_id: conversationId
        }
    });
  }
  

