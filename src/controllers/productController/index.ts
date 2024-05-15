import { getAll, getById, getByName } from './get.js';
import add from './add.js';
import edit from './edit.js';
import deleteElement from './delete.js';
import search from './search.js';

const productController = {
  getAllProducts: getAll,
  addProduct: add,
  getProductById: getById,
  getProductByName: getByName,
  editPrice: edit,
  deleteProduct: deleteElement,
  searchProduct: search,
};

export default productController;