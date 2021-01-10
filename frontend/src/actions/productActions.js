import { PRODUCTS_LIST_FAIL, PRODUCTS_LIST_REQUEST, PRODUCTS_LIST_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, SET_CATEGORIES } from '../constants/productsConstants'
import axios from 'axios'

export const listProducts = ()=> async(dispatch)=> {
  try {
    dispatch({type : PRODUCTS_LIST_REQUEST})
    const {data} = await axios.get('/api/products')
    const products = data

    dispatch({type : PRODUCTS_LIST_SUCCESS, payload : products})

  } catch (error){
    dispatch({type : PRODUCTS_LIST_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : "Une erreur du serveur s'est produite."})
  }
}

export const listProductDetails = (id)=> async(dispatch)=> {
  try {
    dispatch({type : PRODUCT_DETAILS_REQUEST})
    const {data} = await axios.get(`/api/products/${id}`)

    dispatch({type : PRODUCT_DETAILS_SUCCESS, payload : data})

  } catch (error){
    dispatch({type : PRODUCT_DETAILS_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : "Une erreur du serveur s'est produite."})
  }
}

export const listCategories = (items)=> async(dispatch)=>{
  try {

    const setCategories = (items)=>{
      return new Set(items.map(product=>product.catégorie))
    }

    dispatch({type : SET_CATEGORIES, payload : ['tous les produits', ...setCategories(items)] })

  } catch (error) {

  }
}