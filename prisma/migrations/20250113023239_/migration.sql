/*
  Warnings:

  - You are about to drop the column `marketingCalendly` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `marktingCompanySize` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "marketingCalendly",
DROP COLUMN "marktingCompanySize",
ADD COLUMN     "marketingCalendlyLink" TEXT,
ADD COLUMN     "marketingCompanySize" TEXT,
ADD COLUMN     "marketingPrefferedJobTitle" TEXT;
