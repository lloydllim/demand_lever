/*
  Warnings:

  - Added the required column `meetings_p4499_incentive` to the `Meetings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sales_client_id` to the `SalesPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meetings" ADD COLUMN     "meetings_p4499_incentive" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SalesPost" ADD COLUMN     "sales_client_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SalesPost" ADD CONSTRAINT "SalesPost_sales_client_id_fkey" FOREIGN KEY ("sales_client_id") REFERENCES "Clients"("client_id") ON DELETE RESTRICT ON UPDATE CASCADE;
