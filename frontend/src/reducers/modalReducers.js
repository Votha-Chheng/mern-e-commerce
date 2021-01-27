import { CLOSE_MODAL_LOGIN, SHOW_MODAL_LOGIN } from "../constants/modalConstants"

export const showModalLoginReducer = (state = {showModalLogin : false}, action) =>{
  switch(action.type){
    case SHOW_MODAL_LOGIN:
      return {showModalLogin : !state.showModalLogin}
    case CLOSE_MODAL_LOGIN:
      return {showModalLogin : false}
    default : 
      return state
  }
}