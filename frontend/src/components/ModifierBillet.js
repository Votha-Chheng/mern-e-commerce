import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { deleteSingleImageBillet, getArticleDetails, updateArticle } from '../actions/blogActions'
import ContentEditable from './ContentEditable'
import GrilleDisplay from './GrilleDisplay'
import LoaderSpin from './LoaderSpin'
import Separateur from './Separateur'
import NormalDisplay from './NormalDisplay'
import { getImagesNames } from '../actions/imagesNamesActions'
import UploadImages from './UploadImages'
import axios from 'axios'

const ModifierBillet = ({billetId, backButton}) => {

  const [titre, setTitre] = useState('')
  const [display, setDisplay] = useState('')
  const [sousTitre, setSousTitre] = useState('')
  const [legende, setLegende] = useState([])
  const [imagesDir, setImagesDir] = useState([])
  const [texte, setTexte] = useState('')

  const [registeredPhotos, setRegisteredPhotos] = useState([]) 
  const [selectedImages, setSelectedImages] = useState([])
  const [images, setImages] = useState([])
  const [alertMessage, setAlertMessage] = useState('')
  const [problemFiles, setProblemFiles] = useState([])

  const [getLegendIndex, setGetLegendIndex] = useState('')
  const [change, setChange] = useState(false)
  const [modifierPhotos, setModifierPhotos] = useState(false)
  const [supprimerPhotos, setSupprimerPhotos] = useState(false)

  const dispatch = useDispatch()

  const {article, loadingOneArticle, errorOneArticle} = useSelector(state => state.articleById)
  const {imagesNames} = useSelector(state=>state.imagesNames)
  const {messageSingleImageDelete, successSingleImageDelete, errorSingleImageDelete, loadingSingleImageDelete} = useSelector(state=>state.singleImageDelete)
  const {loadingUpdateArticle, successUpdateArticle} = useSelector(state=>state.articleUpdate)


  useEffect(()=>{
    dispatch(getArticleDetails(billetId)) 
  },[dispatch, billetId, successUpdateArticle, successSingleImageDelete])

  useEffect(() => {
    dispatch(getImagesNames())
  },[dispatch, successSingleImageDelete, errorSingleImageDelete, loadingSingleImageDelete])

  useEffect(() => {
    if(article){
      let legendesArray = article.photos.map(photo => photo.legende)
      setTitre(article.titre)
      setSousTitre(article.sousTitre)
      setTexte(article.texte)
      setImagesDir(article.photos)
      setRegisteredPhotos(article.photos)
      setLegende(legendesArray)
      setTexte(article.texte)
      setDisplay(article.displayPhotos)
    }
  },[article, change])


  // Fonctions
  const imageUploadHandler = (event)=>{
    
    if(event.target.files){
      const arrayFiles = Array.from(event.target.files)
      const notImages = 
        arrayFiles
        .filter(image=> image.type !=='image/png')
        .filter(image=> image.type !=='image/jpg')
        .filter(image=> image.type !=='image/jpeg')

      if(notImages.length>0){
        setAlertMessage("Seuls les formats png et jpg sont acceptés.")
      } else {
        //Check if images names are already in images directory
        const sameName = arrayFiles.filter(image=> imagesNames.includes(image.name))
        
        //Images contains the same name in directory
        if(sameName.length>0){
          const names = sameName.map(image=> image.name)
          setAlertMessage(`Attention, changez le nom de ou des images suivante(s) : ${[names].join(', ')}`)
        } else {
        //It's all good.
          setAlertMessage("")
          setImages(prev => prev.concat(arrayFiles))
          const fileArray =  arrayFiles.map(file => ({name : file.name, url : URL.createObjectURL(file)}))
          const fileArrayName = arrayFiles.map(file =>  ({url : `../images/${file.name}`, legende : ''}))
          const legendeArray = fileArrayName.map(file => file.legende)
          setSelectedImages(prev => prev.concat(fileArray))
          setImagesDir(prev=>prev ? prev.concat(fileArrayName) : fileArrayName)
          setLegende(prev => prev.concat(legendeArray))
        }       
      }
    }
  }

  const deletePhotos = (event)=>{
    const newArray = selectedImages.filter(selectedImage=> selectedImage.name !== event.target.id)
    const newArray2 = images.filter(image => image.name !== event.target.id)
    const newArray3 = problemFiles.filter(file => file !== event.target.id)
    const newArray4 = imagesDir.filter(obj => obj.url !== `../images/${event.target.id}`)
    const legendeArray = newArray4.map(item => item.legende)
    setSelectedImages(newArray)
    setImages(newArray2)
    setProblemFiles(newArray3)
    setImagesDir(newArray4)
    setLegende(legendeArray)
  }

  const setGetLegendToTrue = (event)=>{
    setGetLegendIndex(event.target.id)
  }

  //Valider la légende de la photo, placer la legende dans le tableau ImagesDir
  const validateLegend = (index, phrase)=>{
    legende[index + registeredPhotos.length] = phrase
    imagesDir[index + registeredPhotos.length].legende = phrase
    setLegende(legende)
    setImagesDir(imagesDir)
    setGetLegendIndex('')
  }

  //Supprimer l'image du répertoire public/images
  const deletePhotosDisplayed = (event)=>{
    dispatch(deleteSingleImageBillet(event.target.id, article._id))
    
  }

  //Valider l'update des infos du billet
  const validateUpdateHandler = ()=>{
    dispatch(updateArticle({
      _id : article._id,
      titre : titre,
      sousTitre : sousTitre,
      displayPhotos : display,
      texte : texte,
    }))
    setChange(false)
  }


  const uploadPhotosUpdate = async()=>{
    setProblemFiles('')

    for(let i=0 ; i<images.length; i++){
      const formData = new FormData()
      formData.append('file', images[i])

      try {   
        const configHeaders = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        const {data} = await axios.put('/api/uploads', formData, configHeaders)

        if(data.problem){
          setProblemFiles(prev=>[...prev, data])        
        }
      } catch (err) {
        setAlertMessage(err)
      }
    }  
  }

  // Valider les nouvelles photos du billets
  const validateUpdatePhotosHandler = ()=>{
    dispatch(updateArticle({
      _id : article._id,
      photos : imagesDir
    }))
    uploadPhotosUpdate()
    setLegende([])
    setSelectedImages([])
    setModifierPhotos(false)
  }

  console.log(imagesDir)
  console.log(legende)

  return (
    <Wrapper>
      <button className='btn btn-warning rounded' onClick={backButton} ><i className="fas fa-arrow-circle-left mr-2" style={{transform : 'scale(2)'}}/>  Retour liste des billets</button>
      <h4 className='mb-5'>Modifier billet</h4>
      {
        loadingOneArticle ? <LoaderSpin/> :
        errorOneArticle ? <div className='text-center h4 alert-danger'>{errorOneArticle}</div> :
        article &&
        <div className='display-container'>
          <div className='item-form'>
            <label className='font-weight-bold'>Choix de mise en page</label>
            {
              change ?
              <select value={display} onChange={(event)=>setDisplay(event.target.value)}>
                <option value='normal' >normal</option>
                <option value='grille'>grille</option>
              </select> :
              <div>{display}</div>
            }
            
          </div>
          <div className='schema-display mb-4'>
            {
              display==='normal' ? 
              <NormalDisplay/> : 
              <GrilleDisplay/>
            }
          </div> 
        </div>   
      } 

      <div className='item-form'>
        <div><label className='font-weight-bold' htmlFor='titre'>Titre</label></div>
        {
          change ?
          <input type='text' id='titre' name='titre' className='mb-4' onChange={(event)=>setTitre(event.target.value)} value={titre}/> :
          <div className='item'>{titre}</div>
        }
      </div>

      <div className='item-form'>
        <div><label className='font-weight-bold' htmlFor='sous-titre'>Sous-titre</label></div>
        {
          change ?
          <input type='text' id='sous-titre' name='sousTitre' className='mb-4' onChange={(event)=>setSousTitre(event.target.value)} value={sousTitre}/> :
          <div className='item'>{sousTitre}</div>
        }   
      </div>

      <div>
        {
          change ?
          <>
            <label className='font-weight-bold' htmlFor='texte'>Texte de l'article <small style={{fontStyle:"italic"}}>(Ne pas faire de copier-coller provenant d'un site web, mais plutôt d'un traitement de texte comme Word ou LibreOffice...)</small></label>

            <ContentEditable
              value={texte}
              onChange={setTexte}
            />
          </> :
          <>
            <label className='font-weight-bold' htmlFor='texte'>Texte de l'article</label>
            <div className='bg-light p-2 mb-3' dangerouslySetInnerHTML={{__html : texte}}></div>
          </>
        }
      </div>
      
      {
        change ?
        <div className='btn-row'>
          <button className='btn btn-block btn-danger mt-2 mr-1' onClick={()=>setChange(false)}>Annuler les modifications</button>
          <button className='btn btn-block btn-success ml-1' onClick={()=>validateUpdateHandler()} >Valider les modifications</button>
        </div> :

        <button className='btn btn-block btn-info' onClick={()=>setChange(true)}>{loadingUpdateArticle ? <LoaderSpin/> : "Modifier l'article"}</button> 
      } 
      {successUpdateArticle && <div className='alert-success text-center h3'>Infos de l'article modifiés avec succès !</div>}
      <Separateur/>
      {/* Partie consacrée au photos */}

      <div className='photos-part-container'>
        <h4 className='my-3'>Modifier les photos du billet</h4>
        <div className='display-photos'>
          <h5 className='text-center mb-0 py-3'>Photos enregistrées</h5>
          <div className='file-photos'>
            {
              registeredPhotos && 
              registeredPhotos.map((photo, index)=>
                <div key={index} className='img-container'>
                  {
                    supprimerPhotos &&
                    <i 
                      className="far fa-times-circle" 
                      style={{position :"absolute", color:"white", top : "50%", left:"50%", transform:"scale(3)", cursor :"pointer"}} 
                      id={photo.url.slice(10)} 
                      onClick={(event)=>deletePhotosDisplayed(event)} 
                    />
                  }
                  <div>{photo.url.slice(10)}</div>
                  <img src={photo.url} alt={`${titre}-${index}`} width='250'/>
                  <div>{photo.legende}</div>
                </div>
              )
            }
          </div>
          {(successSingleImageDelete && messageSingleImageDelete) && <div className='alert-success h3 text-center'>{messageSingleImageDelete}</div>}
        </div>
        {
          
          modifierPhotos ?
          <div className='upload-photos'>
            <UploadImages
              imageUploadHandler={(event)=>imageUploadHandler(event)}
              deletePhotos={(event)=>deletePhotos(event)} 
              alertMessage={alertMessage}
              selectedImages={selectedImages}
              withLegende = {true}
              legende = {legende}
              getLegendIndex={getLegendIndex}
              setGetLegendToTrue={(event)=>setGetLegendToTrue(event)}
              validateLegend = {validateLegend}
              registeredPhotos = {registeredPhotos.length}
            />
            {/* {
              change ? null :

            } */}
            <div className='btn-row'>
              <button className='btn btn-block rounded btn-danger mt-2 mr-2' onClick={()=>setModifierPhotos(false)}>Annuler</button>
              <button className='btn btn-block rounded btn-success ml-2' onClick={()=>validateUpdatePhotosHandler()}>Valider les photos</button>
            </div>
          </div> 
          :
          change ? null :
          supprimerPhotos ?
          <button className='btn btn-block rounded btn-danger mt-2' onClick={()=>setSupprimerPhotos(false)} >Retour</button>
          :
          <div className='btn-row'>
            <button className='btn btn-block rounded btn-warning mt-2 mr-2' onClick={()=>setSupprimerPhotos(true)} >Supprimer des photos existantes</button>
            <button className='btn btn-block rounded btn-info ml-2' onClick={()=>setModifierPhotos(true)} >Ajouter des photos</button>
          </div>
          
        }
        
        
      </div>  
      
    </Wrapper>
  )
}

const Wrapper = styled.div`

  .item-form{
    display: flex;
    flex-direction : column;
    width: 100%;
    margin-right : 50px;
    margin-bottom : 20px;

    label {
      text-transform : uppercase;
      color :black;
    }
    .item{
      font-size : 1.1em;
      font-family : "Poppins", "sans-serif";
    }
  }

  .display-container{
    display: flex;
    align-items: center;
    width: 100%;

    .item-form{
      display: flex;
      flex-direction : column;
      width: 20%;
      margin-right : 50px;
      margin-bottom : 20px;
    }
    

    .schema-display{
      width : 200px;
      height: 300px;
      border : 2px solid grey;
    }
    
  }
  .btn-row{
    display: flex;
  }
  .display-photos{
    border : 1px solid grey;
    padding-bottom : 5px;

    .file-photos{
      display: flex;
      justify-content: space-around;
      align-items: center;

      .img-container{
        position: relative;
        max-width: 250px;
      }
    }
  }
  
`

export default ModifierBillet
