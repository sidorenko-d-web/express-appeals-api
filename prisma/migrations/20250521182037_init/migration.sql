-- CreateTable
CREATE TABLE "Appeal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "theme" TEXT NOT NULL,
    "appeal_text" TEXT NOT NULL,
    "processed_text" TEXT,
    "status" TEXT NOT NULL
);
