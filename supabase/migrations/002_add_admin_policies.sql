-- Add RLS policies for authenticated admin users
-- Note: You'll need to create an admin user in Supabase Auth first

-- Policy to allow authenticated users to insert products
CREATE POLICY "Allow authenticated users to insert products" ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy to allow authenticated users to update products
CREATE POLICY "Allow authenticated users to update products" ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy to allow authenticated users to delete products
CREATE POLICY "Allow authenticated users to delete products" ON products
  FOR DELETE
  TO authenticated
  USING (true);

