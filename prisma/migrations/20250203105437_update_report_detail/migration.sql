-- DropForeignKey
ALTER TABLE "report_details" DROP CONSTRAINT "report_details_status_id_fkey";

-- AlterTable
ALTER TABLE "report_details" ALTER COLUMN "status_id" DROP NOT NULL,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "report_details" ADD CONSTRAINT "report_details_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
