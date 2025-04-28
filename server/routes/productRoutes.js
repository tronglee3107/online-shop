import express from 'express'
import { upload } from '../configs/multer.js';
import { addProduct, changeProductStock, getAllProduct, getProductById } from '../controllers/productController.js';
import { authAdmin } from '../middlewares/authAdmin.js';
const productRouter = express.Router();

productRouter.post('/add', upload.array(["images"]), authAdmin, addProduct);
productRouter.get('/list', authAdmin, getAllProduct);
productRouter.get('/id', authAdmin, getProductById);
productRouter.post('/stock', authAdmin, changeProductStock);

export default productRouter;