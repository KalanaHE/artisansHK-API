-- AlterTable
ALTER TABLE `inventorytransactions` ADD COLUMN `artisanId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `inventoryTransactions` ADD CONSTRAINT `inventoryTransactions_artisanId_fkey` FOREIGN KEY (`artisanId`) REFERENCES `artisans`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
