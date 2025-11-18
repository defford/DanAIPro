-- Add tags column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Create index on tags for faster filtering
CREATE INDEX IF NOT EXISTS idx_products_tags ON products USING GIN (tags);

