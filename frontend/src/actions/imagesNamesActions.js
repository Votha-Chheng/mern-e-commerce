import axios from 'axios'
import { DELETE_IMAGE_DIR_FAIL, DELETE_IMAGE_DIR_REQUEST, DELETE_IMAGE_DIR_SUCCESS, GET_IMAGES_NAMES_FAIL, GET_IMAGES_NAMES_REQUEST, GET_IMAGES_NAMES_SUCCESS } from '../constants/imagesNamesConstants'

export const getImagesNames = () => async (dispatch) => {
  try{
    dispatch({ type : GET_IMAGES_NAMES_REQUEST})

    const {data} = await axios.get('/api/uploads/repertoire_images')

    dispatch({ type : GET_IMAGES_NAMES_SUCCESS, payload : data})

  } catch (err) {

    dispatch({ type : GET_IMAGES_NAMES_FAIL, payload : err.response && err.response.data.message ? err.response.data.message : "Répertoire temporairement inaccessible."})

  }
}

export const deleteImage = (billetId, imageName) => async (dispatch) => {
  try {
    dispatch({ type : DELETE_IMAGE_DIR_REQUEST})

    const configHeadersImage = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
    const {data} = await axios.put(`/api/uploads/delete/${billetId}`, imageName, configHeadersImage)

    dispatch({ type : DELETE_IMAGE_DIR_SUCCESS, payload : data})

    
  } catch (err) { 
    dispatch({ type : DELETE_IMAGE_DIR_FAIL, payload : err.response && err.response.data.message ? err.response.data.message : "Répertoire temporairement inaccessible."})
  }
}


      
    
