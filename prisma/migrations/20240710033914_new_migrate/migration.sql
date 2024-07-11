/*
  Warnings:

  - You are about to alter the column `image` on the `report_details` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "report_details" ALTER COLUMN "image" SET DATA TYPE VARCHAR(50);
