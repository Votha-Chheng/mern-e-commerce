import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import { createProduct } from '../actions/productActions'
import LoaderSpin from './LoaderSpin'
import UploadImages from './UploadImages'
import { getImagesNames } from '../actions/imagesNamesActions'

const AdminAddProduct = ({addProductBackHandler, categoriesList}) => {

  const [nom, setNom] = useState('')
  const [catégorie, setCatégorie] = useState('')
  const [newCatégorie, setNewCatégorie] = useState('')
  const [couleurs, setCouleurs] = useState([])
  const [stock, setStock] = useState('')
  const [prix, setPrix] = useState('')
  const [livraison, setLivraison] = useState(true)
  const [description, setDescription] = useState('')
  const [imagesDir, setImagesDir] = useState()

  const [selectedImages, setSelectedImages] = useState([])
  const [images, setImages] = useState([])
  const [alertMessage, setAlertMessage] = useState('')
  const [problemFiles, setProblemFiles] = useState([])
  
  const [addCat, setAddCat] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [colorSwitch, setColorSwitch] = useState(false)

  const productCreated = useSelector(state => state.productCreated)
  const {loadingCreateProduct, successCreateProduct, errorCreateProduct} = productCreated

  const {imagesNames} = useSelector(state=>state.imagesNames)

  const dispatch = useDispatch()

  const buttonFixe = useRef(null)

  useEffect(() => {
    dispatch(getImagesNames())
  }, [dispatch, successCreateProduct])

  

  useLayoutEffect(() => {     
    const callbackEvent = ()=>{
      if(buttonFixe.current){
        if(window.scrollY > buttonFixe.current.offsetTop){
        setHidden(false)
        } else {
          setHidden(true)
        } 
      }   
    }   
    window.addEventListener("scroll", callbackEvent)

    return ()=> window.removeEventListener("scroll", callbackEvent)

  }, [hidden])

  const selectCatHandler = ()=>{
    setCatégorie('')
    setAddCat(true)
  }

  const cancelCat = ()=>{
    setCatégorie('')
    setAddCat(false)
  }

  const colorSwitchHandler = ()=>{
    setColorSwitch(prev=>!prev)

    if(!colorSwitch){
      setCouleurs(['beige', 'blanc', 'bleu-clair'])
    } else {
      setCouleurs([])
    }
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

  const validateCreationHandler = ()=>{
    dispatch(createProduct({
      nom : nom,
      catégorie : catégorie,
      prix : prix,
      stock : stock,
      description : description,
      couleurs : couleurs,
      livraison : String(livraison),
      images : imagesDir
    }))

    uploadPhotos()

  }

  const imageUploadHandler = (event)=>{
    
    if(event.target.files){
      const arrayFiles = Array.from(event.target.files)
      console.log(arrayFiles)
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
          const fileArrayName = arrayFiles.map(file => `../images/${file.name}`)
          setSelectedImages(prev => prev.concat(fileArray))
          setImagesDir(prev=>prev ? prev.concat(fileArrayName) : fileArrayName)
        }       
      }
      console.log(notImages)
    }
  }

  const deletePhotos = (event)=>{
    const newArray = selectedImages.filter(selectedImage=> selectedImage.name !== event.target.id)
    const newArray2 = images.filter(image => image.name !== event.target.id)
    const newArray3 = problemFiles.filter(file => file !== event.target.id)
    const newArray4 = imagesDir.filter(image => image !== `../images/${event.target.id}`)
    setSelectedImages(newArray)
    setImages(newArray2)
    setProblemFiles(newArray3)
    setImagesDir(newArray4)
  }


  return (
    errorCreateProduct ? 
    <div className='text-center'>
      <span className='alert-danger h3'>{errorCreateProduct}</span>
    </div>
    :
    successCreateProduct ? 
    <>
      <div className='text-center h2 my-3 alert-success'><span>Produit crée !</span></div>
      {
        problemFiles.length > 0 && 
        <>
          <div className='text-center'>
            <span className='alert-warning h-3 text-center'>Attention ! Il y a un problème avec les images suivantes :</span>
          </div>
          {
            problemFiles.map((file, index) => <div key={index}>{file.message}</div>)
          }
        </> 
      }
      <button ref={buttonFixe} className='btn btn-danger my-3 rounded' onClick={()=>addProductBackHandler()} >
        <span><i className="fas fa-arrow-circle-left"/>&nbsp;&nbsp;&nbsp;</span>
        <span className='mr-2'>Retour en arrière</span>
      </button>
      
    </>
    :
    loadingCreateProduct ? <LoaderSpin />
    :
    <div>
      <Wrapper>
        <button className='btn btn-danger my-3 rounded mobile-back-btn' style={hidden ? {display:'none'} : null} onClick={()=>addProductBackHandler()} >
          <span><i className="fas fa-arrow-circle-left"/>&nbsp;&nbsp;&nbsp;</span>
          <span className='mr-2'>Retour en arrière</span>
        </button>
        <button ref={buttonFixe} className='btn btn-danger my-3 rounded' onClick={()=>addProductBackHandler()} >
          <span><i className="fas fa-arrow-circle-left"/>&nbsp;&nbsp;&nbsp;</span>
          <span className='mr-2'>Retour en arrière</span>
        </button>

        <h4>Ajouter un nouveau produit</h4>
        <div className='container-produit'>

          <div className='nom-produit'>
            <div>Nom</div>
            <input className='input-item' name='nom' onChange={(event)=>setNom(event.target.value)} value={nom}/>
          </div>
          <div className='nom-produit'>
            <div>Catégorie</div> 
              {
                catégorie ? 
                <div>
                  <span>{catégorie}</span>
                  <div className='d-inline-block ml-3 change' onClick={()=>setCatégorie("")}><span><i className="fas fa-exchange-alt"/>&nbsp;&nbsp;Changer catégorie</span></div>
                </div> :
                !addCat ?
                <div>
                  <select name='catégorie' onChange={(event)=>setCatégorie(event.target.value)} value={catégorie}>
                    <option value=''>--Choisir une catégorie--</option>
                    {categoriesList && categoriesList.map((item, index)=> <option key={index} value={item}>{item}</option>)}
                  </select>
                  <div className='d-inline ml-3 add' onClick={()=>selectCatHandler()}>
                    <span><i className="fas fa-folder-plus"/>&nbsp;Ajouter une nouvelle catégorie</span>
                  </div>
                </div> :
                <>
                  <input type='text' onChange={(event)=>setNewCatégorie(event.target.value)} value={newCatégorie}/>
                  <div className='d-inline-block mx-2 cancel' onClick={()=>cancelCat()} ><i className="fas fa-times"/></div>
                  <div className='d-inline-block ml-1 confirm' onClick={()=>setCatégorie(newCatégorie)}><i className="fas fa-check-square"/></div>
                </>  
              } 
          </div>

          <div className='nom-produit coloris'>
            <div>Coloris abat-jour</div>
            <div className='switch-container'>
                <span style={{backgroundColor : `${colorSwitch ? 'white' : 'grey'}`, color : `${colorSwitch ? 'black' : '#ffffff'}`, borderRadius:'3px', padding :'3px'}}>Aucune</span>
                <div className='interrupteur' style={{backgroundColor : `${!colorSwitch ? 'grey' : '#508ab9'}`}} >
                  <div className='switch' 
                    style={!colorSwitch ? {transform : `translateX(0)`} : {transform : `translateX(18px)`}} 
                    onClick={()=>colorSwitchHandler()} 
                  >  
                  </div>
                </div>
                <span style={{backgroundColor : `${!colorSwitch ? 'white' : '#508ab9'}`, color : `${!colorSwitch ? 'black' : '#ffffff'}`, borderRadius:'3px', padding :'3px'}}>beige, blanc, bleu-clair</span>
              </div>
          </div>
          
          <div className='nom-produit'>
            <div>Stock</div>
            <input type='number' onChange={(event)=>setStock(event.target.value)} value={stock}/>
          </div>

          <div className='nom-produit'>
            <div>Livraison</div>
              <div className='switch-container'>
                <span 
                  style={{backgroundColor : `${!livraison ? 'white' : 'green'}`, color : `${!livraison ? 'black' : '#ffffff'}`, borderRadius:'3px', padding :'3px'}}
                >
                  Livrable
                </span>
                <div className='interrupteur' style={{backgroundColor : `${livraison ? 'green' : 'red'}`}} >
                  <div className='switch' style={livraison ? {transform : `translateX(0)`} : {transform : `translateX(18px)`}} onClick={()=>setLivraison(prev=>!prev)} ></div>
                </div>
                <span
                  style={{backgroundColor : `${livraison ? 'white' : 'red'}`, color : `${livraison ? 'black' : '#ffffff'}`, borderRadius:'3px', padding :'3px'}}
                >
                  Non-livrable
                </span>
              </div>
          </div>
          {/* <div className=''>
            Frais de port du produit : {product.fraisDePort ? product.fraisDePort : 'Non précisé'}
          </div> */}
          <div className='nom-produit prix'>
            <div>Prix :</div>
            <input type='number' onChange={(event)=>setPrix(event.target.value)} value={prix}/>
          </div>

          <div className='description nom-produit'>
            <div>Description</div> 
              <textarea rows='5' cols='100' value={description} onChange={(event)=>setDescription(event.target.value)}/>
          </div>
        </div>
        
      </Wrapper>
      <UploadImages 
        imageUploadHandler={(event)=>imageUploadHandler(event)} 
        deletePhotos = {(event)=>deletePhotos(event)}
        alertMessage={alertMessage}
        selectedImages = {selectedImages}
      />
      <button className='btn btn-block btn-primary' onClick={()=>validateCreationHandler()}>Valider la création du nouveau produit</button>
    </div>
    
  )
  
}

