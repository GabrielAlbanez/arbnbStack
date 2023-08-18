/*
  Warnings:

  - Added the required column `Local` to the `Casas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avaiation` to the `Casas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pais` to the `Casas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Casas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Casas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT,
    "name" TEXT NOT NULL,
    "imagens" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "avaiation" REAL NOT NULL,
    "pais" TEXT NOT NULL,
    "Local" TEXT NOT NULL,
    CONSTRAINT "Casas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Casas" ("id", "imagens", "name", "usuarioId") SELECT "id", "imagens", "name", "usuarioId" FROM "Casas";
DROP TABLE "Casas";
ALTER TABLE "new_Casas" RENAME TO "Casas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
