/*
  Warnings:

  - A unique constraint covering the columns `[analytics_user,analytics_created_at]` on the table `Analytics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Analytics_analytics_user_analytics_created_at_key" ON "Analytics"("analytics_user", "analytics_created_at");
