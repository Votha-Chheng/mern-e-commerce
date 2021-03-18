import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { deleteSingleImage, listProductDetails, updateProductImages, updateProductInfo } from '../actions/productActions'
import CarouselImageProduit from './CarouselImageProduit'
import LoaderSpin from './LoaderSpin'
import UploadImages from './UploadImages'
import axios from 'axios'
import { getImagesNames } from '../actions/imagesNamesActions'

const AdminProductDetails = ({switchDisplayHandler, productId, allProducts}) => {

  const [modifier, setModifier] = useState(false)
  const [modifierPhotos, setModifierPhotos] = useState(false)
  const [hidden, setHidden] = useState(true)

  const [nom, setNom] = useState('')
  const [catégorie, setCatégorie] = useState('')
  const [couleurs, setCouleurs] = useState()
  const [stock, setStock] = useState('')
  const [prix, setPrix] = useState('')
  const [livraison, setLivraison] = useState()
  const [description, setDescription] = useState('')
  const [imagesDir, setImagesDir] = useState([])

  const [selectedImages, setSelectedImages] = useState([])
  const [images, setImages] = useState([])
  const [alertMessage, setAlertMessage] = useState('')
  const [problemFiles, setProblemFiles] = useState([])

  const dispatch = useDispatch()

  const productInfoUpdate = useSelector(state => state.productInfoUpdate)

  const {product, loading, success, error} = useSelector(state=>state.productDetails)

  const{successImagesProductUpdate} = useSelector(state=>state.imagesProductUpdate)

  const singleImageDelete = useSelector(state=>state.singleImageDelete)
  const {loadingSingleImageDelete, successSingleImageDelete, errorSingleImageDelete, messageSingleImageDelete} = singleImageDelete

  const {imagesNames} = useSelector(state=>state.imagesNames)

  const buttonBackFixe = useRef(null)

  useEffect(() =>{
    dispatch(listProductDetails(productId))

  }, [dispatch, productId, successSingleImageDelete, successImagesProductUpdate] )

  useEffect(() => {
    if(success){
      if(success){
        setNom(product.nom)
        setCatégorie(product.catégorie)
        setCouleurs(product.couleurs)
        setStock(product.stock)
        setPrix(product.prix)
        setLivraison(product.livraison)
        setDescription(product.description)
        setImagesDir(product.images)
      }  
    }
  }, [success, product])

  useEffect(() => {
    dispatch(getImagesNames())
  }, [dispatch, product, successSingleImageDelete, successImagesProductUpdate])

  console.log(imagesNames)
  

  useLayoutEffect(() => {     
    const callbackEvent = ()=>{
      if(buttonBackFixe.current){
        if(window.scrollY > buttonBackFixe.current.offsetTop){
        setHidden(false)
        } else {
          setHidden(true)
        } 
      }   
    }
    
    window.addEventListener("scroll", callbackEvent)

    return ()=> window.removeEventListener("scroll", callbackEvent)

  }, [hidden])

  const categoriesList = (liste) =>{
    return [...new Set(liste.map(item => item.catégorie))]
  }


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
        setAlertMessage("")
        setImages(prev => prev.concat(arrayFiles))
        const fileArray =  arrayFiles.map(file => ({name : file.name, url : URL.createObjectURL(file)}))
        const fileArrayName = arrayFiles.map(file => `../images/${file.name}`)
        setSelectedImages(prev => prev.concat(fileArray))
        setImagesDir(prev=>prev ? prev.concat(fileArrayName) : fileArrayName) 
        }
      }
    }
  }


  const deletePhotos = (event)=>{
    const newArray = selectedImages.filter(selectedImage=> selectedImage.name !== event.target.id)
    const newArray2 = images.filter(image => image.name !== event.target.id)
    if(problemFiles.length>0){
      const newArray3 = problemFiles.filter(file => file !== event.target.id)
      setProblemFiles(newArray3)
    } 
    const newArray4 = imagesDir.filter(image => image !== `../images/${event.target.id}`)
    setSelectedImages(newArray)
    setImages(newArray2)
    
    setImagesDir(newArray4)
  }

  const deletePhotosDisplayed = (event)=>{
    dispatch(deleteSingleImage(event.target.id, product._id))
    
  }

  const validateUpdateHandler = ()=>{
    dispatch(updateProductInfo({
      _id : product._id,
      nom : nom,
      catégorie : catégorie,
      couleurs : couleurs,
      stock : stock,
      prix : prix,
      livraison : String(livraison),
      description : description
    }))
    setModifier(prev=>!prev)
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

  const validateUpdateImagesHandler = ()=>{
    dispatch(updateProductImages({
      _id : product._id,
      images : imagesDir
    }))
    uploadPhotos()
    setModifierPhotos(prev=>!prev)
    setSelectedImages([])
  }

  return (
    <Wrapper>
      <button  className='btn btn-danger rounded mobile-back-btn-fixe'  style={hidden ? {display:'none'} : null} onClick={(event)=>switchDisplayHandler(event)} >
        <span><i className="fas fa-arrow-circle-left" style={{transform : 'scale(1.6)'}}/>&nbsp;&nbsp;&nbsp;</span>
        <span>Retour à la liste des produits</span>      
      </button>

      <button ref={buttonBackFixe} className='btn btn-danger rounded' onClick={(event)=>switchDisplayHandler(event)} >
        <span><i className="fas fa-arrow-circle-left" style={{transform : 'scale(1.6)'}}/>&nbsp;&nbsp;&nbsp;</span>
        <span>Retour à la liste des produits</span>      
      </button>
      <div className='id-produit'>
        Identifiant produit : {product._id}
      </div>

      <h5 className='text-center'><span>Infos produits</span></h5>
      {
        error ? <h3>{error}</h3> :


      
      <div className='container-produit' style={{backgroundColor : `${modifier ? '#e1d77a' : '#f4f6f6'}`}} >
        <div className='infos-produit'>
          <div className='nom-produit'>
            <div>Nom</div>{modifier ? <input className='input-item' name='nom' onChange={(event)=>setNom(event.target.value)} value={nom}/> : loading? <LoaderSpin/> :<span>{nom}</span>}
          </div>
          <div className='nom-produit'>
            <div>Catégorie</div> 
              {modifier ? 
                <select name='catégorie' onChange={(event)=>setCatégorie(event.target.value)} value={catégorie}>
                  {categoriesList(allProducts).map((item, index)=> <option key={index} value={item}>{item}</option>)}
                </select> : 
                loading? <LoaderSpin/> :
                <span>{catégorie}</span>}
          </div>
          <div className='nom-produit'>
            <div>Coloris abat-jour</div> 
            {couleurs && couleurs.length!==0? <span>{couleurs.join(', ')}</span> : 
            loading? <LoaderSpin/> : 
            <span>Pas de couleur</span>}
          </div>
          <div className='nom-produit'>
            <div>Stock restant</div> 
            {modifier ? <input type='number' onChange={(event)=>setStock(event.target.value)} value={stock}/> : stock === 0 ? <span className='alert-danger'>Aucun</span> : 
            loading? <LoaderSpin/> : 
            <span className='alert-success text-left'>{stock}</span>}
          </div>
          <div className='nom-produit'>
            <div>Livraison</div>
            {modifier ? 
              <div className='switch-container'>
                <div>Livrable</div>
                <div className='interrupteur' style={{backgroundColor : `${livraison ? 'green' : 'red'}`}} >
                  <div className='switch' style={livraison ? {transform : `translateX(0)`} : {transform : `translateX(18px)`}} onClick={()=>setLivraison(prev=>!prev)} ></div>
                </div>
                <div>Non-livrable</div>
              </div> :
              loading? <LoaderSpin/> :
              livraison ? <span className='alert-success'>Livraison disponible</span> : 
              <span className='alert-danger'>Livraison non-disponible</span>
            }
          </div>
          {/* <div className=''>
            Frais de port du produit : {product.fraisDePort ? product.fraisDePort : 'Non précisé'}
          </div> */}
          <div className='nom-produit prix'>
            <div>Prix :</div> 
            {modifier ? <><input type='number' onChange={(event)=>setPrix(event.target.value)} value={prix}/></> : 
            loading? <LoaderSpin/> :
            <span>{prix} €</span>}
          </div>
        </div>
        <div className='description nom-produit'>
          <div>Description</div> 
          {modifier ? 
            <textarea rows='10' style={{resize :'horizontal', width :'100%'}} value={description} onChange={(event)=>setDescription(event.target.value)}/>:
            loading? <LoaderSpin/> :
            <div className='text-desc'>{description}</div>} 
        </div>

      </div>
      }
      

      {
        error ? <h3 className='alert-danger text-center'>Chargement des photos du produits impossible.</h3>:
        modifier ? 
        <div className='w-100 text-center mb-5'>
          <button className='btn btn-inline-block btn-warning mx-2' onClick={()=>setModifier(prev=>!prev)}>Annuler modification</button>
          <button className='btn btn-inline-block btn-success mx-2' onClick={()=>validateUpdateHandler()}>Valider les modifications</button>
        </div> :
        <div className='text-center mb-5'>
          <button className='btn btn-inline-block btn-info' onClick={()=>setModifier(prev=>!prev)} >Modifier les informations du produit</button>
        </div>  
      }

      { productInfoUpdate.successUpdateInfoProduct ? <div className='alert-success mb-3'>Modification validée</div> : <div></div>}
      
      <div className='photos-part-container'>
        
        {
          modifierPhotos ? 
          <div className='modifier-photo'>
            <div className='display-photos'>
              <h4 className='text-center bg-light mb-0 py-3'>Photos enregistrées</h4>
              <div className='file-photos'>
                {loading? <LoaderSpin/> :
                product.images &&
                product.images.map((photo, index)=>
                <div key={index}>
                  <div className='img-container'>
                  <img src={photo} alt={photo.nom} width='200' height='auto'/>
                    <div className='image-delete' id={photo.name} onClick={deletePhotos} >
                      {
                        loadingSingleImageDelete ? 
                        <LoaderSpin/> :
                        <i className="far fa-times-circle" id={photo.slice(10)} onClick={(event)=>deletePhotosDisplayed(event)} />
                      }
                    </div>
                  </div>
                  <div className='text-center'>
                    <small className='font-weight-bold'>{photo.slice(10)}</small>
                  </div> 
                </div>
                
                )  
              }
              </div>
              {successSingleImageDelete && <div className='h3 text-center'><span className='alert-success'>{messageSingleImageDelete}</span></div>}
              {errorSingleImageDelete && <div className='h3 text-center'><span className='alert-danger'>{errorSingleImageDelete}</span></div>}
            </div>
            
            <div className='upload-photos'>
              <UploadImages
                imageUploadHandler={(event)=>imageUploadHandler(event)}
                deletePhotos={(event)=>deletePhotos(event)} 
                alertMessage={alertMessage}
                selectedImages={selectedImages}
              />
            </div>
          </div> :
          <div className='photos-produit'>
            { !product.images ?
            <div className='img-container'>
              <img src='../images/sample.jpg' alt='sample' width='200' height='auto'/>
            </div>
            : <CarouselImageProduit images={product.images}/>}
          </div>
        }
        
      </div>
      <div className='text-center mt-2'>
        {
          modifierPhotos ? 
          <>
            <button className='btn btn-inline-block btn-warning' onClick={()=>setModifierPhotos(prev=>!prev)}>Annuler changement</button>
            <button className='btn btn-inline-block btn-success mx-2' onClick={()=>validateUpdateImagesHandler()}>Valider les modifications</button>
          </> :
          <button className='btn btn-inline-block btn-info' onClick={()=>setModifierPhotos(prev=>!prev)}>Ajouter / enlever des photos</button>  
        }
        
      </div> 
      
    </Wrapper>
  )
}

