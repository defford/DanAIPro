-- Add link_hub_text column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS link_hub_text TEXT;


