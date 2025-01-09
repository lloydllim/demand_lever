/*
  Warnings:

  - Added the required column `client_password` to the `Clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_personal_email` to the `Clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clients" ADD COLUMN     "client_password" TEXT NOT NULL,
ADD COLUMN     "client_personal_email" TEXT NOT NULL;
