import express from 'express'
import { createSecretCodeRegister } from '../controllers/secretCodeController.js'
const router = express.Router()
//import {protect} from '../middleware/authMiddleware.js'

router.route('/').post(createSecretCodeRegister)

export default router