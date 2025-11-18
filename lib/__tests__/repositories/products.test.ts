import { getProductBySlug, listProducts } from "@/lib/repositories/products";
import { createServerClient } from "@/lib/supabase/server";

// Mock Supabase client
jest.mock("@/lib/supabase/server", () => ({
  createServerClient: jest.fn(),
}));

describe("Product Repository", () => {
  const mockSupabase = {
    from: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (createServerClient as jest.Mock).mockReturnValue(mockSupabase);
  });

  describe("getProductBySlug", () => {
    it("should return a product when found", async () => {
      const mockProduct = {
        id: "1",
        slug: "test-product",
        product_name: "Test Product",
        hoplink: "https://test.hop.clickbank.net",
        review_title: "Test Review",
        review_body: "Test body",
        image_url: null,
        affiliate_nickname: "danaipro",
        landing_page: "Default",
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
      };

      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockProduct, error: null }),
      };

      mockSupabase.from.mockReturnValue(mockQuery);

      const result = await getProductBySlug("test-product");

      expect(result).toEqual(mockProduct);
      expect(mockSupabase.from).toHaveBeenCalledWith("products");
      expect(mockQuery.eq).toHaveBeenCalledWith("slug", "test-product");
    });

    it("should return null when product not found", async () => {
      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: null,
          error: { code: "PGRST116" },
        }),
      };

      mockSupabase.from.mockReturnValue(mockQuery);

      const result = await getProductBySlug("non-existent");

      expect(result).toBeNull();
    });

    it("should throw error on other database errors", async () => {
      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: null,
          error: { code: "OTHER_ERROR", message: "Database error" },
        }),
      };

      mockSupabase.from.mockReturnValue(mockQuery);

      await expect(getProductBySlug("test")).rejects.toThrow(
        "Failed to fetch product: Database error"
      );
    });
  });

  describe("listProducts", () => {
    it("should return list of products", async () => {
      const mockProducts = [
        {
          id: "1",
          slug: "product-1",
          product_name: "Product 1",
          hoplink: "https://test.hop.clickbank.net",
          review_title: "Review 1",
          review_body: "Body 1",
          image_url: null,
          affiliate_nickname: "danaipro",
          landing_page: "Default",
          created_at: "2024-01-01",
          updated_at: "2024-01-01",
        },
      ];

      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: mockProducts, error: null }),
      };

      mockSupabase.from.mockReturnValue(mockQuery);

      const result = await listProducts();

      expect(result).toEqual(mockProducts);
      expect(mockSupabase.from).toHaveBeenCalledWith("products");
    });

    it("should throw error on database error", async () => {
      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({
          data: null,
          error: { message: "Database error" },
        }),
      };

      mockSupabase.from.mockReturnValue(mockQuery);

      await expect(listProducts()).rejects.toThrow(
        "Failed to fetch products: Database error"
      );
    });
  });
});

