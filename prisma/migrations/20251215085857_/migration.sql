/*
  Warnings:

  - Added the required column `is_plain` to the `reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reports" ADD COLUMN     "is_plain" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "test_steps_plain" (
    "id" SERIAL NOT NULL,
    "report_id" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "step_number" INTEGER NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "test_steps_plain_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "test_steps_plain" ADD CONSTRAINT "test_steps_plain_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_steps_plain" ADD CONSTRAINT "test_steps_plain_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
