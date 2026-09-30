import API_BASE_URL from "./api";

const PRODUCT_API_URL = `${API_BASE_URL}/api/products`;

// Get all products from DecorAI Product API
export const getProducts = async () => {
  try {
    const response = await fetch(PRODUCT_API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch products.");
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch products.");
    }

    return data.products;
  } catch (error) {
    console.error("Product API error:", error);
    throw error;
  }
};

// Get only available products
export const getAvailableProducts = async () => {
  const products = await getProducts();

  return products.filter((product) => product.availability);
};

// Get one product by ID
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${PRODUCT_API_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Product not found.");
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Product not found.");
    }

    return data.product;
  } catch (error) {
    console.error("Product API error:", error);
    throw error;
  }
};

// Search products
export const searchProducts = async (query = "") => {
  const products = await getAvailableProducts();
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm) {
    return products;
  }

  return products.filter((product) => {
    const searchableText = [
      product.name,
      product.category,
      product.style,
      ...(product.colors || []),
      product.description,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(searchTerm);
  });
};