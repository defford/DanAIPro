# Affiliate Hub - Next.js Application

A Next.js-based affiliate hub that dynamically generates tracked affiliate links using UTM parameters and integrates with Supabase for product management.

## Features

- Dynamic product review pages with slug-based routing
- Automatic UTM parameter tracking and mapping to ClickBank HopLinks
- Google Analytics 4 integration for CTA click tracking
- Supabase-backed product data management
- TypeScript for type safety
- Tailwind CSS for styling

## Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account and project

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_AFFILIATE_NICKNAME=danaipro
NEXT_PUBLIC_DEFAULT_LANDING_PAGE=Default
NEXT_PUBLIC_GA4_MEASUREMENT_ID=your_ga4_measurement_id
```

3. Set up Supabase database:
   - Run the migration file `supabase/migrations/001_create_products_table.sql` in your Supabase SQL editor to create the products table.
   - Run `supabase/migrations/002_add_admin_policies.sql` to set up admin access policies.

4. Set up Admin Authentication:
   - In your Supabase dashboard, go to Authentication > Users
   - Click "Add User" and create an admin account with email/password
   - This account will be used to access the admin panel at `/admin/login`

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── actions/           # Server actions
│   │   ├── auth.ts       # Authentication actions
│   │   └── products.ts   # Product CRUD actions
│   ├── admin/            # Admin panel routes
│   │   ├── login/        # Admin login page
│   │   └── products/     # Product management
│   ├── layout.tsx        # Root layout with GA4
│   ├── page.tsx          # Homepage
│   ├── review/[slug]/    # Dynamic product review pages
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── admin/            # Admin components
│   │   ├── ProductForm.tsx
│   │   ├── ProductEditForm.tsx
│   │   ├── ProductList.tsx
│   │   └── SignOutButton.tsx
│   ├── CTASection.tsx    # Buy button with tracking
│   ├── GoogleAnalytics.tsx # GA4 script loader
│   └── ProductHero.tsx   # Product hero section
├── lib/
│   ├── auth.ts           # Authentication utilities
│   ├── hooks/
│   │   └── useHopLink.ts  # Hook for UTM → HopLink mapping
│   ├── repositories/
│   │   └── products.ts    # Supabase product queries
│   ├── supabase/
│   │   ├── client.ts      # Client-side Supabase client
│   │   └── server.ts      # Server-side Supabase client
│   └── analytics.ts       # Analytics helper functions
├── config/
│   └── site.ts           # Site configuration
└── supabase/
    └── migrations/        # Database migrations
```

## Usage

### Admin Panel

Access the admin panel at `/admin/login` using the credentials you created in Supabase.

**Admin Features:**
- **Product Management**: Add, edit, and delete products through the web interface
- **Product List**: View all products in a table with quick actions
- **Product Form**: Easy-to-use form for adding/editing products with all required fields

**Admin Routes:**
- `/admin/login` - Admin login page
- `/admin/products` - Product list and management dashboard
- `/admin/products/new` - Add new product form
- `/admin/products/[id]/edit` - Edit existing product

### Adding Products via Admin Panel

1. Log in at `/admin/login`
2. Click "Add Product" on the products page
3. Fill in the form:
   - **Slug**: URL-friendly identifier (e.g., "ai-tool")
   - **Product Name**: Display name
   - **HopLink**: Your ClickBank HopLink URL
   - **Review Title**: Title for the review page
   - **Review Body**: HTML content for the review
   - **Image URL**: Optional product image
   - **Affiliate Nickname**: Your ClickBank affiliate nickname (defaults to "danaipro")
   - **Landing Page**: Landing page type (defaults to "Default")
4. Click "Create Product"

### Adding Products Manually (Alternative)

You can also add products directly to your Supabase `products` table with the following fields:
- `slug` (unique): URL-friendly identifier (e.g., "ai-tool")
- `product_name`: Display name of the product
- `hoplink`: Base ClickBank HopLink URL
- `review_title`: Title for the review page
- `review_body`: HTML content for the review
- `image_url` (optional): Product image URL
- `affiliate_nickname`: Your ClickBank affiliate nickname (default: "danaipro")
- `landing_page`: Landing page type (default: "Default")

### Creating Tracked Links

When linking to your review pages from external sources, use UTM parameters:

```
https://yourdomain.com/review/ai-tool?utm_source=youtube&utm_campaign=ai-review-video
```

The system will automatically:
1. Capture the UTM parameters
2. Map them to ClickBank tracking parameters:
   - `utm_source` → `traffic_source`
   - `utm_campaign` → `campaign`
   - `utm_medium` → `traffic_type`
   - `utm_term` → `ad`
   - `utm_content` → `creative`
3. Append them to the HopLink when users click "Buy Now"

### Analytics

- **Google Analytics 4**: Tracks page views and CTA clicks
- **ClickBank**: Tracks conversions with full attribution via tracking parameters

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Building for Production

```bash
npm run build
npm start
```

## License

ISC

