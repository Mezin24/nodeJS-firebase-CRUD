import express from 'express';

import productController from '../controllers/productController.js';

const router = express.Router();

router.get('/product', productController.getProducts);
router.post('/product', productController.createProduct);
router.get('/product/:id', productController.getProduct);
router.put('/product/:id', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);

export default router;
