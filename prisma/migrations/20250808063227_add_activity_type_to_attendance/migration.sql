/*
  Warnings:

  - Added the required column `activityType` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Attendance" ADD COLUMN     "activityType" TEXT NOT NULL;
