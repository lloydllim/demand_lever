/*
  Warnings:

  - Added the required column `sales_company_main_pitch` to the `SalesPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sales_post_comapny_name` to the `SalesPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sales_post_company_url` to the `SalesPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SalesPost" ADD COLUMN     "sales_company_main_pitch" TEXT NOT NULL,
ADD COLUMN     "sales_post_comapny_name" TEXT NOT NULL,
ADD COLUMN     "sales_post_company_url" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Meetings" (
    "meetings_id" TEXT NOT NULL,
    "meetings_feedback" TEXT,
    "meetings_egc" TEXT,
    "meetings_billed" TEXT,
    "meetings_value" INTEGER NOT NULL,
    "meetings_time" TIMESTAMP(3) NOT NULL,
    "meetings_for" TEXT NOT NULL,
    "meetings_client_id" TEXT NOT NULL,
    "meetings_prospect_id" TEXT NOT NULL,
    "meetings_notes" TEXT NOT NULL,
    "meetings_booked_week" INTEGER NOT NULL,
    "meetings_billed_date" TIMESTAMP(3),
    "meetings_billed_week" INTEGER,
    "meetings_p4499_incentive" TEXT NOT NULL,
    "meetings_campaign" INTEGER NOT NULL,
    "meetings_team" TEXT NOT NULL,
    "meetings_modified_date" TIMESTAMP(3),

    CONSTRAINT "Meetings_pkey" PRIMARY KEY ("meetings_id")
);

-- AddForeignKey
ALTER TABLE "Meetings" ADD CONSTRAINT "Meetings_meetings_prospect_id_fkey" FOREIGN KEY ("meetings_prospect_id") REFERENCES "Prospects"("prospect_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meetings" ADD CONSTRAINT "Meetings_meetings_client_id_fkey" FOREIGN KEY ("meetings_client_id") REFERENCES "Clients"("client_id") ON DELETE RESTRICT ON UPDATE CASCADE;
