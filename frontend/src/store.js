import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productDetailsReducer} from './reducers/productReducers'
import {productsFilteredReducer} from './reducers/filtersReducers'
import { cartReducer } from './reducers/cartReducers';
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdatePasswordReducer, userUpdateProfileReducer, validationEmailReducer } from './reducers/userReducers';
import { showModalLoginReducer } from './reducers/modalReducers';


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
  validationEmail : validationEmailReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
  cart: {cartItems : cartItemsFromStorage},
  userLogin : {userInfo : userInfoFromStorage} 
}

const middleware = [thunk]

const store = createStore(
  reducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
