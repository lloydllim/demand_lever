-- AlterTable
ALTER TABLE "Prospects" ALTER COLUMN "prospect_industry" DROP NOT NULL,
ALTER COLUMN "prospect_company_description" DROP NOT NULL,
ALTER COLUMN "prospect_function" DROP NOT NULL,
ALTER COLUMN "prospect_timezone" DROP NOT NULL,
ALTER COLUMN "prospect_location" DROP NOT NULL;
