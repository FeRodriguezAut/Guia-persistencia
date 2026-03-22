import CategoryModel from "../models/category.model.js";
import { ProductModel } from "../models/product.model.js";

const respond = (res, status, payload) => {
  const { success, message, data = [], errors = [] } = payload;
  return res.status(status).json({ success, message, data, errors });
};

const getAllCategories = (req, res) => {
  const categories = CategoryModel.findAll();
  return respond(res, 200, {
    success: true,
    message: "Categorías obtenidas exitosamente",
    data: categories,
  });
};

const getCategoryById = (req, res) => {
  const { id } = req.params;
  const category = CategoryModel.findById(id);

  if (!category) {
    return respond(res, 404, {
      success: false,
      message: "Categoría no encontrada",
      errors: [{ msg: `No se encontró categoría con el id ${id}` }],
    });
  }

  return respond(res, 200, {
    success: true,
    message: "Categoría encontrada",
    data: category,
  });
};

const createCategory = (req, res) => {
  const { name } = req.body;

  if (!name || name.trim().length === 0) {
    return respond(res, 400, {
      success: false,
      message: "El campo 'name' es obligatorio",
      errors: [{ msg: "Proporciona un nombre para la categoría" }],
    });
  }

  const newCategory = CategoryModel.create({ name: name.trim() });

  return respond(res, 201, {
    success: true,
    message: "Categoría creada exitosamente",
    data: newCategory,
  });
};

const updateCategory = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || name.trim().length === 0) {
    return respond(res, 400, {
      success: false,
      message: "El campo 'name' es obligatorio para la actualización",
      errors: [{ msg: "Proporciona un nombre válido" }],
    });
  }

  const updatedCategory = CategoryModel.update(id, { name: name.trim() });

  if (!updatedCategory) {
    return respond(res, 404, {
      success: false,
      message: "Categoría no encontrada para actualizar",
      errors: [{ msg: `No se encontró categoría con el id ${id}` }],
    });
  }

  return respond(res, 200, {
    success: true,
    message: "Categoría actualizada exitosamente",
    data: updatedCategory,
  });
};

const deleteCategory = (req, res) => {
  const { id } = req.params;
  const categoryId = Number(id);
  const category = CategoryModel.findById(categoryId);

  if (!category) {
    return respond(res, 404, {
      success: false,
      message: "Categoría no encontrada para eliminar",
      errors: [{ msg: `No se encontró categoría con el id ${id}` }],
    });
  }

  if (ProductModel.existsByCategoryId(categoryId)) {
    return respond(res, 409, {
      success: false,
      message: "No se puede eliminar la categoría porque tiene recursos vinculados",
      errors: [{ msg: "Hay productos que siguen usando esta categoría" }],
    });
  }

  CategoryModel.delete(categoryId);

  return respond(res, 200, {
    success: true,
    message: "Categoría eliminada exitosamente",
    data: [],
  });
};

const getProductsByCategory = (req, res) => {
  const { id } = req.params;
  const categoryId = Number(id);
  const category = CategoryModel.findById(categoryId);

  if (!category) {
    return respond(res, 404, {
      success: false,
      message: "Categoría no encontrada",
      errors: [{ msg: `No se encontró categoría con el id ${id}` }],
    });
  }

  const products = ProductModel.findByCategoryId(categoryId);

  return respond(res, 200, {
    success: true,
    message: "Productos obtenidos para la categoría",
    data: { category, products },
  });
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory,
};
