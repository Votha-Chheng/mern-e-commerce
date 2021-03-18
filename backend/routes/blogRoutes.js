import express from 'express'
import { createBlogArticle, deleteArticle, getAllBlogArticles, getBlogArticleById, updateArticle } from '../controllers/blogController.js'
const router = express.Router()
import {protect} from '../middleware/authMiddleware.js'

router.route('/').get(getAllBlogArticles).post(protect, createBlogArticle)
router.route('/:idBillet').get(getBlogArticleById).put(protect, updateArticle).delete(protect, deleteArticle)


export default router