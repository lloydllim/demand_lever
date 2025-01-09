/*
  Warnings:

  - You are about to drop the column `conversationuser_user_2` on the `Conversation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[conversation_user_1,conversation_user_2]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `conversation_user_2` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Conversation_conversation_user_1_conversationuser_user_2_key";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "conversationuser_user_2",
ADD COLUMN     "conversation_user_2" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_conversation_user_1_conversation_user_2_key" ON "Conversation"("conversation_user_1", "conversation_user_2");
