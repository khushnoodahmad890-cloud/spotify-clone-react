-- Adds profile page support (avatar + bio) to an existing database.
-- Safe to run multiple times.
--
-- Usage:
--   psql -U <db_user> -d <db_name> -f migrations/001_add_profile_fields.sql

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS avatar TEXT,
  ADD COLUMN IF NOT EXISTS bio VARCHAR(280);
