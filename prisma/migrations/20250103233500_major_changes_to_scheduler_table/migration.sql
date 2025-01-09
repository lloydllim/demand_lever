/*
  Warnings:

  - You are about to drop the column `sheculder_location` on the `Scheduler` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Scheduler" DROP COLUMN "sheculder_location",
ADD COLUMN     "scheduler_location" TEXT;
