import { AdminAuthGuard } from "@/components/admin/AdminAuthGuard";
import { ProductEditLoader } from "@/components/admin/ProductEditLoader";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  return (
    <AdminAuthGuard>
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
          <ProductEditLoader productId={id} />
        </div>
      </main>
    </AdminAuthGuard>
  );
}

