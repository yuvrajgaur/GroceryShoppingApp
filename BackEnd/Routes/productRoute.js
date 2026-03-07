import express from 'express';
import {upload} from '../configs/multer.js';
import authSeller from '../Middlewares/authSeller.js';
import { addProduct, changeStock, deleteProduct, productById, productList, updateProduct } from '../Controllers/productController.js';

const productRouter=express.Router();

productRouter.post('/add', upload.array(["images"]), authSeller, addProduct);
productRouter.get('/list', productList);
productRouter.get('/id', productById);
productRouter.post('/stock', authSeller, changeStock);
productRouter.put('/update/:id', upload.array(["images"]), authSeller, updateProduct)
productRouter.delete("/delete/:id", deleteProduct);

export default productRouter;