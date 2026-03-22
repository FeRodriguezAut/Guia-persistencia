import categoriesData from "../data/categories.data.js";

const CategoryModel = {
  findAll: () => [...categoriesData],

  findById: (id) => categoriesData.find((category) => category.id === Number(id)),

  create: ({ name }) => {
    const nextId =
      categoriesData.length === 0
        ? 1
        : Math.max(...categoriesData.map((category) => category.id)) + 1;
    const newCategory = { id: nextId, name };
    categoriesData.push(newCategory);
    return newCategory;
  },

  update: (id, updatedFields) => {
    const index = categoriesData.findIndex((category) => category.id === Number(id));
    if (index === -1) return null;

    categoriesData[index] = { ...categoriesData[index], ...updatedFields };
    return categoriesData[index];
  },

  delete: (id) => {
    const index = categoriesData.findIndex((category) => category.id === Number(id));
    if (index === -1) return false;

    categoriesData.splice(index, 1);
    return true;
  },
};

export default CategoryModel;
