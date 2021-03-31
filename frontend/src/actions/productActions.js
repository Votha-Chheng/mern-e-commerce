import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_IMAGES_DIR, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, SET_SINGLE_IMAGE_DELETE_TO_FALSE, SET_SUCCESS_CREATE_TO_FALSE, SET_SUCCESS_DELETE_TO_FALSE, SET_SUCCESS_TO_FALSE, SET_SUCCESS_UPDATE_IMAGES_TO_FALSE, SINGLE_IMAGE_DELETE_FAIL, SINGLE_IMAGE_DELETE_REQUEST, SINGLE_IMAGE_DELETE_SUCCESS, UPDATE_IMAGES_PRODUCT_INFO_FAIL, UPDATE_IMAGES_PRODUCT_INFO_REQUEST, UPDATE_IMAGES_PRODUCT_INFO_SUCCESS, UPDATE_PRODUCT_INFO_FAIL, UPDATE_PRODUCT_INFO_REQUEST, UPDATE_PRODUCT_INFO_SUCCESS, UPDATE_PRODUCT_STOCK_FAIL, UPDATE_PRODUCT_STOCK_REQUEST, UPDATE_PRODUCT_STOCK_SUCCESS } from '../constants/productsConstants'
import axios from 'axios'

export const listProductDetails = (id)=> async(dispatch)=> {

  try {
    dispatch({type : PRODUCT_DETAILS_REQUEST})
    const {data} = await axios.get(`/api/products/${id}`)
    const product = data

    dispatch({type : PRODUCT_DETAILS_SUCCESS, payload : product})

  } catch (error){
    dispatch({type : PRODUCT_DETAILS_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : "Une erreur du serveur s'est produite."})
  }

}

export const updateProductInfo = (product)=> async(dispatch, getState)=> {

  try {
    dispatch({type : UPDATE_PRODUCT_INFO_REQUEST})

    const {userLogin : {userInfo}} = getState()

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.put(`/api/products/admin/${product._id}`, product, configHeaders)
    

    dispatch({type : UPDATE_PRODUCT_INFO_SUCCESS, payload : data})

    setTimeout(()=>{
      dispatch({type : SET_SUCCESS_TO_FALSE})
    }, 5000)


  } catch (error){
    dispatch({type : UPDATE_PRODUCT_INFO_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : "Une erreur du serveur s'est produite."})
  }
}

export const updateProductStock = (order)=> async(dispatch)=> {

  try {
    dispatch({type : UPDATE_PRODUCT_STOCK_REQUEST})


    const {data} = await axios.put(`/api/products/stock`, order)
    
    dispatch({type : UPDATE_PRODUCT_STOCK_SUCCESS, payload : data})

  } catch (error){
    dispatch({type : UPDATE_PRODUCT_STOCK_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : "Une erreur du serveur s'est produite."})
  }
}

export const updateProductImages = (product)=> async(dispatch, getState)=> {

  try {
    dispatch({type : UPDATE_IMAGES_PRODUCT_INFO_REQUEST})

    const {userLogin : {userInfo}} = getState()

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.put(`/api/products/admin/images/${product._id}`, product, configHeaders)
    

    dispatch({type : UPDATE_IMAGES_PRODUCT_INFO_SUCCESS, payload : data})

    setTimeout(()=>{
      dispatch({type : SET_SUCCESS_UPDATE_IMAGES_TO_FALSE})
    }, 5000)


  } catch (error){
    dispatch(
      {
        type : UPDATE_IMAGES_PRODUCT_INFO_FAIL, 
        payload : error.response && error.response.data.message ? error.response.data.message : "Une erreur du serveur s'est produite."
      }
    )
  }
}


export const createProduct = (product)=> async(dispatch, getState)=> {

  try {
    dispatch({type : CREATE_PRODUCT_REQUEST})

    const {userLogin : {userInfo}} = getState()

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.post(`/api/products/admin`, product, configHeaders)
    

    dispatch({type : CREATE_PRODUCT_SUCCESS, payload : data})

  } catch (error){
    dispatch({type : CREATE_PRODUCT_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : "Une erreur du serveur s'est produite."})
  }

}

export const setSuccessCreateProductToFalse = ()=> (dispatch) =>{

  dispatch({type : SET_SUCCESS_CREATE_TO_FALSE})

}



export const deleteProduct = (productId)=> async(dispatch, getState)=> {
  try {
    dispatch({type : DELETE_PRODUCT_REQUEST})

    const {userLogin : {userInfo}} = getState()

    const configHeadersImage = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
    }

    const result = await axios.delete(`/api/uploads/product/${productId}`, configHeadersImage)
    dispatch({type : DELETE_PRODUCT_IMAGES_DIR, payload : result.data})

    const {data} = await axios.delete(`/api/products/admin/${productId}`, configHeaders)
    

    dispatch({type : DELETE_PRODUCT_SUCCESS, payload : data})

    setTimeout(()=>{
      dispatch({type : SET_SUCCESS_DELETE_TO_FALSE})
    }, 5000)


  } catch (error){
    dispatch({type : DELETE_PRODUCT_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : "Une erreur du serveur s'est produite."})
  }

}


export const deleteSingleImage = (imageName, productId)=> async(dispatch)=> { 
  try {

    dispatch({type : SINGLE_IMAGE_DELETE_REQUEST})

    const {data} = await axios.put(`/api/uploads/delete/${productId}`, {imageName : imageName})
     

    dispatch({type : SINGLE_IMAGE_DELETE_SUCCESS, payload : data})

    setTimeout(()=>{
      dispatch({type : SET_SINGLE_IMAGE_DELETE_TO_FALSE})
    }, 5000)
  
  } catch (err) {
    dispatch({type : SINGLE_IMAGE_DELETE_FAIL, payload : err.response && err.response.data.message ? err.response.data.message : "Une erreur du serveur s'est produite."})
  }
}


