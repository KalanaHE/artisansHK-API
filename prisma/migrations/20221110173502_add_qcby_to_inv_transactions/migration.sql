-- AlterTable
ALTER TABLE `inventorytransactions` ADD COLUMN `qcBy` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `inventoryTransactions` ADD CONSTRAINT `inventoryTransactions_qcBy_fkey` FOREIGN KEY (`qcBy`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
