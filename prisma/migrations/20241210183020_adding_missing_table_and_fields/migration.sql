-- CreateTable
CREATE TABLE "Proposal" (
    "proposal_id" TEXT NOT NULL,
    "proposal_client_id" TEXT NOT NULL,
    "proposal_manager_id" TEXT NOT NULL,
    "proposal_client_second_email" TEXT NOT NULL,
    "proposal_prospect_paragraph" TEXT NOT NULL,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("proposal_id")
);

-- CreateTable
CREATE TABLE "SalesPost" (
    "sales_post_id" TEXT NOT NULL,

    CONSTRAINT "SalesPost_pkey" PRIMARY KEY ("sales_post_id")
);

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_proposal_manager_id_fkey" FOREIGN KEY ("proposal_manager_id") REFERENCES "SalesManager"("manager_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_proposal_client_id_fkey" FOREIGN KEY ("proposal_client_id") REFERENCES "Clients"("client_id") ON DELETE RESTRICT ON UPDATE CASCADE;
