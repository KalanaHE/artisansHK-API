/*
  Warnings:

  - You are about to alter the column `createdAt` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(6)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(6)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `rmrelease` ADD COLUMN `timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `geoCoordinates` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `finishedProductsCollection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `collectedBy` INTEGER NOT NULL,
    `collectedAt` DATETIME(6) NOT NULL,
    `colorId` INTEGER NOT NULL,
    `quantity` FLOAT NOT NULL,
    `product` INTEGER NOT NULL,
    `collectedFrom` INTEGER NOT NULL,
    `geoCoordinates` VARCHAR(255) NULL,
    `timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `finishedProductsCollection` ADD CONSTRAINT `finishedProductsCollection_collectedBy_fkey` FOREIGN KEY (`collectedBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `finishedProductsCollection` ADD CONSTRAINT `finishedProductsCollection_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `colors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `finishedProductsCollection` ADD CONSTRAINT `finishedProductsCollection_product_fkey` FOREIGN KEY (`product`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `finishedProductsCollection` ADD CONSTRAINT `finishedProductsCollection_collectedFrom_fkey` FOREIGN KEY (`collectedFrom`) REFERENCES `artisans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
