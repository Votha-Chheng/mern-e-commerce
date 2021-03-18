import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_RESET, GET_POINT_RELAIS_ADDRESS } from "../constants/cartConstants";

export const cartReducer = (state = {cartItems : []}, action) =>{
  switch (action.type) {
    case CART_ADD_ITEM : 
      const item = action.payload

      const existingItem = state.cartItems.find(x => x.product === item.product)

      if(existingItem){
        return {
          ...state,
          cartItems : state.cartItems.map(x => x.product === existingItem.product ? item : x)
        }
      } else {
        return {
          ...state, cartItems : [...state.cartItems, item]
        }
      }
    case CART_REMOVE_ITEM :
      return {
        ...state, 
        cartItems : state.cartItems.filter(x => x.product!==action.payload)
      }
    case CART_RESET :
      return {cartItems : []}
    case GET_POINT_RELAIS_ADDRESS:
      return {...state, pointRelaisChoisi:action.payload }
    default:
      return state
  }
}
