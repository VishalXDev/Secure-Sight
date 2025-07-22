-- CreateTable
CREATE TABLE "Camera" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cameraId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tsStart" DATETIME NOT NULL,
    "tsEnd" DATETIME NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Incident_cameraId_fkey" FOREIGN KEY ("cameraId") REFERENCES "Camera" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
