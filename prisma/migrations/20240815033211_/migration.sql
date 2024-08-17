/*
  Warnings:

  - You are about to alter the column `title` on the `report_details` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(100)`.
  - Added the required column `activity` to the `reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "report_details" ALTER COLUMN "title" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "reports" ADD COLUMN     "activity" VARCHAR(50) NOT NULL;
