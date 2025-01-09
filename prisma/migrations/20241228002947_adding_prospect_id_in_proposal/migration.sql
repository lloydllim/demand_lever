-- AlterTable
ALTER TABLE "Proposal" ADD COLUMN     "proposal_prospect_id" TEXT;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_proposal_prospect_id_fkey" FOREIGN KEY ("proposal_prospect_id") REFERENCES "Prospects"("prospect_id") ON DELETE SET NULL ON UPDATE CASCADE;
