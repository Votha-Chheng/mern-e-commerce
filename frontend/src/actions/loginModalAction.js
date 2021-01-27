import { CLOSE_MODAL_LOGIN, SHOW_MODAL_LOGIN } from "../constants/modalConstants"

export const loginModal = ()=>async(dispatch) =>{
  dispatch({
    type : SHOW_MODAL_LOGIN,
  })
}
export const loginModalClose = ()=>async(dispatch) =>{
  dispatch({
    type : CLOSE_MODAL_LOGIN,
  })
}