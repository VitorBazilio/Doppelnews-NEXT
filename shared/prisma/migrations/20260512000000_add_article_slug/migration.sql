ALTER TABLE "Article" ADD COLUMN "slug" VARCHAR(180);

UPDATE "Article"
SET "slug" = 'noticia-' || "id"
WHERE "slug" IS NULL;

ALTER TABLE "Article" ALTER COLUMN "slug" SET NOT NULL;

CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");
