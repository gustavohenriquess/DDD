/*
  Warnings:

  - Added the required column `listId` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" ADD COLUMN     "listId" TEXT NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
