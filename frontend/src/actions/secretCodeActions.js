import axios from "axios"
import { CREATE_SECRET_CODE_FAIL, CREATE_SECRET_CODE_REQUEST, CREATE_SECRET_CODE_SUCCESS } from "../constants/secretCodeConstants"

export const createSecretCode = (email)=> async(dispatch)=> {

  try {
    dispatch({type : CREATE_SECRET_CODE_REQUEST})

    await axios.post(`/api/secretCode`, (email))

    dispatch({type : CREATE_SECRET_CODE_SUCCESS})

  } catch (error){
    dispatch({type : CREATE_SECRET_CODE_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : "Une erreur du serveur s'est produite."})
  }
}