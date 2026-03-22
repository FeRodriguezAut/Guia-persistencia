import productsData from "../data/products.data.js";

const getNextProductId = () => {
  if (productsData.length === 0) return 1;
  return Math.max(...productsData.map((product) => product.id)) + 1;
};

export const ProductModel = {
  findAll: () => [...productsData],

  findById: (id) => {
    return productsData.find((p) => p.id === id);
  },

  findByCategoryId: (categoryId) => {
    return productsData.filter((p) => p.categoryId === categoryId);
  },

  existsByCategoryId: (categoryId) => {
    return productsData.some((p) => p.categoryId === categoryId);
  },

  create: (newProduct) => {
    const id = getNextProductId();
    const productWithId = { id, ...newProduct };
    productsData.push(productWithId);
    return productWithId;
  },

  update: (id, updatedFields) => {
    const index = productsData.findIndex((p) => p.id === id);
    if (index === -1) return null;

    productsData[index] = { ...productsData[index], ...updatedFields };
    return productsData[index];
  },

  delete: (id) => {
    const index = productsData.findIndex((product) => product.id === id);
    if (index === -1) return false;
    productsData.splice(index, 1);
    return true;
  },
};
