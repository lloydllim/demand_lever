-- CreateTable
CREATE TABLE "LinkedIn" (
    "linkedin_id" TEXT NOT NULL,
    "linkedin_title" TEXT NOT NULL,
    "linkedin_employment_type" TEXT NOT NULL,
    "linkedin_company_name" TEXT NOT NULL,
    "linkedin_location" TEXT NOT NULL,
    "linkedin_start_date" TEXT NOT NULL,
    "linkedin_description" TEXT NOT NULL,
    "linkedin_profile_headline" TEXT NOT NULL,
    "linkedin_skills" TEXT NOT NULL,
    "linkedin_media_link" TEXT NOT NULL,
    "linkedin_media_title" TEXT NOT NULL,
    "linkedin_media_description" TEXT NOT NULL,

    CONSTRAINT "LinkedIn_pkey" PRIMARY KEY ("linkedin_id")
);
