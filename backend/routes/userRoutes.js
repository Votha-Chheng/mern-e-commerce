import express from 'express'
import { getMyOrders } from '../controllers/orderController.js'
const router = express.Router()
import { authUsers, getUserProfile, registerUser, updateUserPassword, updateUserProfile,sendValidationEmail, validateEmail, updateUserAddress, updateUserOrders, getUsersList, sendEmailContact } from '../controllers/userController.js'
import {protect} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.route('/myorders').get(protect, getMyOrders)
router.post('/login', authUsers)
router.route('/profile').put(protect, updateUserProfile)
router.route('/password').put(protect, updateUserPassword)
router.route('/confirmation?').get(validateEmail)
router.route('/validation').get(protect, sendValidationEmail)
router.route('/address').put(protect, updateUserAddress)
router.route('/orders').put(protect, updateUserOrders)
router.route('/admin').get(protect, getUsersList)
router.route('/:id').get(protect, getUserProfile)
router.route('/contact').post(sendEmailContact)

export default router