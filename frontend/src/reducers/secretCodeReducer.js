import { CREATE_SECRET_CODE_FAIL, CREATE_SECRET_CODE_REQUEST, CREATE_SECRET_CODE_SUCCESS } from "../constants/secretCodeConstants";


export const secretCodeCreatedReducer = (state={}, action)=>{
  switch (action.type){
    case CREATE_SECRET_CODE_REQUEST : 
      return { loading : true}
    case CREATE_SECRET_CODE_SUCCESS : 
      return {loading: false, success : true}
    case CREATE_SECRET_CODE_FAIL : 
      return {loading: false, success : false, error : action.payload}
    default:
      return state
  }
}