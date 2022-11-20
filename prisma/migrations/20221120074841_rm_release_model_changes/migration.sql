-- AlterTable
ALTER TABLE `finishedproductscollection` ADD COLUMN `isRejected` BOOLEAN NULL,
    ADD COLUMN `isTrainee` BOOLEAN NULL,
    ADD COLUMN `qcBy` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `finishedProductsCollection` ADD CONSTRAINT `finishedProductsCollection_qcBy_fkey` FOREIGN KEY (`qcBy`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
