import {  GET_FILTERED_PRODUCTS, GET_FILTERS, UPDATE_FILTERS } from '../constants/filtersConstants'
import axios from 'axios'
import { PRODUCTS_LIST_FAIL, PRODUCTS_LIST_REQUEST, PRODUCTS_LIST_SUCCESS } from '../constants/productsConstants'


export const getFilteredProducts = () => async (dispatch) =>{

  try {

    dispatch({type : PRODUCTS_LIST_REQUEST})

    const {data} = await axios.get('/api/products')

    dispatch({type : PRODUCTS_LIST_SUCCESS, payload : data})
    
    dispatch({type : GET_FILTERS})  

    dispatch({type : GET_FILTERED_PRODUCTS})

  } catch (error) {
    dispatch({type : PRODUCTS_LIST_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : "Une erreur du serveur s'est produite."})
  }
}

export const filtersUpdate = (state, name, value)=>(dispatch)=>{

  const newFilters = {
    ...state,
    [name] : value
  }

  dispatch({type : UPDATE_FILTERS, payload : newFilters})
}