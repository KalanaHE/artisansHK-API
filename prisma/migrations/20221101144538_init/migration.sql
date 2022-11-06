-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `userType` ENUM('ADMIN', 'TEAM_LEAD', 'GENERAL_EMPLOYEE', 'QC_USER', 'INVENTORY_RECEPTIONIST') NOT NULL DEFAULT 'GENERAL_EMPLOYEE',
    `teamId` INTEGER NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE',
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teams` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productCode` VARCHAR(255) NOT NULL,
    `productName` VARCHAR(255) NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `subCategoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productCategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productSubCategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subCategoryName` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `colors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `colorName` VARCHAR(255) NOT NULL,
    `colorCategoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `colorCategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `colorCategoryName` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `villages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `villageCode` VARCHAR(255) NOT NULL,
    `villageName` VARCHAR(255) NOT NULL,
    `assignedTeamId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `artisans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `villageId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rmReleasePackageSizes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `packageSizeName` VARCHAR(255) NOT NULL,
    `packageWeight` FLOAT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rmRelease` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `issuedBy` INTEGER NOT NULL,
    `issuedAt` DATETIME(3) NOT NULL,
    `colorId` INTEGER NOT NULL,
    `packageSize` INTEGER NOT NULL,
    `quantity` FLOAT NOT NULL,
    `forProduct` INTEGER NULL,
    `issuedTo` INTEGER NOT NULL,
    `geoCoordinates` VARCHAR(255) NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `finishedProductsCollection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `collectedBy` INTEGER NOT NULL,
    `collectedAt` DATETIME(3) NOT NULL,
    `colorId` INTEGER NOT NULL,
    `quantity` FLOAT NOT NULL,
    `productId` INTEGER NOT NULL,
    `collectedFrom` INTEGER NOT NULL,
    `geoCoordinates` VARCHAR(255) NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventoryTransactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionType` ENUM('IN', 'OUT') NOT NULL,
    `issuer` INTEGER NOT NULL,
    `receiver` INTEGER NOT NULL,
    `colorId` INTEGER NOT NULL,
    `packageSize` INTEGER NULL,
    `productId` INTEGER NULL,
    `quantity` FLOAT NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `teams`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `productCategories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `productSubCategories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `colors` ADD CONSTRAINT `colors_colorCategoryId_fkey` FOREIGN KEY (`colorCategoryId`) REFERENCES `colorCategories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `villages` ADD CONSTRAINT `villages_assignedTeamId_fkey` FOREIGN KEY (`assignedTeamId`) REFERENCES `teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artisans` ADD CONSTRAINT `artisans_villageId_fkey` FOREIGN KEY (`villageId`) REFERENCES `villages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rmRelease` ADD CONSTRAINT `rmRelease_issuedBy_fkey` FOREIGN KEY (`issuedBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rmRelease` ADD CONSTRAINT `rmRelease_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `colors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rmRelease` ADD CONSTRAINT `rmRelease_packageSize_fkey` FOREIGN KEY (`packageSize`) REFERENCES `rmReleasePackageSizes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rmRelease` ADD CONSTRAINT `rmRelease_forProduct_fkey` FOREIGN KEY (`forProduct`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rmRelease` ADD CONSTRAINT `rmRelease_issuedTo_fkey` FOREIGN KEY (`issuedTo`) REFERENCES `artisans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `finishedProductsCollection` ADD CONSTRAINT `finishedProductsCollection_collectedBy_fkey` FOREIGN KEY (`collectedBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `finishedProductsCollection` ADD CONSTRAINT `finishedProductsCollection_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `colors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `finishedProductsCollection` ADD CONSTRAINT `finishedProductsCollection_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `finishedProductsCollection` ADD CONSTRAINT `finishedProductsCollection_collectedFrom_fkey` FOREIGN KEY (`collectedFrom`) REFERENCES `artisans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventoryTransactions` ADD CONSTRAINT `inventoryTransactions_issuer_fkey` FOREIGN KEY (`issuer`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventoryTransactions` ADD CONSTRAINT `inventoryTransactions_receiver_fkey` FOREIGN KEY (`receiver`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventoryTransactions` ADD CONSTRAINT `inventoryTransactions_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `colors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventoryTransactions` ADD CONSTRAINT `inventoryTransactions_packageSize_fkey` FOREIGN KEY (`packageSize`) REFERENCES `rmReleasePackageSizes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventoryTransactions` ADD CONSTRAINT `inventoryTransactions_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
