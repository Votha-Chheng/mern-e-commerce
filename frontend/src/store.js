import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productDetailsReducer} from './reducers/productReducers'
import {productsFilteredReducer} from './reducers/filtersReducers'


const reducer = combineReducers({
  productDetails : productDetailsReducer,
  productsFiltered :productsFilteredReducer,
  
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
