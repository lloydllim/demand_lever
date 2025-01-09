/*
  Warnings:

  - Made the column `proposal_prospect_id` on table `Proposal` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Proposal" DROP CONSTRAINT "Proposal_proposal_prospect_id_fkey";

-- AlterTable
ALTER TABLE "Proposal" ALTER COLUMN "proposal_prospect_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_proposal_prospect_id_fkey" FOREIGN KEY ("proposal_prospect_id") REFERENCES "Prospects"("prospect_id") ON DELETE RESTRICT ON UPDATE CASCADE;
