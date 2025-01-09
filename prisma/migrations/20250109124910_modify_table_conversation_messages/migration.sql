-- CreateTable
CREATE TABLE "Conversation" (
    "conversation_id" TEXT NOT NULL,
    "conversation_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "conversation_user_1" TEXT NOT NULL,
    "conversationuser_user_2" TEXT NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("conversation_id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "messages_id" TEXT NOT NULL,
    "messages_body" TEXT NOT NULL,
    "messages_conversation_id" TEXT NOT NULL,
    "messages_sender_id" TEXT NOT NULL,
    "messages_receiver_id" TEXT NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("messages_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_conversation_user_1_conversationuser_user_2_key" ON "Conversation"("conversation_user_1", "conversationuser_user_2");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_messages_conversation_id_fkey" FOREIGN KEY ("messages_conversation_id") REFERENCES "Conversation"("conversation_id") ON DELETE RESTRICT ON UPDATE CASCADE;
