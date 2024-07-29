/*
  Warnings:

  - You are about to drop the column `BuiltBy_id` on the `House` table. All the data in the column will be lost.
  - Added the required column `builtbyid` to the `House` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `House` DROP FOREIGN KEY `House_BuiltBy_id_fkey`;

-- AlterTable
ALTER TABLE `House` DROP COLUMN `BuiltBy_id`,
    ADD COLUMN `builtbyid` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `House` ADD CONSTRAINT `House_builtbyid_fkey` FOREIGN KEY (`builtbyid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
