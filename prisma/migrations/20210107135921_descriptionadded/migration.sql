/*
  Warnings:

  - You are about to drop the column `description` on the `Card` table. All the data in the column will be lost.
  - Added the required column `audioUrl` to the `CardLocalization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "CardLocalization" ADD COLUMN     "audioUrl" TEXT NOT NULL;
