/*
  Warnings:

  - Added the required column `user_login_type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "user_login_type" TEXT NOT NULL,
ADD COLUMN     "user_refresh_token" TEXT,
ADD COLUMN     "user_token_expired_at" TEXT,
ALTER COLUMN "user_picture" DROP NOT NULL;
