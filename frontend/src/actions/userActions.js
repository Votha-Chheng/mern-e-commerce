import { GET_USERS_LIST_FAIL, GET_USERS_LIST_REQUEST, GET_USERS_LIST_SUCCESS, SEND_VALIDATION_EMAIL_FAIL, SEND_VALIDATION_EMAIL_REQUEST, SEND_VALIDATION_EMAIL_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_ADDRESS_FAIL, USER_UPDATE_ADDRESS_REQUEST, USER_UPDATE_ADDRESS_SUCCESS, USER_UPDATE_ORDERS_FAIL, USER_UPDATE_ORDERS_REQUEST, USER_UPDATE_ORDERS_SUCCESS, USER_UPDATE_PASSWORD_FAIL, USER_UPDATE_PASSWORD_REQUEST, USER_UPDATE_PASSWORD_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, VALIDATE_USER_EMAIL_FAIL, VALIDATE_USER_EMAIL_REQUEST, VALIDATE_USER_EMAIL_SUCCESS } from "../constants/userConstants"
import axios from 'axios'


export const login = (email, motDePasse)=> async(dispatch)=> {

  try {
    dispatch({type : USER_LOGIN_REQUEST})

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const {data} = await axios.post(`/api/users/login`, {email, motDePasse}, configHeaders)
   

    dispatch({type : USER_LOGIN_SUCCESS, payload : data})

    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error){
    dispatch({type : USER_LOGIN_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : "Une erreur du serveur s'est produite."})
  }
}


export const logout = ()=> async(dispatch)=>{
  localStorage.removeItem('userInfo')
  dispatch({type : USER_LOGOUT})
  window.location.reload()
}

export const register = (nom, prénom, email, motDePasse)=> async(dispatch)=> {

  try {
    dispatch({type : USER_REGISTER_REQUEST})

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const {data} = await axios.post(`/api/users`, {nom, prénom, email, motDePasse}, configHeaders)

    dispatch({type : USER_REGISTER_SUCCESS, payload : data})

    // dispatch({type : USER_LOGIN_SUCCESS, payload: data})

    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error){
    dispatch({type : USER_REGISTER_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : "Une erreur du serveur s'est produite."})
  }
}

export const getUserDetails = (id)=>async(dispatch, getState)=>{
  try{
    dispatch({type : USER_DETAILS_REQUEST})

    const {userLogin : {userInfo}} = getState()

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.get(`/api/users/${id}`, configHeaders)

    dispatch({type : USER_DETAILS_SUCCESS, payload : data})

  } catch (error){
    dispatch({type : USER_DETAILS_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message})
  }
}

export const updateUserProfile = (user)=>async(dispatch, getState)=>{
  try{
    dispatch({type : USER_UPDATE_PROFILE_REQUEST})

    const {userLogin : {userInfo}} = getState()

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.put('/api/users/profile', user, configHeaders)

    dispatch({type : USER_UPDATE_PROFILE_SUCCESS, payload : data})

  } catch (error){
    dispatch({type : USER_UPDATE_PROFILE_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message})
  }
}

export const updateUserPassword = (user)=>async(dispatch, getState)=>{
  try{
    dispatch({type : USER_UPDATE_PASSWORD_REQUEST})

    const {userLogin : {userInfo}} = getState()

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.put('/api/users/password', user, configHeaders)

    dispatch({type : USER_UPDATE_PASSWORD_SUCCESS, payload : data})

  } catch (error){
    dispatch({type : USER_UPDATE_PASSWORD_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message})
  }
}

export const updateUserAddress= (user)=>async(dispatch, getState)=>{
  try{
    dispatch({type : USER_UPDATE_ADDRESS_REQUEST})

    const {userLogin : {userInfo}} = getState()

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
    }

    const data = await axios.put('/api/users/address', user, configHeaders)

    dispatch({type : USER_UPDATE_ADDRESS_SUCCESS, payload : data})

  } catch (error){
    dispatch({type : USER_UPDATE_ADDRESS_FAIL, payload : 'Une erreur est survenue. Recommencez l\'action.'})
  }
}

export const updateUserOrders= (user)=>async(dispatch, getState)=>{
  try{
    dispatch({type : USER_UPDATE_ORDERS_REQUEST})

    const {userLogin : {userInfo}} = getState()

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
    }

    await axios.put('/api/users/orders',user, configHeaders)

    dispatch({type : USER_UPDATE_ORDERS_SUCCESS})

  } catch (error){
    dispatch({type : USER_UPDATE_ORDERS_FAIL})
  }
}


export const sendEmailValidation = ()=>async(dispatch, getState)=>{
  try{
    dispatch({type : SEND_VALIDATION_EMAIL_REQUEST})

    const {userLogin : {userInfo}} = getState()


    const configHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.get(`/api/users/validation/${userInfo.token}`, configHeaders)

    dispatch({type : SEND_VALIDATION_EMAIL_SUCCESS, payload : data})

  } catch (error){
    dispatch({type : SEND_VALIDATION_EMAIL_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message})
  }
}

export const validateUserEmail = (userId, secretCode)=>async(dispatch)=>{
  try{
    dispatch({type : VALIDATE_USER_EMAIL_REQUEST})

    const {data} = await axios.get(`/api/users/confirmation?userId=${userId}&code=${secretCode}`)

  
    dispatch({type : VALIDATE_USER_EMAIL_SUCCESS, payload : data})

  } catch (error){
    dispatch({type : VALIDATE_USER_EMAIL_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message})
  }
}

export const getUsersList = ()=> async (dispatch, getState)=>{
  try {

    dispatch({
      type : GET_USERS_LIST_REQUEST
    })

    const {userLogin : {userInfo}} = getState()

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.get(`/api/users/admin`, configHeaders)

    dispatch({
      type : GET_USERS_LIST_SUCCESS, payload : data
    })

  } catch (err) {

    dispatch({
      type : GET_USERS_LIST_FAIL, payload : err.response && err.response.data.message ? err.response.data.message : err.message
    })
  }
}


