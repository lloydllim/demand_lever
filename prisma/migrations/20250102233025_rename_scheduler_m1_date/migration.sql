/*
  Warnings:

  - You are about to drop the column `scheduker_m1_date` on the `Scheduler` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Scheduler" DROP COLUMN "scheduker_m1_date",
ADD COLUMN     "scheduler_m1_date" TEXT;
