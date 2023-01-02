-- AlterTable
ALTER TABLE `inventorytransactions` ADD COLUMN `isRejectedAfterGrnIn` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `rejectedByAfterGrnIn` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `inventoryTransactions` ADD CONSTRAINT `inventoryTransactions_rejectedByAfterGrnIn_fkey` FOREIGN KEY (`rejectedByAfterGrnIn`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
