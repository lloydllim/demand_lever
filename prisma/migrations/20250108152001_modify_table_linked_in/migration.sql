/*
  Warnings:

  - A unique constraint covering the columns `[linkedin_user_id]` on the table `LinkedIn` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LinkedIn_linkedin_user_id_key" ON "LinkedIn"("linkedin_user_id");
