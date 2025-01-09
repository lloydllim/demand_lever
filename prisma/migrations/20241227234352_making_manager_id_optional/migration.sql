-- DropForeignKey
ALTER TABLE "Proposal" DROP CONSTRAINT "Proposal_proposal_manager_id_fkey";

-- AlterTable
ALTER TABLE "Proposal" ALTER COLUMN "proposal_manager_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_proposal_manager_id_fkey" FOREIGN KEY ("proposal_manager_id") REFERENCES "SalesManager"("manager_id") ON DELETE SET NULL ON UPDATE CASCADE;
