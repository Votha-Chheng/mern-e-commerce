import {  GET_FILTERED_PRODUCTS, GET_FILTERS, UPDATE_FILTERS } from '../constants/filtersConstants'
import axios from 'axios'
import { PRODUCTS_LIST_FAIL, PRODUCTS_LIST_REQUEST, PRODUCTS_LIST_SUCCESS } from '../constants/productsConstants'
import { GET_FILTERED_ORDERS, GET_ORDER_FILTERS, ORDERS_LIST_FAIL, ORDERS_LIST_REQUEST, ORDERS_LIST_SUCCESS, UPDATE_ORDER_FILTERS } from '../constants/orderConstants'


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

export const getFilteredOrders = () => async (dispatch, getState) =>{

  try {

    dispatch({type : ORDERS_LIST_REQUEST})

    const {userLogin : {userInfo}} = getState()

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.get('/api/orders/admin/orders', configHeaders)

    dispatch({type : ORDERS_LIST_SUCCESS, payload : data})
    
    dispatch({type : GET_ORDER_FILTERS})  

    dispatch({type : GET_FILTERED_ORDERS})

  } catch (error) {
    dispatch({type : ORDERS_LIST_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : "Une erreur du serveur s'est produite."})
  }
}

export const ordersFiltersUpdate = (state, name, value)=>(dispatch)=>{

  const newFilters = {
    ...state,
    [name] : value
  }

  dispatch({type : UPDATE_ORDER_FILTERS, payload : newFilters})
}