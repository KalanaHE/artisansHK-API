/*
  Warnings:

  - Added the required column `isReturningRm` to the `inventoryTransactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inventorytransactions` ADD COLUMN `isReturningRm` BOOLEAN NOT NULL,
    ALTER COLUMN `isRejected` DROP DEFAULT,
    ALTER COLUMN `isTrainee` DROP DEFAULT;
