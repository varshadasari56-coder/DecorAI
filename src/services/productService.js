import products from "../data/products";

export const getProducts = () => {
  return products;
};

export const getAvailableProducts = () => {
  return products.filter((product) => product.availability);
};

export const getProductById = (id) => {
  return products.find(
    (product) => String(product.id) === String(id)
  );
};

export const searchProducts = (query = "") => {
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm) {
    return getAvailableProducts();
  }

  return getAvailableProducts().filter((product) => {
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