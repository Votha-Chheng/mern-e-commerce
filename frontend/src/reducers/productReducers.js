import { PRODUCTS_LIST_FAIL, PRODUCTS_LIST_REQUEST, PRODUCTS_LIST_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, SET_CATEGORIES } from '../constants/productsConstants'

export const productsListReducer = (state = {products: []}, action) =>{
  switch(action.type){
    case PRODUCTS_LIST_REQUEST:
      return {loading:true, products : []}
    case PRODUCTS_LIST_SUCCESS:
      return {loading:false, products: action.payload}
    case PRODUCTS_LIST_FAIL:
      return {loading:false, error:action.payload}
    default : 
      return state
  }
}

export const productDetailsReducer = (state = {product: {couleurs : [], images : []}}, action) =>{
  switch(action.type){
    case PRODUCT_DETAILS_REQUEST:
      return {loading:true, ...state}
    case PRODUCT_DETAILS_SUCCESS:
      return {loading:false, product: action.payload}
    case PRODUCT_DETAILS_FAIL:
      return {loading:false, error:action.payload}
    default : 
      return state
  }
}

export const categoriesListReducer = (state = {categories : []}, action)=>{
  switch (action.type){
    case SET_CATEGORIES:
      return {categories : ['tous les produits', ...action.payload]}
    default:
      return state
  }
}