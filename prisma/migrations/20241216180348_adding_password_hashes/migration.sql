/*
  Warnings:

  - You are about to drop the column `client_name` on the `Clients` table. All the data in the column will be lost.
  - You are about to drop the column `client_website` on the `Clients` table. All the data in the column will be lost.
  - Added the required column `client_company_name` to the `Clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_company_website` to the `Clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_full_name` to the `Clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_password_hash` to the `Clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prospect_password_hash` to the `Prospects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manager_password_hash` to the `SalesManager` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Clients" DROP CONSTRAINT "Clients_manager_id_fkey";

-- AlterTable
ALTER TABLE "Clients" DROP COLUMN "client_name",
DROP COLUMN "client_website",
ADD COLUMN     "client_company_name" TEXT NOT NULL,
ADD COLUMN     "client_company_website" TEXT NOT NULL,
ADD COLUMN     "client_full_name" TEXT NOT NULL,
ADD COLUMN     "client_password_hash" TEXT NOT NULL,
ADD COLUMN     "client_preferences" TEXT,
ADD COLUMN     "client_preferred_job_titles" TEXT,
ALTER COLUMN "client_job_title" DROP NOT NULL,
ALTER COLUMN "client_headcount" DROP NOT NULL,
ALTER COLUMN "client_headcount" SET DATA TYPE TEXT,
ALTER COLUMN "client_main_pitch" DROP NOT NULL,
ALTER COLUMN "client_onboarding_date" DROP NOT NULL,
ALTER COLUMN "client_cap" DROP NOT NULL,
ALTER COLUMN "client_onboarding" DROP NOT NULL,
ALTER COLUMN "client_intro_email" DROP NOT NULL,
ALTER COLUMN "client_last_updated" DROP NOT NULL,
ALTER COLUMN "client_week_number" DROP NOT NULL,
ALTER COLUMN "client_assigned_date" DROP NOT NULL,
ALTER COLUMN "client_assigned_week" DROP NOT NULL,
ALTER COLUMN "client_transcript" DROP NOT NULL,
ALTER COLUMN "client_service_offered" DROP NOT NULL,
ALTER COLUMN "client_important_notes" DROP NOT NULL,
ALTER COLUMN "manager_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Prospects" ADD COLUMN     "prospect_password_hash" TEXT NOT NULL,
ALTER COLUMN "prospect_important_notes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SalesManager" ADD COLUMN     "manager_password_hash" TEXT NOT NULL;
