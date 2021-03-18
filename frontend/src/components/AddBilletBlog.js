import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { createArticle } from '../actions/blogActions'
import { getImagesNames } from '../actions/imagesNamesActions'
import ContentEditable from './ContentEditable'
import GrilleDisplay from './GrilleDisplay'
import LoaderSpin from './LoaderSpin'
import NormalDisplay from './NormalDisplay'
import UploadImages from './UploadImages'

const AddBilletBlog = ({backButton}) => {

  const [texte, setTexte] = useState('')
  const [titre, setTitre] = useState('')
  const [sousTitre, setSousTitre] = useState('')
  const [legende, setLegende] = useState([])
  const [display, setDisplay] = useState('normal')
  const [imagesDir, setImagesDir] = useState([])

  const [getLegendIndex, setGetLegendIndex] = useState('')

  const [selectedImages, setSelectedImages] = useState([])
  const [images, setImages] = useState([])
  const [alertMessage, setAlertMessage] = useState('')
  const [problemFiles, setProblemFiles] = useState([])

  const dispatch = useDispatch()

  const {imagesNames} = useSelector(state=>state.imagesNames)

  const {loadingCreateArticle, successCreateArticle, errorCreateArticle} = useSelector(state=>state.newArticleCreated)

  useEffect(() => {
    dispatch(getImagesNames())
  }, [dispatch])

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

  const validateLegend = (index, phrase)=>{
    legende[index] = phrase
    imagesDir[index].legende = phrase
    setLegende(legende)
    setImagesDir(imagesDir)
    setGetLegendIndex('')
  }

  const setGetLegendToTrue = (event)=>{
    setGetLegendIndex(event.target.id)
  }

  const uploadPhotos = async()=>{
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
        const {data} = await axios.post('/api/uploads', formData, configHeaders)

        if(data.problem){
          setProblemFiles(prev=>[...prev, data])        
        }
      } catch (err) {
        setAlertMessage(err)
      }
    }  
  }


  const createNewBillet = ()=>{
    dispatch(createArticle({
      titre : titre,
      sousTitre : sousTitre,
      texte : texte,
      photos : imagesDir,
      displayPhotos : display
    }))
    uploadPhotos()
  }

  return (
    <>     
      <Wrapper>
        <button className='btn btn-warning rounded' onClick={backButton} ><i className="fas fa-arrow-circle-left mr-2" style={{transform : 'scale(2)'}}/>  Retour liste des billets</button>
        {
          errorCreateArticle ? <div className='h3 alert-danger text-center my-3'>{errorCreateArticle}</div> :
          loadingCreateArticle ? <LoaderSpin/> :
          successCreateArticle ? <div className='h3 alert-success text-center my-3'>{"Le billet a bien été crée !"}</div> :
        <>
          <h3 className='text-center mb-5'>Ajouter un billet</h3>
          <div className='display-container'>
            <div className='item-form'>
              <label className='font-weight-bold'>Choix de mise en page</label>
              <select value={display} onChange={(event)=>setDisplay(event.target.value)}>
                <option value='normal' >normal</option>
                <option value='grille'>grille</option>
              </select>
            </div>
            <div className='schema-display mb-4'>
              {
                display==='normal' ? 
                <NormalDisplay/> : 
                <GrilleDisplay/>
              }
            </div>
          </div>   
          
          <div className='item-form'>
            <label className='font-weight-bold' htmlFor='titre'>Titre</label>
            <input type='text' id='titre' name='titre' className='mb-4' onChange={(event)=>setTitre(event.target.value)} value={titre}/>
          </div>
          <div className='item-form'>
            <label className='font-weight-bold' htmlFor='sous-titre'>Sous-titre</label>
            <input type='text' id='sous-titre' name='sousTitre' className='mb-4' onChange={(event)=>setSousTitre(event.target.value)} value={sousTitre}/>
          </div>
          <div>
            <label className='font-weight-bold' htmlFor='texte'>Texte de l'article <small style={{fontStyle:"italic"}}>(Ne pas faire de copier-coller provenant d'un site web, mais plutôt d'un traitement de texte comme Word ou LibreOffice...)</small></label>
            <ContentEditable
              value={texte}
              onChange={setTexte}
            />
          </div>  
        </>
      } 
        
      </Wrapper>
      {
        errorCreateArticle ? null :
        loadingCreateArticle ? <LoaderSpin/> :
        successCreateArticle ? null :
        <UploadImages
          imageUploadHandler={(event)=>imageUploadHandler(event)} 
          deletePhotos = {(event)=>deletePhotos(event)}
          alertMessage={alertMessage}
          selectedImages = {selectedImages}
          withLegende = {true}
          legende = {legende}
          getLegendIndex={getLegendIndex}
          setGetLegendToTrue={setGetLegendToTrue}
          validateLegend={validateLegend}
        />
      }
      
      {
        errorCreateArticle ? null :
        successCreateArticle ? null :
        imagesDir.length>0 && 
        <button className='btn btn-block btn-success' onClick={()=> createNewBillet()}>{loadingCreateArticle ? <LoaderSpin/> :"Créer le billet de blog"}</button>
      }
    </>
    
  )
}

const Wrapper = styled.div`

  .display-container{
    display: flex;
    align-items: center;
    width: 100%;

    .item-form{
      display: flex;
      flex-direction : column;
      width: 20%;
      margin-right : 50px;
    }

    .schema-display{
      width : 200px;
      height: 300px;
      border : 2px solid grey;
    }
  }
  label{
    font-family : 'Roboto', sans-serif;
  }
  .item-form{
    display: flex;
    flex-direction : column;

    
  }

  .texte-input{
    border : 1px solid grey;
    width : 100%;
    height : 500px;
    padding : 10px;
  }
`

export default AddBilletBlog
