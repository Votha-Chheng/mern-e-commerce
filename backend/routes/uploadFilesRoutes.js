import express from 'express'
const router = express.Router()
import {deleteAllImagesByBilletId, deleteAllImagesByproductId, deleteSingleImageBillet, deleteSingleImageProduct, getImagesName, uploadFiles, uploadFilesUpdate} from '../controllers/uploadFilesController.js'

router.route('/').post(uploadFiles).put(uploadFilesUpdate)
router.route('/billet/:idBillet').delete(deleteAllImagesByBilletId)
router.route('/product/:productId').delete(deleteAllImagesByproductId)
router.route('/delete/:productId').put(deleteSingleImageProduct)
router.route('/repertoire_images').get(getImagesName)
router.route('/billet/delete/:billetId').put(deleteSingleImageBillet)

export default router