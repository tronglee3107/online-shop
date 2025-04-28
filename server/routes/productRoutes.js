import express from 'express'
import { upload } from '../configs/multer.js';
import { addProduct, changeProductStock, getAllProduct, getProductById } from '../controllers/productController.js';
import { authAdmin } from '../middlewares/authAdmin.js';
const productRouter = express.Router();

productRouter.post('/add', upload.array(["images"]), addProduct);
productRouter.get('/list', getAllProduct);
productRouter.get('/id', getProductById);
productRouter.post('/stock', changeProductStock);

export default productRouter;