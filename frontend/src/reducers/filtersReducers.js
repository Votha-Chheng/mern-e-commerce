import {GET_FILTERED_PRODUCTS, GET_FILTERS, RESET_PRODUCT_PAGINATION, UPDATE_FILTERS, UPDATE_ORDER_PAGINATION, UPDATE_PRODUCT_PAGINATION} from '../constants/filtersConstants'
import { PRODUCTS_LIST_FAIL, PRODUCTS_LIST_REQUEST, PRODUCTS_LIST_SUCCESS } from '../constants/productsConstants'
import {ORDERS_LIST_REQUEST, ORDERS_LIST_FAIL, ORDERS_LIST_SUCCESS, GET_ORDER_FILTERS, GET_FILTERED_ORDERS, UPDATE_ORDER_FILTERS} from '../constants/orderConstants'


export const productsFilteredReducer = (state = 
  { 
    loading : true,
    allProducts : [], 
    filteredProducts : [],
    filters : {
      minPrice : 0,
      maxPrice : '',
      category : 'tous les produits',
      sort : 'newer'
    },
    productPagination : {
      currentPage : 1,
      numberOfItemsToDisplay : 20,
    } 
  },
    action) => {
  switch (action.type){
    case PRODUCTS_LIST_REQUEST:
      return {...state, loading:true }
    case PRODUCTS_LIST_SUCCESS:
      return {...state, loading:true, allProducts : action.payload }
    case GET_FILTERS :
      return {...state, loading:true, filters : state.filters}
    case GET_FILTERED_PRODUCTS :
      const {allProducts} = state
      const {category, minPrice, maxPrice, sort} = state.filters
      const {currentPage, numberOfItemsToDisplay} = state.productPagination

      let tempProducts = [...allProducts]
      if(minPrice) {
        tempProducts = tempProducts.filter(product => product.prix> minPrice)
      }
      if(maxPrice) {
        tempProducts = tempProducts.filter(product => product.prix< maxPrice)
      }
      if(category!=='tous les produits'){
        tempProducts = tempProducts.filter(product => product.catégorie === category)
      }
      if(sort==='newer'){
        tempProducts = tempProducts.reverse()
      }
      if(sort==='older'){
        tempProducts = [...tempProducts]
      }
      if(sort==='higher'){
        tempProducts = tempProducts.sort((a, b)=> a.prix - b.prix)
      }
      if(sort==='lower'){
        tempProducts = tempProducts.sort((a, b)=> b.prix - a.prix)
      }
      let productsUnpaginate = tempProducts
      let productPaginate = productsUnpaginate.slice(((currentPage-1)*numberOfItemsToDisplay), (numberOfItemsToDisplay*(currentPage)))
      return {...state, loading : false, filteredProducts : productPaginate, unpaginateProducts : productsUnpaginate}
    case UPDATE_FILTERS :
      return {...state, filters : action.payload}
    case UPDATE_PRODUCT_PAGINATION :
      return {...state, productPagination : action.payload}
    case RESET_PRODUCT_PAGINATION :
     // let resetPagination = {...state.productPagination, currentPage : 1}
      return{...state, productPagination : action.payload}
    case PRODUCTS_LIST_FAIL:
      return {...state, loading:false, error : action.payload}
    default:
      return state

  }
}

export const ordersFilteredReducer = (state = 
  { 
    loadingAllOrders : true,
    allOrders : [], 
    filteredOrders : [],
    orderFilters : {
      sortDate : 'newest',
      sortPayment : '',
      sortShipping :''
    },
    orderPagination : {
      currentPage : 1,
      numberOfItemsToDisplay : 10,
    }
  },
    action) => {
  switch (action.type){
    case ORDERS_LIST_REQUEST:
      return {...state, loadingAllOrders:true }
    case ORDERS_LIST_SUCCESS:
      return {...state, loadingAllOrders:false, allOrders : action.payload }
    case GET_ORDER_FILTERS :
      return {...state, loadingAllOrders:false, orderFilters : state.orderFilters}
    case GET_FILTERED_ORDERS :
      const {allOrders} = state
      const {sortDate, sortPayment, sortShipping} = state.orderFilters
      const {currentPage, numberOfItemsToDisplay} = state.orderPagination

      let tempOrders = [...allOrders]
      if(sortDate==='newest'){
        tempOrders = [...tempOrders].reverse()
      }
      if(sortDate==='older'){
        tempOrders = [...tempOrders]
      }
      if(sortPayment==="paid"){
        tempOrders = tempOrders.filter(order => order.isPaid)
      }
      if(sortPayment==="unpaid"){
        tempOrders = tempOrders.filter(order => !order.isPaid)
      }
      if(sortShipping==="delivered"){
        tempOrders = tempOrders.filter(order => order.isDelivered)
      }
      if(sortShipping==="undelivered"){
        tempOrders = tempOrders.filter(order => !order.isDelivered)
      }
      
      tempOrders = tempOrders.slice(((currentPage-1)*numberOfItemsToDisplay), (numberOfItemsToDisplay*(currentPage)))
      return {...state, loadingAllOrders : false, filteredOrders : tempOrders}
    case UPDATE_ORDER_FILTERS :
      return {...state, orderFilters : action.payload}
    case UPDATE_ORDER_PAGINATION :
      return {...state, orderPagination : action.payload}
    case ORDERS_LIST_FAIL:
      return {...state, loadingAllOrders:false, errorAllOrders : action.payload}
    default:
      return state

  }
}
