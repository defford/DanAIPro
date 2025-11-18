import { ProductForm } from "@/components/admin/ProductForm";
import { AdminAuthGuard } from "@/components/admin/AdminAuthGuard";

export default function NewProductPage() {
  return (
    <AdminAuthGuard>
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
          <ProductForm />
        </div>
      </main>
    </AdminAuthGuard>
  );
}

