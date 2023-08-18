/*
  Warnings:

  - You are about to drop the `imgsCasa` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imagens` to the `Casas` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "imgsCasa";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Casas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imagens" TEXT NOT NULL,
    CONSTRAINT "Casas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Casas" ("id", "name", "usuarioId") SELECT "id", "name", "usuarioId" FROM "Casas";
DROP TABLE "Casas";
ALTER TABLE "new_Casas" RENAME TO "Casas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
