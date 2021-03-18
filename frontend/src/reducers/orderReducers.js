import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, USER_LIST_ORDERS_REQUEST, USER_LIST_ORDERS_SUCCESS, USER_LIST_ORDERS_FAIL, GET_USER_ORDERS_REQUEST, GET_USER_ORDERS_SUCCESS, GET_USER_ORDERS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_RESET, ORDER_DELETE_REQUEST, ORDER_DELETE_FAIL, ORDER_DELIVERED_REQUEST, ORDER_DELIVERED_SUCCESS, ORDER_DELIVERED_FAIL } from "../constants/orderConstants";

export const orderCreateReducer = (state={}, action) => {
  switch (action.type){
    case ORDER_CREATE_REQUEST :
      return {loadingCreateOrder : true}
    case ORDER_CREATE_SUCCESS :
      return {loadingCreateOrder: false, successCreateOrder : true, order : action.payload}
    case ORDER_CREATE_FAIL :
      return {loadingCreateOrder: false, successCreateOrder : false, errorCreateOrder : action.payload}
    default:
      return state
  }
}

export const orderDeleteReducer = (state={}, action) => {
  switch (action.type){
    case ORDER_DELETE_REQUEST :
      return {loading : true}
    case ORDER_DETAILS_SUCCESS :
      return {loading: false, success : true, orderDeleteMessage: action.payload}
    case ORDER_DELETE_FAIL :
      return {loading: false, success : false, error : action.payload}
    default:
      return state
  }
}

export const orderDetailsReducer = (state={}, action) => {
  switch (action.type){
    case ORDER_DETAILS_REQUEST :
      return {...state, loadingDetailsOrder : true}
    case ORDER_DETAILS_SUCCESS :
      return {loadingDetailsOrder: false, order : action.payload}
    case ORDER_DETAILS_FAIL :
      return {loadingDetailsOrder: false,  errorDetailsOrder : action.payload}
    default:
      return state
  }
}

export const orderPayReducer = (state={}, action) => {
  switch (action.type){
    case ORDER_PAY_REQUEST :
      return {loading : true}
    case ORDER_PAY_SUCCESS :
      return {loading: false, success : true}
    case ORDER_PAY_FAIL :
      return {loading: false, success : false, error : action.payload}
    case ORDER_PAY_RESET :
      return {}
    default:
      return state
  }
}

export const orderDeliveredReducer = (state={}, action) => {
  switch (action.type){
    case ORDER_DELIVERED_REQUEST :
      return {loading : true}
    case ORDER_DELIVERED_SUCCESS :
      return {loading: false, success : true, order : action.payload}
    case ORDER_DELIVERED_FAIL :
      return {loading: false, success : false, error : action.payload}
    default:
      return state
  }
}

export const myOrdersReducer = (state={}, action) =>{
  switch (action.type){
    case USER_LIST_ORDERS_REQUEST :
      return{...state, loadingMyOrders : true}
    case USER_LIST_ORDERS_SUCCESS : 
      return {loadingMyOrders : false, myOrders : action.payload}
    case USER_LIST_ORDERS_FAIL :
      return {loadingMyOrders : false, errorMyOrders : action.payload}
    default:
      return state
  }
}

export const userOrdersListReducer = (state={}, action) =>{
  switch (action.type){
    case GET_USER_ORDERS_REQUEST :
      return{loadingUserOrdersList : true}
    case GET_USER_ORDERS_SUCCESS : 
      return {loadingUserOrdersList : false, userOrdersList : action.payload}
    case GET_USER_ORDERS_FAIL :
      return {loadingUserOrdersList : false, errorUserOrdersList : action.payload}
    default:
      return state
  }
}
