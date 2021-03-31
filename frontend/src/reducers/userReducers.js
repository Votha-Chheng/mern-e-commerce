import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PASSWORD_REQUEST, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PASSWORD_SUCCESS,USER_UPDATE_PASSWORD_FAIL, SEND_VALIDATION_EMAIL_REQUEST, SEND_VALIDATION_EMAIL_SUCCESS, SEND_VALIDATION_EMAIL_FAIL, USER_UPDATE_ADDRESS_REQUEST, USER_UPDATE_ADDRESS_SUCCESS, USER_UPDATE_ADDRESS_FAIL, VALIDATE_USER_EMAIL_REQUEST, VALIDATE_USER_EMAIL_SUCCESS, VALIDATE_USER_EMAIL_FAIL, GET_USERS_LIST_REQUEST, GET_USERS_LIST_SUCCESS, GET_USERS_LIST_FAIL, GET_USERS_FILTERED, UPDATE_USERS_FILTERS, GET_USERS_FILTERS, RESET_SEARCH_USERS} from "../constants/userConstants"


export const userLoginReducer = (state = {}, action) =>{
  switch(action.type){
    case USER_LOGIN_REQUEST:
      return {loadingLogin:true, successLogin : false }
    case USER_LOGIN_SUCCESS:
      return {loadingLogin:false, successLogin : true, userInfo : action.payload}
    case USER_LOGIN_FAIL:
      return {loadingLogin:false, successLogin : false, errorLogin:action.payload}
    case USER_LOGOUT:
      return {userInfo : {nom : '', prénom: '', email : '' }}
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

export const userDetailsReducer = (state = {
  user:{
    commandes : []
  }

}, action) =>{
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
      return {loadingUpdatePassword:true }
    case USER_UPDATE_PASSWORD_SUCCESS:
      return {loadingUpdatePassword:false, successPassword : true, userInfo : action.payload }
    case USER_UPDATE_PASSWORD_FAIL:
      return {loadingUpdatePassword:false, errorPassword : action.payload}
    default : 
      return state
  }
}

export const userUpdateAddressReducer = (state = {}, action) =>{
  switch(action.type){
    case USER_UPDATE_ADDRESS_REQUEST:
      return {loadingUpdateAddress:true }
    case USER_UPDATE_ADDRESS_SUCCESS:
      return {loadingUpdateAddress:false, successAddress : true, messageUpdateAddressSuccess : action.payload }
    case USER_UPDATE_ADDRESS_FAIL:
      return {loadingUpdateAddress:false, errorAddress : action.payload}
    default : 
      return state
  }
}

export const validationEmailReducer = (state = {successValidationEmail : false}, action) =>{
  switch(action.type){
    case SEND_VALIDATION_EMAIL_REQUEST:
      return {...state, loadingValidation:true }
    case SEND_VALIDATION_EMAIL_SUCCESS:
      return {loadingValidation:false, successValidationEmail : true, message : action.payload }
    case SEND_VALIDATION_EMAIL_FAIL:
      return {loadingValidation:false, successValidationEmail : false, errorValidationEmail : action.payload}
    default : 
      return state
  }
}

export const userEmailValidateReducer = (state = {}, action) =>{
  switch(action.type){
    case VALIDATE_USER_EMAIL_REQUEST:
      return {loadingValidateUserEmail:true }
    case VALIDATE_USER_EMAIL_SUCCESS:
      return {loadingValidateUserEmail:false, successValidateUserEmail : true, message : action.payload }
    case VALIDATE_USER_EMAIL_FAIL:
      return {loadingValidateUserEmail:false, errorValidateUserEmail : action.payload}
    default : 
      return state
  }
}

export const usersListReducer = (
  state = {
    loadingUsersList:true,
    usersList:[],
    filteredUsers :[],
    usersFilters : {
      byEmail :"",
      byPrenom : "",
      byNom : ""
    }
  }, action) =>{
  switch(action.type){
    case GET_USERS_LIST_REQUEST:
      return {...state, loadingUsersList:true }
    case GET_USERS_LIST_SUCCESS:
      return {...state, usersList : action.payload }
    case GET_USERS_FILTERS :
      return {...state, usersFilters : state.usersFilters}    
    case GET_USERS_FILTERED :
      const {usersList, usersFilters} = state
      const {byNom, byEmail, byPrenom} = usersFilters    
      let tempUsers = [...usersList]
      if(byNom && byNom.length>0){
        tempUsers = tempUsers.filter(user =>user.nom.toLowerCase().startsWith(byNom.toLowerCase()))
      }
      if(byEmail && byEmail.length>0){
        tempUsers = tempUsers.filter(user =>user.email.startsWith(byEmail.toLowerCase()))
      }
      if(byPrenom && byPrenom.length>0){
        tempUsers = tempUsers.filter(user =>user.prénom.toLowerCase().startsWith(byPrenom.toLowerCase()))
      }    
      return {...state, loadingUsersList: false, filteredUsers : tempUsers}
    case UPDATE_USERS_FILTERS :
      return {...state, loadingUsersList: false, usersFilters : action.payload}
    case RESET_SEARCH_USERS :
      return {...state, usersFilters : {
        byEmail :"",
        byPrenom : "",
        byNom : ""
      }}
    case GET_USERS_LIST_FAIL:
      return {loadingUsersList:false, errorUsersList : action.payload}
    default : 
      return state
  }
}