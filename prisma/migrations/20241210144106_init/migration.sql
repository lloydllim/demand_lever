-- CreateTable
CREATE TABLE "Prospects" (
    "prospect_id" TEXT NOT NULL,
    "prospect_status" TEXT NOT NULL,
    "prospect_last_name" TEXT NOT NULL,
    "prospect_full_name" TEXT NOT NULL,
    "prospect_job_title" TEXT NOT NULL,
    "prospect_industry" TEXT NOT NULL,
    "prospect_headcount" INTEGER NOT NULL,
    "prospect_important_notes" TEXT NOT NULL,
    "prospect_pitched_campaigns" TEXT NOT NULL,
    "prospect_company_name" TEXT NOT NULL,
    "prospect_phone_number" TEXT NOT NULL,
    "prospect_email_address" TEXT NOT NULL,
    "prospect_company_description" TEXT NOT NULL,
    "prospect_website" TEXT NOT NULL,
    "prospect_frequency" TEXT NOT NULL,
    "prospect_other_services" TEXT NOT NULL,
    "prospect_date_sumbitted" TIMESTAMP(3) NOT NULL,
    "prospect_function" TEXT NOT NULL,
    "prospect_timezone" TEXT NOT NULL,
    "prospect_location" TEXT NOT NULL,
    "prospect_linkedin_profile" TEXT NOT NULL,
    "prospect_processed" BOOLEAN NOT NULL,
    "prospect_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prospect_last_updated" TIMESTAMP(3) NOT NULL,
    "prospect_onboarding_week" INTEGER NOT NULL,

    CONSTRAINT "Prospects_pkey" PRIMARY KEY ("prospect_id")
);

-- CreateTable
CREATE TABLE "SalesManager" (
    "manager_id" TEXT NOT NULL,
    "manager_name" TEXT NOT NULL,

    CONSTRAINT "SalesManager_pkey" PRIMARY KEY ("manager_id")
);

-- CreateTable
CREATE TABLE "Clients" (
    "client_id" TEXT NOT NULL,
    "client_name" TEXT NOT NULL,
    "client_email" TEXT NOT NULL,
    "client_phone_number" TEXT NOT NULL,
    "client_website" TEXT NOT NULL,
    "client_calendly" TEXT NOT NULL,
    "client_job_title" TEXT NOT NULL,
    "client_headcount" INTEGER NOT NULL,
    "client_industry" TEXT NOT NULL,
    "client_main_pitch" TEXT NOT NULL,
    "client_onboarding_date" TIMESTAMP(3) NOT NULL,
    "client_cap" INTEGER NOT NULL,
    "client_onboarding" BOOLEAN NOT NULL,
    "client_intro_email" BOOLEAN NOT NULL,
    "client_last_updated" TIMESTAMP(3) NOT NULL,
    "client_week_number" INTEGER NOT NULL,
    "client_assigned_date" TIMESTAMP(3) NOT NULL,
    "client_assigned_week" INTEGER NOT NULL,
    "client_transcript" TEXT NOT NULL,
    "client_linkedin_profile" TEXT NOT NULL,
    "client_value_proposition" TEXT NOT NULL,
    "client_service_offered" TEXT NOT NULL,
    "client_important_notes" TEXT NOT NULL,
    "manager_id" TEXT NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("client_id")
);

-- AddForeignKey
ALTER TABLE "Clients" ADD CONSTRAINT "Clients_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "SalesManager"("manager_id") ON DELETE RESTRICT ON UPDATE CASCADE;
