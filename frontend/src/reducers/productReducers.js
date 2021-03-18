import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_IMAGES_DIR, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, PRODUCTS_LIST_FAIL, PRODUCTS_LIST_REQUEST, PRODUCTS_LIST_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, SET_SINGLE_IMAGE_DELETE_TO_FALSE, SET_SUCCESS_CREATE_TO_FALSE, SET_SUCCESS_DELETE_TO_FALSE, SET_SUCCESS_TO_FALSE, SET_SUCCESS_UPDATE_IMAGES_TO_FALSE, SINGLE_IMAGE_DELETE_FAIL, SINGLE_IMAGE_DELETE_REQUEST, SINGLE_IMAGE_DELETE_SUCCESS, UPDATE_IMAGES_PRODUCT_INFO_FAIL, UPDATE_IMAGES_PRODUCT_INFO_REQUEST, UPDATE_IMAGES_PRODUCT_INFO_SUCCESS, UPDATE_PRODUCT_INFO_FAIL, UPDATE_PRODUCT_INFO_REQUEST, UPDATE_PRODUCT_INFO_SUCCESS } from '../constants/productsConstants'


export const productsListReducer = (state = {products: []}, action) =>{
  switch(action.type){
    case PRODUCTS_LIST_REQUEST:
      return {...state, loading:true, products : [] }
    case PRODUCTS_LIST_SUCCESS:
      return {loading:false, products : action.payload}
    case PRODUCTS_LIST_FAIL:
      return {loading:false, error:action.payload}
    default : 
      return state
  }
}

export const productDetailsReducer = (state = {product: {couleurs : [], images : []}}, action) =>{
  switch(action.type){
    case PRODUCT_DETAILS_REQUEST:
      return {loading:true, success : false, ...state}
    case PRODUCT_DETAILS_SUCCESS:
      return {loading:false, success : true, product: action.payload}   
    case PRODUCT_DETAILS_FAIL:
      return {loading:false, success : false, error : action.payload}
    default : 
      return state
  }
}

export const productInfoUpdateReducer = (state = {}, action) =>{
  switch(action.type){
    case UPDATE_PRODUCT_INFO_REQUEST:
      return {loadingUpdateInfoProduct:true, successUpdateInfoProduct : false }
    case UPDATE_PRODUCT_INFO_SUCCESS:
      return {loadingUpdateInfoProduct:false, successUpdateInfoProduct : true, productInfo : action.payload}
    case SET_SUCCESS_TO_FALSE :
      return {...state, successUpdateInfoProduct : false}
    case UPDATE_PRODUCT_INFO_FAIL:
      return {loadingUpdateInfoProduct:false, errorUpdateInfoProduct:action.payload}
    default : 
      return state
  }
}

export const imagesProductUpdateReducer = (state = {}, action) =>{
  switch(action.type){
    case UPDATE_IMAGES_PRODUCT_INFO_REQUEST:
      return {loadingImagesProductUpdate : true, successImagesProductUpdate : false }
    case UPDATE_IMAGES_PRODUCT_INFO_SUCCESS:
      return {loadingImagesProductUpdate : false, successImagesProductUpdate : true, messageImagesProductUpdate : action.payload}
    case SET_SUCCESS_UPDATE_IMAGES_TO_FALSE :
      return {...state, successImagesProductUpdate : false}
    case UPDATE_IMAGES_PRODUCT_INFO_FAIL:
      return {loadingImagesProductUpdate:false, errorImagesProductUpdate:action.payload}
    default : 
      return state
  }
}

export const productCreatedReducer = (state = {}, action) =>{
  switch(action.type){
    case CREATE_PRODUCT_REQUEST:
      return {loadingCreateProduct:true, successCreateProduct : false }
    case CREATE_PRODUCT_SUCCESS:
      return {loadingCreateProduct:false, successCreateProduct : true, productCreated : action.payload}
    case SET_SUCCESS_CREATE_TO_FALSE :
      return {...state, successCreateProduct : false}
    case CREATE_PRODUCT_FAIL:
      return {loadingCreateProduct:false, errorCreateProduct:action.payload}
    default : 
      return state
  }
}

export const productDeletedReducer = (state = {}, action) =>{
  switch(action.type){
    case DELETE_PRODUCT_REQUEST:
      return {loadingDeleteProduct:true, successDeleteProduct : false }
    case DELETE_PRODUCT_IMAGES_DIR :
      return {...state, resultImageDelete : action.payload}
    case DELETE_PRODUCT_SUCCESS:
      return {...state, loadingDeleteProduct:false, successDeleteProduct : true, messageDeleteProduct : action.payload}
    case SET_SUCCESS_DELETE_TO_FALSE :
      return {...state, successDeleteProduct : false}
    case DELETE_PRODUCT_FAIL:
      return {loadingDeleteProduct:false, errorDeleteProduct:action.payload}
    default : 
      return state
  }
}

export const singleImageDeleteReducer = (state = {}, action)=>{
  switch(action.type){
    case SINGLE_IMAGE_DELETE_REQUEST :
      return {loadingSingleImageDelete : true, successSingleImageDelete:false}
    case SINGLE_IMAGE_DELETE_SUCCESS :
      return {loadingSingleImageDelete : false, successSingleImageDelete:true, messageSingleImageDelete:action.payload}
    case SET_SINGLE_IMAGE_DELETE_TO_FALSE :
      return {...state, successSingleImageDelete : false}
    case SINGLE_IMAGE_DELETE_FAIL :
      return {loadingSingleImageDelete : false, successSingleImageDelete:true, errorSingleImageDelete:action.payload}
    default : 
      return state
  }
}

