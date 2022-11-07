/*
  Warnings:

  - You are about to drop the column `collectedAt` on the `finishedproductscollection` table. All the data in the column will be lost.
  - You are about to drop the column `issuedAt` on the `rmrelease` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `finishedproductscollection` DROP COLUMN `collectedAt`;

-- AlterTable
ALTER TABLE `rmrelease` DROP COLUMN `issuedAt`;
