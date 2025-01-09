-- AlterTable
ALTER TABLE "Meetings" ALTER COLUMN "meetings_time" DROP NOT NULL,
ALTER COLUMN "meetings_for" DROP NOT NULL,
ALTER COLUMN "meetings_booked_week" DROP NOT NULL,
ALTER COLUMN "meetings_campaign" DROP NOT NULL,
ALTER COLUMN "meetings_on" DROP NOT NULL,
ALTER COLUMN "meetings_p499_incentive" DROP NOT NULL;
