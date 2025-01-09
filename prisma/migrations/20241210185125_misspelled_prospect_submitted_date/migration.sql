/*
  Warnings:

  - You are about to drop the column `prospect_date_sumbitted` on the `Prospects` table. All the data in the column will be lost.
  - Added the required column `prospect_date_submitted` to the `Prospects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prospects" DROP COLUMN "prospect_date_sumbitted",
ADD COLUMN     "prospect_date_submitted" TIMESTAMP(3) NOT NULL;
