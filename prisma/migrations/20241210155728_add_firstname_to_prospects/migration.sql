/*
  Warnings:

  - Added the required column `prospect_first_name` to the `Prospects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prospects" ADD COLUMN     "prospect_first_name" TEXT NOT NULL;
