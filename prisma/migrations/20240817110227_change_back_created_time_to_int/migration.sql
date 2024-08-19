/*
  Warnings:

  - You are about to alter the column `created_time` on the `file_records` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "file_records" ALTER COLUMN "created_time" SET DATA TYPE INTEGER;
