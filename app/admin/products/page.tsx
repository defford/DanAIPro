import { ProductList } from "@/components/admin/ProductList";
import Link from "next/link";
import { SignOutButton } from "@/components/admin/SignOutButton";
import { AdminAuthGuard } from "@/components/admin/AdminAuthGuard";
import { ProductsLoader } from "@/components/admin/ProductsLoader";

export default function AdminProductsPage() {
  // Auth check and product loading happen client-side to avoid server-side cookie issues
  return (
    <AdminAuthGuard>
      <main className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Admin - Products</h1>
            <div className="flex gap-4">
              <Link
                href="/admin/products/new"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Product
              </Link>
              <SignOutButton />
            </div>
          </div>
          <ProductsLoader />
        </div>
      </main>
    </AdminAuthGuard>
  );
}

