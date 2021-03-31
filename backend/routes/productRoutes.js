import express from 'express'
const router = express.Router()
import {protect} from '../middleware/authMiddleware.js'
import { createProduct, getProductById, getProducts, updateProductInfo, deleteProduct, updateImagesProductInfo, updateProductStock } from '../controllers/productController.js'

router.route('/').get(getProducts)
router.route('/admin/:productId').put(protect, updateProductInfo).delete(protect, deleteProduct)
router.route('/admin/images/:productId').put(protect, updateImagesProductInfo)
router.route('/admin').post(protect, createProduct)
router.route('/stock').put(updateProductStock)
router.route('/:id').get(getProductById)


export default router