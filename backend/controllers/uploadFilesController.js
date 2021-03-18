import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import fs from 'fs'
import path from 'path'
import Billet from '../models/billetModel.js'


//@desc   Uploader une image dans un répertoire
//@route  POST /api/uploads
//@access Public
const uploadFiles = asyncHandler(async(req, res)=>{
  if(req.files !== null){
    const file = req.files.file

    if(fs.existsSync(`${path.resolve()}/frontend/public/images/${file.name}`)){
      res.json({
        problem : `${file.name}`,
        message : `Une image porte déjà le nom ${file.name}. Renommez-la et téléchargez-la dans la partie 'Modifier le produit.'`
      })
    } else {
      file.mv(`${path.resolve()}/frontend/public/images/${file.name}`)
      res.json({
        message : "C'est un succès.",
        problem : "" 
      })
    }
  } else {
   res.json("Aucune photo téléchargée.")
  }
})

//@desc   Uploader une image dans un répertoire
//@route  PUT /api/uploads
//@access Public
const uploadFilesUpdate = asyncHandler(async(req, res)=>{
  if(req.files !== null){
    const file = req.files.file
    if(fs.existsSync(`${path.resolve()}/frontend/public/images/${file.name}`)){
      res.json(null)
    } else {
      file.mv(`${path.resolve()}/frontend/public/images/${file.name}`)
      res.json({
        message : "C'est un succès.",
        problem : "" 
      })
    }
  } else {
    res.json("Aucune photo téléchargée.")
   }
})

//@desc   Supprimer une image d'un répertoire et supprimer l'image dans le produit
//@route  PUT /api/uploads/delete/:productId
//@access Public
const deleteSingleImageProduct = asyncHandler(async(req, res)=>{
  const product = await Product.findById(req.params.productId) 

  if(product){
    let messageErrorDir;
    const pathname = `${path.resolve()}/frontend/public/images/${req.body.imageName}`
    fs.unlinkSync(pathname, (err)=>{
      if(err){
        messageErrorDir ="Photo introuvable dans le répertoire."
      }
    }) 

    const newImageSet = product.images.filter(image=> image !== `../images/${req.body.imageName}`)

    product.images = newImageSet

    await product.save()
    res.json(`L'image a été supprimée.`)

    } else {
    res.status(400)
    throw new Error("Photo introuvable dans le produit. Supprimez le produit et recréez-le.")
  }
  
})

//@desc   Supprimer toutes les images d'un produit par l'id du produit
//@route  DELETE /api/uploads/product/:productId
//@access Public
const deleteAllImagesByproductId = asyncHandler(async(req, res)=>{
  const product = await Product.findById(req.params.productId)

  let pathname='';
  let errorsArray=[];
  let notExistingFiles = [];
  let successsArray=[];
    for (let i=0 ; i<product.images.length; i++){
      if(fs.existsSync(`${path.resolve()}/frontend/public/${product.images[i].slice(3)}`)){
        pathname = `${path.resolve()}/frontend/public/${product.images[i].slice(3)}` 
        fs.unlinkSync(pathname, (err)=>{
          if(err){
            errorsArray.push(`Problème avec l'image ${product.images[i]}.`)
          } else {
            successsArray.push(`L'image nommée ${product.images[i]} a été supprimée.`)
          }
        })  
      } else {
        notExistingFiles.push(`L'image ${product.images[i].slice(3)} n'existe pas.`)
      }
    }
    if(errorsArray.length>0 || notExistingFiles.length>0){
      // res.status(500)
      res.json({errorsArray, notExistingFiles})
    } else {
      // res.status(200)
      res.json('Tout est ok.')
    }
})

//@desc   Lister les nom de fichiers à l'intérieur du répertoire images
//@route  GET /api/uploads/repertoire_images
//@access Public

const getImagesName = asyncHandler(async(req, res)=>{
  fs.readdir(`${path.resolve()}/frontend/public/images`, (err, files)=>{
    if(err){
      res.json("Répertoire inaccessible pour le moment.")
    } else {
      // const arrayName = files.map(file=> )
      res.json(files)
    }
  })
})

//@desc   Supprimer une image d'un répertoire et supprimer l'image dans l'article
//@route  PUT /api/uploads/billet/delete/:billetId
//@access Public
const deleteSingleImageBillet = asyncHandler(async(req, res)=>{
  const billet = await Billet.findById(req.params.billetId) 

  if(billet){
    let messageErrorDir;
    const pathname = `${path.resolve()}/frontend/public/images/${req.body.imageName}`
    fs.unlinkSync(pathname, (err)=>{
      if(err){
        messageErrorDir ="Photo introuvable dans le répertoire."
      }
    }) 

    const newImageSet = billet.photos.filter(photo=> photo.url !== `../images/${req.body.imageName}`)

    billet.photos = newImageSet

    await billet.save()
    res.json(`L'image a été supprimée.`)

    } else {
    res.status(400)
    throw new Error("Photo introuvable dans le billet de blog. Supprimez l'article et recréez-le.")
  }
  
})


//@desc   Supprimer toutes les images d'un billet
//@route  DELETE /api/uploads/:idBillet
//@access Public
const deleteAllImagesByBilletId = asyncHandler(async(req, res)=>{
  const billet = await Billet.findById(req.params.idBillet)

  let pathname='';
  let errorsArray=[];
  let notExistingFiles = [];
  let successsArray=[];
    for (let i=0 ; i<billet.photos.length; i++){
      if(fs.existsSync(`${path.resolve()}/frontend/public/${billet.photos[i].url.slice(3)}`)){
        pathname = `${path.resolve()}/frontend/public/${billet.photos[i].url.slice(3)}` 
        fs.unlinkSync(pathname, (err)=>{
          if(err){
            errorsArray.push(`Problème avec l'image ${billet.photos[i].url}.`)
          } else {
            successsArray.push(`L'image nommée ${billet.photos[i].url} a été supprimée.`)
          }
        })  
      } else {
        notExistingFiles.push(`L'image ${billet.photos[i].url.slice(3)} n'existe pas.`)
      }
    }
    if(errorsArray.length>0 || notExistingFiles.length>0){
      // res.status(500)
      res.json({errorsArray, notExistingFiles})
    } else {
      // res.status(200)
      res.json('Tout est ok.')
    }
})


export {uploadFiles, deleteSingleImageProduct, deleteAllImagesByproductId, getImagesName, deleteSingleImageBillet, uploadFilesUpdate, deleteAllImagesByBilletId}