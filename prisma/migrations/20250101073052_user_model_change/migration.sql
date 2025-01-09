/*
  Warnings:

  - The `user_token_expired_at` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_token_expired_at",
ADD COLUMN     "user_token_expired_at" INTEGER;
