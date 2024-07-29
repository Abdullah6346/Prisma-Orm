/*
  Warnings:

  - Added the required column `schooladdress` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `School` ADD COLUMN `schooladdress` VARCHAR(191) NOT NULL;
