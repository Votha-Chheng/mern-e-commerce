import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PASSWORD_REQUEST, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PASSWORD_SUCCESS,USER_UPDATE_PASSWORD_FAIL, SEND_VALIDATION_EMAIL_REQUEST, SEND_VALIDATION_EMAIL_SUCCESS, SEND_VALIDATION_EMAIL_FAIL } from "../constants/userConstants"


export const userLoginReducer = (state = {}, action) =>{
  switch(action.type){
    case USER_LOGIN_REQUEST:
      return {loadingLogin:true }
    case USER_LOGIN_SUCCESS:
      return {loadingLogin:false, userInfo : action.payload}
    case USER_LOGIN_FAIL:
      return {loadingLogin:false, errorLogin:action.payload}
    case USER_LOGOUT:
      return { }
    default : 
      return state
  }
}

export const userRegisterReducer = (state = {}, action) =>{
  switch(action.type){
    case USER_REGISTER_REQUEST:
      return {loadingRegister:true, successRegister : false }
    case USER_REGISTER_SUCCESS:
      return {loadingRegister:false, successRegister : true, userInfoRegister : action.payload}
    case USER_REGISTER_FAIL:
      return {loadingRegister:false, successRegister : false, errorRegister:action.payload}
    default : 
      return state
  }
}

export const userDetailsReducer = (state = {user:{}}, action) =>{
  switch(action.type){
    case USER_DETAILS_REQUEST:
      return {...state, loadingDetails :true }
    case USER_DETAILS_SUCCESS:
      return {loadingDetails:false, success : true, user : action.payload}
    case USER_DETAILS_FAIL:
      return {loadingDetails:false, error:action.payload}
    default : 
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) =>{
  switch(action.type){
    case USER_UPDATE_PROFILE_REQUEST:
      return {loading:true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return {loading:false, success : true, userInfo : action.payload}
    case USER_UPDATE_PROFILE_FAIL:
      return {loading:false, error:action.payload}
    default : 
      return state
  }
}

export const userUpdatePasswordReducer = (state = {}, action) =>{
  switch(action.type){
    case USER_UPDATE_PASSWORD_REQUEST:
      return {loading:true }
    case USER_UPDATE_PASSWORD_SUCCESS:
      return {loading:false, successPassword : true, userInfo : action.payload }
    case USER_UPDATE_PASSWORD_FAIL:
      return {loading:false, errorPassword : action.payload}
    default : 
      return state
  }
}

export const validationEmailReducer = (state = {successValidationEmail : false, message:{}, errorValidationEmail:''}, action) =>{
  switch(action.type){
    case SEND_VALIDATION_EMAIL_REQUEST:
      return {loadingValidation:true }
    case SEND_VALIDATION_EMAIL_SUCCESS:
      return {loadingValidation:false, successValidationEmail : true, message : action.payload }
    case SEND_VALIDATION_EMAIL_FAIL:
      return {loadingValidation:false, errorValidationEmail : action.payload}
    default : 
      return state
  }
}