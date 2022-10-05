/*
  Warnings:

  - Added the required column `colorId` to the `grn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `grn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `grn` ADD COLUMN `colorId` INTEGER NOT NULL,
    ADD COLUMN `packageSize` INTEGER NULL,
    ADD COLUMN `productId` INTEGER NULL,
    ADD COLUMN `quantity` FLOAT NOT NULL,
    ADD COLUMN `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `grn` ADD CONSTRAINT `grn_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `colors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grn` ADD CONSTRAINT `grn_packageSize_fkey` FOREIGN KEY (`packageSize`) REFERENCES `rmReleasePackageSizes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grn` ADD CONSTRAINT `grn_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
