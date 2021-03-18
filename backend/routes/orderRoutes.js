import express from 'express'
const router = express.Router()
import { addOrderItems, deleteOrder, getAllOrders, getMyOrders, getOrderById, getUsersOrder, updateOrderToDelivered, updateOrderToPaid } from '../controllers/orderController.js'
import {protect} from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/admin/orders').get(protect, getAllOrders)
router.route('/admin/:id').get(protect, getUsersOrder)
router.route('/delivered/:id').put(updateOrderToDelivered)
router.route('/:id').get(protect, getOrderById).delete(protect, deleteOrder)
router.route('/:id/pay').put(protect, updateOrderToPaid)


export default router