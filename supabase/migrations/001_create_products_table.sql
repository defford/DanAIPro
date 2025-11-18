-- Create products table for affiliate hub
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  product_name TEXT NOT NULL,
  hoplink TEXT NOT NULL,
  review_title TEXT NOT NULL,
  review_body TEXT NOT NULL,
  image_url TEXT,
  affiliate_nickname TEXT DEFAULT 'danaipro',
  landing_page TEXT DEFAULT 'Default',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON products
  FOR SELECT
  USING (true);

