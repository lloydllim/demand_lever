/*
  Warnings:

  - Added the required column `linkedin_user_id` to the `LinkedIn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LinkedIn" ADD COLUMN     "linkedin_user_id" TEXT NOT NULL;
