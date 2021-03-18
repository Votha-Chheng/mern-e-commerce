import { DELETE_ARTICLES_SUCCESS, SET_DELETE_ARTICLE_TO_FALSE } from "../constants/blogConstants"
import { DELETE_IMAGE_DIR_FAIL, DELETE_IMAGE_DIR_REQUEST, GET_IMAGES_NAMES_FAIL, GET_IMAGES_NAMES_REQUEST, GET_IMAGES_NAMES_SUCCESS } from "../constants/imagesNamesConstants"

export const imagesNamesReducer = (state = {}, action) =>{
  switch(action.type){
    case GET_IMAGES_NAMES_REQUEST :
      return {loadingImagesNames:true }
    case GET_IMAGES_NAMES_SUCCESS:
      return {loadingImagesNames:false, imagesNames : action.payload}
    case GET_IMAGES_NAMES_FAIL:
      return {loadingImagesNames:false, errorImagesNames : action.payload}
    default : 
      return state
  }
}

export const singleImageDeleteReducer = (state = {}, action) =>{
  switch (action.type){
    case DELETE_IMAGE_DIR_REQUEST :
      return {loadingSingleImagesDelete : true}
    case DELETE_ARTICLES_SUCCESS :
      return {loadingSingleImageDelete: false, successSingleImageDelete : true, messageSingleImageDelete : action.payload}
    case DELETE_IMAGE_DIR_FAIL :
      return {loadingSingleImageDelete : false, successSingleImageDelete : false, errorSingleImageDelete: action.payload}
    case SET_DELETE_ARTICLE_TO_FALSE :
      return {...state, successSingleImageDelete : false}
    default : 
      return state
  }
}