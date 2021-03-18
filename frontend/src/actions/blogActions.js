import axios from "axios"
import { CREATE_ARTICLES_FAIL, CREATE_ARTICLES_REQUEST, CREATE_ARTICLES_SUCCESS, DELETE_ARTICLES_FAIL, DELETE_ARTICLES_REQUEST, DELETE_ARTICLES_SUCCESS, GET_ALL_ARTICLES_FAIL, GET_ALL_ARTICLES_REQUEST, GET_ALL_ARTICLES_SUCCESS, GET_ONE_ARTICLE_FAIL, GET_ONE_ARTICLE_REQUEST, GET_ONE_ARTICLE_SUCCESS, SET_CREATE_ARTICLE_TO_FALSE, SET_DELETE_ARTICLE_TO_FALSE, SET_UPDATE_ARTICLE_TO_FALSE, UPDATE_ARTICLE_FAIL, UPDATE_ARTICLE_REQUEST, UPDATE_ARTICLE_SUCCESS } from "../constants/blogConstants"
import { SET_SINGLE_IMAGE_DELETE_TO_FALSE, SINGLE_IMAGE_DELETE_FAIL, SINGLE_IMAGE_DELETE_REQUEST, SINGLE_IMAGE_DELETE_SUCCESS } from "../constants/productsConstants"


export const getAllArticles = ()=> async(dispatch)=>{

  try {

    dispatch({type : GET_ALL_ARTICLES_REQUEST})

    const {data} = await axios.get(`/api/billets`)

    dispatch({type : GET_ALL_ARTICLES_SUCCESS, payload : data})

  } catch (err) {

    dispatch({type : GET_ALL_ARTICLES_FAIL, payload : err.response && err.response.data.message ? err.response.data.message : "Une erreur du serveur empêche d'accéder aux articles du blog."})

  }
}

export const getArticleDetails = (id)=> async(dispatch)=>{

  try {
    
    dispatch({type : GET_ONE_ARTICLE_REQUEST})

    const {data} = await axios.get(`/api/billets/${id}`)

    dispatch({type : GET_ONE_ARTICLE_SUCCESS, payload : data})

  } catch (err) {

    dispatch({type : GET_ONE_ARTICLE_FAIL, payload : err.response && err.response.data.message ? err.response.data.message : "Une erreur du serveur empêche d'accéder aux articles du blog."})

  }
}

export const createArticle = (article) => async(dispatch, getState)=>{
  try {
  
    dispatch({type : CREATE_ARTICLES_REQUEST})

    const {userLogin : {userInfo}} = getState()

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.post(`/api/billets`, article, configHeaders)

    dispatch({type : CREATE_ARTICLES_SUCCESS, payload : data})

  } catch (err) {

    dispatch({type : CREATE_ARTICLES_FAIL, payload : err})

  }
}

export const setCreateArticleSuccessToFalse = ()=>(dispatch)=>{
  dispatch({type : SET_CREATE_ARTICLE_TO_FALSE})
}

export const updateArticle = (article) => async(dispatch, getState)=>{
  try {
  
    dispatch({type : UPDATE_ARTICLE_REQUEST})

    const {userLogin : {userInfo}} = getState()

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.put(`/api/billets/${article._id}`, article, configHeaders)

    dispatch({type : UPDATE_ARTICLE_SUCCESS, payload : data})

    setTimeout(() => dispatch({type : SET_UPDATE_ARTICLE_TO_FALSE}), 5000)

  } catch (err) {
    dispatch({type : UPDATE_ARTICLE_FAIL, payload : err.response && err.response.data.message ? err.response.data.message : "Une erreur du serveur empêche d'accéder aux articles du blog."})
  }
}


export const deleteSingleImageBillet = (imageName, billetId)=> async(dispatch)=> { 
  try {

    dispatch({type : SINGLE_IMAGE_DELETE_REQUEST})

    const {data} = await axios.put(`/api/uploads/billet/delete/${billetId}`, {imageName : imageName})
     
    dispatch({type : SINGLE_IMAGE_DELETE_SUCCESS, payload : data})

    setTimeout(()=>{
      dispatch({type : SET_SINGLE_IMAGE_DELETE_TO_FALSE})
    }, 5000)
  
  } catch (err) {
    dispatch({type : SINGLE_IMAGE_DELETE_FAIL, payload : err.response && err.response.data.message ? err.response.data.message : "Une erreur du serveur s'est produite."})
  }
}

export const deleteBillet = (billetId)=> async(dispatch, getState)=> { 
  try {

    dispatch({type : DELETE_ARTICLES_REQUEST})

    const {userLogin : {userInfo}} = getState()

    const configHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${userInfo.token}`
      }
    }

    await axios.delete(`/api/uploads/billet/${billetId}`)

    const {data} = await axios.delete(`/api/billets/${billetId}`, configHeaders)
     
    dispatch({type : DELETE_ARTICLES_SUCCESS, payload :data})

    setTimeout(()=>{
      dispatch({type : SET_DELETE_ARTICLE_TO_FALSE})
    }, 5000)
  
  } catch (err) {
    dispatch({type : DELETE_ARTICLES_FAIL, payload : err.response && err.response.data.message ? err.response.data.message : "Une erreur du serveur s'est produite."})
  }
}
