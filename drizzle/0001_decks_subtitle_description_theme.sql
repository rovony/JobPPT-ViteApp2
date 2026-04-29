-- Optional catalog fields for dossiers (aligns with api/decks POST + PATCH).
ALTER TABLE "decks" ADD COLUMN IF NOT EXISTS "subtitle" varchar(512);
ALTER TABLE "decks" ADD COLUMN IF NOT EXISTS "description" text;
ALTER TABLE "decks" ADD COLUMN IF NOT EXISTS "theme" varchar(64);
