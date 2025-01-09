-- CreateTable
CREATE TABLE "Scheduler" (
    "scheduler_id" TEXT NOT NULL,
    "scheduler_first_name" TEXT NOT NULL,
    "scheduler_last_name" TEXT NOT NULL,
    "scheduler_job_title" TEXT NOT NULL,
    "scheduler_company" TEXT NOT NULL,
    "scheduler_linkedin_url" TEXT NOT NULL,
    "scheduler_linkedin_keyowrds" TEXT NOT NULL,
    "scheduler_bad_data" TEXT NOT NULL,
    "scheduler_invite" BOOLEAN NOT NULL,
    "scheduler_accepted" BOOLEAN NOT NULL,
    "scheduler_message_1" BOOLEAN NOT NULL,
    "scheduler_message_2" BOOLEAN NOT NULL,
    "scheduler_message_3" BOOLEAN NOT NULL,
    "scheduler_reply" BOOLEAN NOT NULL,
    "scheduler_track" BOOLEAN NOT NULL,
    "scheduler_review_posted" BOOLEAN NOT NULL,
    "scheduler_invite_date" TIMESTAMP(3) NOT NULL,
    "scheduler_accepted_date" TIMESTAMP(3) NOT NULL,
    "scheduker_m1_date" TIMESTAMP(3) NOT NULL,
    "scheduler_m2_date" TIMESTAMP(3) NOT NULL,
    "scheduler_m3_date" TIMESTAMP(3) NOT NULL,
    "scheduler_reply_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scheduler_pkey" PRIMARY KEY ("scheduler_id")
);
