-- Add views column to products table for tracking popularity
ALTER TABLE products ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;

-- Create index on views for faster sorting
CREATE INDEX IF NOT EXISTS idx_products_views ON products(views DESC);

