/*
  Warnings:

  - A unique constraint covering the columns `[studentId,semester,category,target]` on the table `ProgressMateri` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProgressMateri_studentId_semester_category_target_key" ON "public"."ProgressMateri"("studentId", "semester", "category", "target");
