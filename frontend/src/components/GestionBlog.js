
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import { deleteBillet, getAllArticles, setCreateArticleSuccessToFalse } from '../actions/blogActions'
import { resume } from '../fonctionsOutils'
import AddBilletBlog from './AddBilletBlog'
import BullesStats from './BullesStats'
import LoaderSpin from './LoaderSpin'
import ModifierBillet from './ModifierBillet'

const GestionBlog = () => {

  const [newBillet, setNewBillet] = useState(false)
  const [modifierBillet, setModifierBillet] = useState(false)
  const [idBilletAModifier, setIdBilletAModifier] = useState('')
  const [idBilletASupprimer, setIdBilletASupprimer] = useState('')

  const [modalDelete, setModalDelete] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  const {articles, loadingAllArticles, errorAllArticles} = useSelector(state => state.allArticles)
  const {successCreateArticle} = useSelector(state=>state.newArticleCreated)
  const {successDeleteArticle, errorDeleteArticle, loadingDeleteArticle} = useSelector(state=>state.articleDelete)
  // const {loadingUpdateArticle, successUpdateArticle, modification} = useSelector(state=>state.articleUpdate)

  useEffect(() => {
    dispatch(getAllArticles())
  }, [dispatch, successCreateArticle, modifierBillet, successDeleteArticle])

  const backButtonHandler = ()=>{
    dispatch(setCreateArticleSuccessToFalse())
    setNewBillet(false)
  }

  const backButtonForUpdateHandler = ()=>{
    dispatch(setCreateArticleSuccessToFalse())
    setModifierBillet(false)
  }

  const modificationBilletId = (event)=>{
    setIdBilletAModifier(event.target.id)
    setModifierBillet(true)
  }

  //Supprimer billet via Modal
  const modalConfirm = (event)=>{
    setIdBilletASupprimer(event.target.id)
    setModalDelete(true)
  }

  const supprimerBilletHandler =  ()=>{   
    dispatch(deleteBillet(idBilletASupprimer))
    setModalDelete(false)
  }

  return (
    <Wrapper>
      {
        modalDelete &&
        <ModalDiv>
          <div className='modal-content'>
            <div>Êtes vous sûr de vouloir supprimer définitivement ce billet ?</div>
            <div className='btn-row'>
              <button className='btn-block btn btn-warning p-1 mt-2 mr-1' onClick={()=>setModalDelete(false)}>Annuler</button>
              <button onClick={()=>supprimerBilletHandler()} className='btn-block btn btn-danger p-1 ml-1'>Supprimer l'article</button>
            </div>
          </div>
          
          
        </ModalDiv>
      }
      
      <div className='bulle-stat'>
        <BullesStats items={'billets'} itemsArray={articles} icon={"fa fa-file"} />
      </div>

      
        {
          errorDeleteArticle ?
            <div className='alert-danger h4 text-center'>{errorDeleteArticle}</div> :
          successDeleteArticle && 
            <div className='alert-success h4 text-center'>Billet supprimé !</div> 
        }
      
      <div className='table-billet-container'>

      {
        newBillet ? <AddBilletBlog backButton={()=>backButtonHandler()} /> :
        modifierBillet ? <ModifierBillet backButton={()=>backButtonForUpdateHandler()} billetId={idBilletAModifier}/> :
        <>
        <button className='btn btn-success rounded' onClick={()=>setNewBillet(true)} ><i className="far fa-edit mr-2" style={{transform : 'scale(2)'}}/>  Ecrire un nouveau billet</button>
        {
          errorAllArticles ? <div className='text-center alert-danger h3'>{errorAllArticles}</div> :
          
          loadingAllArticles ||loadingDeleteArticle ? 
          <LoaderSpin/> :
          articles &&
          articles.reverse().map((article, index)=>
            <div key={index} className='table-billet'>
              <div className='btn-row'>
                <button className='btn btn-block btn-primary mx-2 mt-2' onClick={()=>history.push(`/blog/${article._id}`)} >Voir le billet</button>
                <button 
                  id={article._id} 
                  className='btn btn-block btn-warning mx-2' 
                  onClick={(event)=>{
                    modificationBilletId(event)
                    window.scrollTo(0,0)
                  }}
                >
                  <i style={{transform :"scale(1.6)"}} className="fas fa-exchange-alt mr-3"/>Modifier le billet
                </button>
                <button className='btn btn-block btn-danger mx-2' id={article._id} onClick={(event)=>modalConfirm(event)}><i className="fas fa-trash-alt mr-2" style={{transform :"scale(1.4)"}}/>Supprimer le billet</button>
              </div>
              <div className='titre-row'>
                
                <h4>{article.titre}</h4>
              </div>
              <div className="img-row">
                {
                  article.photos.map((photo, index) =>
                  <div key={index} className='img-container'>
                    <img src={photo.url} alt={`${article.titre}-${index}`} width='200'/>
                  </div>
                  )
                }
              </div>
              <div className='text-row'>
                <div className='h4'>{article.sousTitre}</div>
                <div className='texte-resume' dangerouslySetInnerHTML={{__html : resume(article.texte, 200)}}></div>
              </div>
            </div> 
          )
        }
        </>
      }
      </div>
    </Wrapper>
  )
}

const ModalDiv = styled.div`
  z-index: 8000000000;
  top: 0px;
  left: 0px;
  position: fixed;
  width: 100%;
  height: 100%;
  display : flex;
  justify-content: center;
  background-color : rgba(0,0,0,0.5);
  padding-top : 200px;

  .modal-content{
    display : flex;
    justify-content: center;
    width : 360px;
    height : 200px;
    text-align: center;
    padding : 20px;
    border : 3px solid grey;
    border-radius : 3px;

    .btn-row{
      display: flex;
      margin-top : 15px;
      width: 100%;
    }
  }
  
`

const Wrapper = styled.div`

  
  .bulle-stat{
    width : 200px;
    display: flex;
    justify-content: center;
    margin : 20px auto 30px auto;
  }
  .table-billet{
    width:100%;
    border : 3px solid grey;
    margin : 20px 0;
    padding : 5px;
    border-radius : 10px;

    .btn-row{
      display: flex;
    }

    .titre-row{
      align-items: center;
      border-bottom : 3px solid #e0e0e0;
      padding:10px;

      h4{
        margin-left : 20px;
        margin-bottom :0;
      }
    }

    .img-row{
      display: flex;
      justify-content: center;
      border-bottom : 3px solid #e0e0e0;
      margin-top:10px;

      .img-container{
        width : 75px;
        height : 75px;
        margin : 10px;
        overflow : hidden;

        img{
          object-fit : cover;
          transform : translateX(-10%)
        }
      }
    }
    .text-row{
      padding : 10px;
    }
  }
  
  

`

export default GestionBlog