const Wrapper = styled.div`
  h4{
    margin: 20px auto;
    padding-bottom :10px;
    border-bottom: 2px solid #c7d1d1;
  }
  .container-produit{

    .nom-produit.coloris{
      margin-top : 10px;

      div{
        margin-top : 5px;
      }
    }
    .nom-produit{
      margin : 20px 0;
      padding-left : 5px;

      .switch-container{
        display : flex;
        padding : 10px;
        width : 340px;

        div{
          font-size : 1.1em;
          font-weight: normal;
        }

        .interrupteur{
          width : 50px;
          height : 20px;
          margin : 3px 5px;
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

      div:first-child{
        font-family : 'Roboto', sans-serif;
        font-weight : bold;
      }

      input {
        width: 300px;
        font-style : italic;
      }
    }
  }
  

  .mobile-back-btn{
    position: fixed;
    left : 50px;
    bottom : 300px;
    z-index: 10;
  }
  .add{
    background-color : #5fab9e;
    padding : 5px 10px;
    color : white;
    cursor: pointer;
    border-radius : 5px;
  }
  .change{
    background-color : #4075a0 ;
    text-align: center;
    padding : 2px 0px 2px 3px;
    width : 170px;
    color : white;
    border-radius : 3px;
    cursor: pointer;
  }
  .cancel{
    background-color : #e03100;
    cursor: pointer;
    width : 23px ;
    height : 23px ;
    padding : 2px 3px 0px 5px;
    text-align: center;
    border-radius : 2px;

    i.fa-times{
      color : white;
    }
    
  }
  .confirm{
    cursor : pointer;
    i.fa-check-square{
      color : green;
      transform : scale(1.9)
  }
  }
  
  i{
    transform : scale(1.6)
  }
`

export default AdminAddProduct
