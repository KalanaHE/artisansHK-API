/*
  Warnings:

  - You are about to drop the column `product` on the `finishedproductscollection` table. All the data in the column will be lost.
  - You are about to alter the column `timestamp` on the `finishedproductscollection` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `timestamp` on the `rmrelease` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `productId` to the `finishedProductsCollection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `finishedproductscollection` DROP FOREIGN KEY `finishedProductsCollection_product_fkey`;

-- AlterTable
ALTER TABLE `finishedproductscollection` DROP COLUMN `product`,
    ADD COLUMN `productId` INTEGER NOT NULL,
    MODIFY `timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `rmrelease` MODIFY `timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `users` MODIFY `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `finishedProductsCollection` ADD CONSTRAINT `finishedProductsCollection_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
