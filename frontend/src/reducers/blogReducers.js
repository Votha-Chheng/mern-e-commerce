import { CREATE_ARTICLES_FAIL, CREATE_ARTICLES_REQUEST, CREATE_ARTICLES_SUCCESS, GET_ALL_ARTICLES_FAIL, GET_ALL_ARTICLES_REQUEST, GET_ALL_ARTICLES_SUCCESS, GET_ONE_ARTICLE_REQUEST, GET_ONE_ARTICLE_SUCCESS, SET_CREATE_ARTICLE_TO_FALSE, UPDATE_ARTICLE_FAIL, UPDATE_ARTICLE_REQUEST, UPDATE_ARTICLE_SUCCESS, SET_UPDATE_ARTICLE_TO_FALSE, DELETE_ARTICLES_REQUEST, DELETE_ARTICLES_SUCCESS, DELETE_ARTICLES_FAIL, SET_DELETE_ARTICLE_TO_FALSE } from "../constants/blogConstants";

export const allArticlesReducer = (state = {}, action)=>{
  switch (action.type){
    case GET_ALL_ARTICLES_REQUEST : 
      return { loadingAllArticles : true}
    case GET_ALL_ARTICLES_SUCCESS : 
      return { loadingAllArticles : false, articles : action.payload}
    case GET_ALL_ARTICLES_FAIL : 
      return {loadingAllArticles : false, errorAllArticles : action.payload}
    default: 
      return state
  }
}

export const articleByIdReducer = (state = {}, action)=>{
  switch (action.type){
    case GET_ONE_ARTICLE_REQUEST : 
      return {loadingOneArticle : true}
    case GET_ONE_ARTICLE_SUCCESS : 
      return {loadingOneArticle : false, article : action.payload}
    case GET_ALL_ARTICLES_FAIL : 
      return {loadingOneArticle : false, errorOneArticle : action.payload}
    default: 
      return state
  }
}

export const newArticleCreatedReducer = (state = {}, action)=>{
  switch (action.type){
    case CREATE_ARTICLES_REQUEST :
      return{loadingCreateArticle : true, successCreateArticle : false}
    case CREATE_ARTICLES_SUCCESS :
      return {loadingCreateArticle : false, successCreateArticle : true}
    case CREATE_ARTICLES_FAIL :
      return {loadingCreateArticle : false, successCreateArticle : false, errorCreateArticle : action.payload}
    case SET_CREATE_ARTICLE_TO_FALSE :
      return {...state, successCreateArticle : false}
    default: 
      return state
  }
}

export const articleUpdateReducer = (state = {}, action)=>{
  switch (action.type){
    case UPDATE_ARTICLE_REQUEST :
      return{loadingUpdateArticle : true, successUpdateArticle : false}
    case UPDATE_ARTICLE_SUCCESS :
      return {loadingUpdateArticle : false, successUpdateArticle : true, modification : action.payload}
    case UPDATE_ARTICLE_FAIL :
      return {loadingUpdateArticle : false, successUpdateArticle : false, errorUpdateArticle : action.payload}
    case SET_UPDATE_ARTICLE_TO_FALSE :
      return {...state, successUpdateArticle : false}
    default: 
      return state
  }
}

export const articleDeleteReducer = (state = {}, action)=>{
  switch (action.type){
    case DELETE_ARTICLES_REQUEST :
      return{loadingDeleteArticle : true, successDeleteArticle : false}
    case DELETE_ARTICLES_SUCCESS :
      return {loadingDeleteArticle : false, successDeleteArticle : true, messageDeleteArticle : action.payload}
    case DELETE_ARTICLES_FAIL :
      return {loadingDeleteArticle : false, successDeleteArticle : false, errorDeleteArticle : action.payload}
    case SET_DELETE_ARTICLE_TO_FALSE :
      return {...state, loadingDeleteArticle : false, successDeleteArticle : false}
    default: 
      return state
  }
}