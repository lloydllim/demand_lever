/*
  Warnings:

  - Added the required column `manager_email` to the `SalesManager` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SalesManager" ADD COLUMN     "manager_email" TEXT NOT NULL;