const Wrapper = styled.div`
  h5{
    padding-left : 5px;
    border-top : 1px solid #e9ecec ;
    padding-top : 15px;

    span{
      border : 1px solid black;
      padding : 5px;
    }
  }
  .mobile-back-btn-fixe{
    position: fixed;
    left : 50px;
    bottom : 300px;
    z-index: 10;
  }
  .id-produit{
    margin : 20px 0;
    font-weight:bold;
  }
  .input-item{
    width : 100%;
  }
  .container-produit{
    display:flex;
    justify-content:flex-start;
    margin-bottom : 30px;
    padding : 10px;
    border-bottom : 1px solid #e9ecec;
    border-radius : 5px;

    .infos-produit{
      width: 30%;
      border : 3px solid #e9ecec;
      padding-top : 10px;
      padding-bottom : 0;
      margin-left : 5px;

      .nom-produit.prix{
        margin-bottom : 0px;
        border-bottom : none;
      }
      .nom-produit{
        display : flex;
        flex-direction: column;
        margin-bottom : 10px;
        border-bottom : 1px solid grey;

        div, input, span{
          padding-left : 5px;
          margin-bottom : 5px;
        }
        div{
          font-family : 'Roboto', sans-serif;
          font-weight: bold;
        }
        input, span {
          font-size : 1.3em;
        }
        input{
          font-style:italic;
        }
        .switch-container{
          display : flex;

          div{
            font-size : 1.1em;
            font-weight: normal;
          }

          .interrupteur{
            width : 50px;
            height : 20px;
            margin : 0 5px;
            border-radius : 50px;
            border : 1px solid black;
            padding : 0;
            
            .switch{
              cursor : pointer;
              height: 100%;
              width: 30px;
              border-radius : 50px;
              background-color : white;
              margin : 0;
              transition : transform 0.2s;
            }
          }
        }
        
      }
    }
    .description{
      width: 70%;
      margin-left : 30px;
      border : 1px solid #e9ecec;
      padding : 10px;
      div{
        font-family : 'Roboto', sans-serif;
        font-weight: bold;
      }
      .text-desc{
        font-weight: normal;
      }
      textarea{
        font-style:italic;
      }
    }
  }
  .photos-part-container{
    display: flex;
    border-top : 1px solid #e9ecec;
    background-color : #f4f6f6 ;
    border-radius:5px;
    padding: 5px;
    justify-content: center;
    width: 100%;

    .photos-produit{
      border-right : 1px solid #e9ecec;
      padding : 10px; 
    }
    .modifier-photo{
      display : flex;
      flex-direction : column;
      align-items: center;
      width : 100%;

      .display-photos{
        width: 100%;
      }

      .upload-photos{
        display : flex;
        justify-content: center;
        margin : 0 20px;
      }

      .file-photos{
        margin : 0 auto;
        width : 100%;
        padding : 50px;
        background-color : white;
        display : flex;
        justify-content: space-around;

        .img-container{
          display : flex;
          flex-direction : row;
          width : 200px;
          height : 100%;
          position: relative;
          margin : 0 ;

          img{
            height: 100%;
            object-fit:cover;
          }

          .image-delete{
            position : absolute;
            width : 100%;
            height : 100%;
            margin : 0 ;
            transition : all 0.3s ease-out;

            &:hover{
              z-index: 2;
              background-color : rgba(0, 0, 0, 0.5)
            }

            i{
              position : absolute;
              left : 50%;
              top : 50%;
              transform : translateX(-50%) scale(2.6);
              color : #c7d1d1;
              cursor: pointer;
              transition : all 0.3s ease-out;

              &:hover{
                transform : translateX(-50%) scale(5);
                color : white;
              }
            }
          }
          
        }
        
      }
    }
  }
`

export default AdminProductDetails
