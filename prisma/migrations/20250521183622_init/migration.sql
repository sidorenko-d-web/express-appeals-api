-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appeal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "theme" TEXT NOT NULL DEFAULT 'NEW',
    "appeal_text" TEXT NOT NULL,
    "processed_text" TEXT,
    "status" TEXT NOT NULL
);
INSERT INTO "new_Appeal" ("appeal_text", "id", "processed_text", "status", "theme") SELECT "appeal_text", "id", "processed_text", "status", "theme" FROM "Appeal";
DROP TABLE "Appeal";
ALTER TABLE "new_Appeal" RENAME TO "Appeal";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
