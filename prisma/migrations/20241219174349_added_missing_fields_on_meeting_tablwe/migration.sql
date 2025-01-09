/*
  Warnings:

  - You are about to drop the column `meetings_p4499_incentive` on the `Meetings` table. All the data in the column will be lost.
  - Added the required column `meetings_appointment_date` to the `Meetings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meetings_on` to the `Meetings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meetings_p499_incentive` to the `Meetings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meetings_timezone` to the `Meetings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meetings" DROP COLUMN "meetings_p4499_incentive",
ADD COLUMN     "meetings_appointment_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "meetings_created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "meetings_on" TEXT NOT NULL,
ADD COLUMN     "meetings_p499_incentive" TEXT NOT NULL,
ADD COLUMN     "meetings_screenshot" TEXT,
ADD COLUMN     "meetings_timezone" TEXT NOT NULL;
