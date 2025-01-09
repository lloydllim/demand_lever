/*
  Warnings:

  - Added the required column `scheduler_user_id` to the `Scheduler` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scheduler" ADD COLUMN     "scheduler_user_id" TEXT NOT NULL,
ALTER COLUMN "scheduler_accepted_date" DROP NOT NULL,
ALTER COLUMN "scheduker_m1_date" DROP NOT NULL,
ALTER COLUMN "scheduler_m2_date" DROP NOT NULL,
ALTER COLUMN "scheduler_m3_date" DROP NOT NULL,
ALTER COLUMN "scheduler_reply_date" DROP NOT NULL;
