/*
  Warnings:

  - You are about to drop the `Analytics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Analytics" DROP CONSTRAINT "Analytics_analytics_user_fkey";

-- DropTable
DROP TABLE "Analytics";

-- CreateTable
CREATE TABLE "analytics" (
    "analytics_id" TEXT NOT NULL,
    "analytics_user" TEXT NOT NULL,
    "analytics_date" TIMESTAMP(3) NOT NULL,
    "analytics_present" BOOLEAN NOT NULL DEFAULT true,
    "analytics_count" INTEGER NOT NULL DEFAULT 0,
    "analytics_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_pkey" PRIMARY KEY ("analytics_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "analytics_analytics_date_key" ON "analytics"("analytics_date");

-- AddForeignKey
ALTER TABLE "analytics" ADD CONSTRAINT "analytics_analytics_user_fkey" FOREIGN KEY ("analytics_user") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
