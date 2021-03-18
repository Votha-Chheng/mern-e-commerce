import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {imagesProductUpdateReducer, productCreatedReducer, productDeletedReducer, productDetailsReducer, productInfoUpdateReducer, singleImageDeleteReducer} from './reducers/productReducers'
import {ordersFilteredReducer, productsFilteredReducer} from './reducers/filtersReducers'
import { cartReducer } from './reducers/cartReducers';
import { userDetailsReducer, userEmailValidateReducer, userLoginReducer, userRegisterReducer, usersListReducer, userUpdateAddressReducer, userUpdatePasswordReducer, userUpdateProfileReducer, validationEmailReducer } from './reducers/userReducers';
import { showModalLoginReducer } from './reducers/modalReducers';
import { myOrdersReducer, orderCreateReducer, orderDeliveredReducer, orderDetailsReducer, orderPayReducer, userOrdersListReducer } from './reducers/orderReducers';
import { imagesNamesReducer } from './reducers/imagesReducers';
import { allArticlesReducer, articleByIdReducer, articleDeleteReducer, articleUpdateReducer, newArticleCreatedReducer } from './reducers/blogReducers';


const reducer = combineReducers({
  
  productDetails : productDetailsReducer,
  productsFiltered :productsFilteredReducer,
  cart : cartReducer,
  userLogin : userLoginReducer,
  showModalLogin : showModalLoginReducer,
  userRegister : userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile :userUpdateProfileReducer,
  userUpdatePassword : userUpdatePasswordReducer,
  userUpdateAddress :  userUpdateAddressReducer,
  validationEmail : validationEmailReducer,
  userEmailValidate : userEmailValidateReducer,
  orderCreate : orderCreateReducer,
  orderDetails : orderDetailsReducer,
  orderPay : orderPayReducer,
  myOrders : myOrdersReducer,
  usersList : usersListReducer,
  userOrdersList : userOrdersListReducer,
  ordersFiltered : ordersFilteredReducer,
  productInfoUpdate : productInfoUpdateReducer,
  productDeleted : productDeletedReducer,
  productCreated : productCreatedReducer,
  singleImageDelete : singleImageDeleteReducer,
  imagesProductUpdate : imagesProductUpdateReducer,
  imagesNames : imagesNamesReducer,
  allArticles : allArticlesReducer,
  articleById : articleByIdReducer,
  newArticleCreated : newArticleCreatedReducer,
  articleUpdate : articleUpdateReducer,
  articleDelete : articleDeleteReducer,
  orderDelivered : orderDeliveredReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) : null

const adressePointRelaisFromStorage = sessionStorage.getItem('pointRelais') ? JSON.parse(sessionStorage.getItem('pointRelais')) : {}

const initialState = {
  cart: {cartItems : cartItemsFromStorage, pointRelaisChoisi : adressePointRelaisFromStorage},
  userLogin : {userInfo : userInfoFromStorage},   
}

const middleware = [thunk]

const store = createStore(
  reducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
