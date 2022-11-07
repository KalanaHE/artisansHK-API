-- AlterTable
ALTER TABLE `inventorytransactions` ADD COLUMN `isRejected` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `isTrainee` BOOLEAN NULL DEFAULT false;
