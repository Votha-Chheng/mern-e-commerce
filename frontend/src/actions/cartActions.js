import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_RESET, GET_POINT_RELAIS_ADDRESS } from "../constants/cartConstants"



export const addToCart = (id, qty, couleur)=>async(dispatch, getState) =>{
  const {data} = await axios.get(`/api/products/${id}`)

  dispatch({
    type : CART_ADD_ITEM,
    payload : {
      product:data._id,
      nom:data.nom,
      image : data.images[0],
      prix : data.prix,
      stock : data.stock,
      qty,
      couleur : couleur? couleur : ""
    }
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id)=>async(dispatch, getState) =>{

  dispatch({
    type : CART_REMOVE_ITEM,
    payload : id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const getPointRelaisAddress = ()=>async(dispatch)=>{

  dispatch({type : GET_POINT_RELAIS_ADDRESS, payload : JSON.parse(sessionStorage.getItem('pointRelais')) })

}


export const resetCartItems = ()=>async(dispatch)=>{

  localStorage.removeItem('cartItems')
  sessionStorage.removeItem('pointRelais')

  dispatch({type : CART_RESET})

}