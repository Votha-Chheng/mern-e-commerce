import express from 'express'
const router = express.Router()
import { authUsers, getUserProfile, registerUser, updateUserPassword, updateUserProfile,sendValidationEmail, validateEmail } from '../controllers/userController.js'
import {protect} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.route('/:id').get(protect, getUserProfile)
router.post('/login', authUsers)
router.route('/profile').put(protect, updateUserProfile)
router.route('/password').put(protect, updateUserPassword)
router.route('/confirmation/:userId/:code').get(validateEmail)
router.route('/validation/:token').get(protect, sendValidationEmail)

export default router