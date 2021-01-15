import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from '../constants/productsConstants'
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
