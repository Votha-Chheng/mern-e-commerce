import axios from "axios"
import { GET_USER_ORDERS_FAIL, GET_USER_ORDERS_REQUEST, GET_USER_ORDERS_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELETE_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELIVERED_FAIL, ORDER_DELIVERED_REQUEST, ORDER_DELIVERED_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, USER_LIST_ORDERS_FAIL, USER_LIST_ORDERS_REQUEST, USER_LIST_ORDERS_SUCCESS } from "../constants/orderConstants"


export const createOrder = (order)=> async (dispatch, getState)=>{
  try {

    dispatch({
      type : ORDER_CREATE_REQUEST
    })

    const {userLogin : {userInfo}} = getState()

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.post(`/api/orders`, order, configHeaders)

    dispatch({
      type : ORDER_CREATE_SUCCESS, payload : data
    })

  } catch (err) {

    dispatch({
      type : ORDER_CREATE_FAIL, payload : err.response && err.response.data.message ? err.response.data.message : err.message
    })

  }
}

export const deleteOrder = (orderId)=> async (dispatch, getState)=>{
  try {

    dispatch({
      type : ORDER_DELETE_REQUEST
    })

    const {userLogin : {userInfo}} = getState()

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.delete(`/api/orders/${orderId}`, configHeaders)

    dispatch({
      type : ORDER_DELETE_SUCCESS, payload : data
    })

  } catch (err) {

    dispatch({
      type : ORDER_DELETE_FAIL, payload : err.response && err.response.data.message ? err.response.data.message : err.message
    })

  }
}


export const getOrderDetails = (id)=> async (dispatch, getState)=>{
  try {

    dispatch({
      type : ORDER_DETAILS_REQUEST
    })

    const {userLogin : {userInfo}} = getState()

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.get(`/api/orders/${id}`, configHeaders)

    dispatch({
      type : ORDER_DETAILS_SUCCESS, payload : data
    })

  } catch (err) {

    dispatch({
      type : ORDER_DETAILS_FAIL, payload : err.response && err.response.data.message ? err.response.data.message : err.message
    })

  }
}

export const getMyOrders = ()=> async (dispatch, getState)=>{
  try {

    dispatch({
      type : USER_LIST_ORDERS_REQUEST
    })

    const {userLogin : {userInfo}} = getState()

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.get(`/api/orders/myorders`, configHeaders)

    dispatch({
      type : USER_LIST_ORDERS_SUCCESS, payload : data
    })

  } catch (err) {

    dispatch({
      type : USER_LIST_ORDERS_FAIL, payload : err.response && err.response.data.message ? err.response.data.message : err.message
    })

  }
}

export const getUserOrdersList = (userId)=> async (dispatch, getState)=>{
  try {

    dispatch({
      type : GET_USER_ORDERS_REQUEST
    })

    const {userLogin : {userInfo}} = getState()

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.get(`/api/orders/admin/${userId}`, configHeaders)

    dispatch({
      type : GET_USER_ORDERS_SUCCESS, payload : data
    })

  } catch (err) {

    dispatch({
      type : GET_USER_ORDERS_FAIL, payload : err.response && err.response.data.message ? err.response.data.message : err.message
    })

  }
}

export const payOrder = (orderId, paymentResult)=> async (dispatch, getState)=>{
  try {

    dispatch({
      type : ORDER_PAY_REQUEST
    })

    const {userLogin : {userInfo}} = getState()

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, configHeaders)

    dispatch({
      type : ORDER_PAY_SUCCESS, payload : data
    })

  } catch (err) {

    dispatch({
      type : ORDER_PAY_FAIL, payload : err.response && err.response.data.message ? err.response.data.message : err.message
    })

  }
}

export const deliverOrder = (id, user)=> async (dispatch)=>{
  try {

    dispatch({type : ORDER_DELIVERED_REQUEST})


    //@route  PUT /api/orders/delivered/:id

    const {data} = await axios.put(`/api/orders/delivered/${id}`, user)

    dispatch({type : ORDER_DELIVERED_SUCCESS, payload : data})

  } catch (err) {

    dispatch({type : ORDER_DELIVERED_FAIL, payload : err.response && err.response.data.message ? err.response.data.message : err.message})

  }
}