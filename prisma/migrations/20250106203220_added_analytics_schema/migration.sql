-- CreateTable
CREATE TABLE "Analytics" (
    "analytics_id" TEXT NOT NULL,
    "analytics_user" TEXT NOT NULL,
    "analytics_date" TIMESTAMP(3) NOT NULL,
    "analytics_present" BOOLEAN NOT NULL DEFAULT true,
    "analytics_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("analytics_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Analytics_analytics_date_key" ON "Analytics"("analytics_date");

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_analytics_user_fkey" FOREIGN KEY ("analytics_user") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
