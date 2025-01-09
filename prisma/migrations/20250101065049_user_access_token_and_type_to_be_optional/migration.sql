-- AlterTable
ALTER TABLE "User" ALTER COLUMN "user_type" DROP NOT NULL,
ALTER COLUMN "user_access_token" DROP NOT NULL;
