/*
  Warnings:

  - You are about to drop the column `sales_company_main_pitch` on the `SalesPost` table. All the data in the column will be lost.
  - You are about to drop the column `sales_post_comapny_name` on the `SalesPost` table. All the data in the column will be lost.
  - You are about to drop the column `sales_post_company_url` on the `SalesPost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SalesPost" DROP COLUMN "sales_company_main_pitch",
DROP COLUMN "sales_post_comapny_name",
DROP COLUMN "sales_post_company_url";
