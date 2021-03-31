import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'


//@desc   Récupère tous les produits
//@route  GET /api/products
//@access Public
const getProducts = asyncHandler(async(req, res)=>{
  const products = await Product.find({})

  res.json(products)
})


//@desc   Récupère un seul produit
//@route  GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async(req, res)=>{
  const product = await Product.findById(req.params.id)

  if(product) {
    res.json(product)
  } else {
    res.status(404).json({message : 'Produit introuvable.'})
  }
})

//@desc   Update product info as an admin
//@route  PUT /api/products/admin/:productId
//@access Private
const updateProductInfo = asyncHandler(async(req, res)=>{

  const user = await  User.findById(req.user._id)
  
  const product = await Product.findById(req.params.productId)

  if(user.isAdmin){
    product.nom = req.body.nom || product.nom
    product.catégorie = req.body.catégorie || product.catégorie
    product.prix = req.body.prix || product.prix
    product.stock = req.body.stock || product.stock
    product.description = req.body.description || product.description
    product.couleurs = req.body.couleurs || product.couleurs
    product.livraison = req.body.livraison || product.livraison

    const updatedProduct = await product.save()

    res.json({
      message : "Infos du produit modifié",
      _id : updatedProduct._id,
      nom :  updatedProduct.nom,
      catégorie : updatedProduct.catégorie,
      prix : updatedProduct.prix,
      stock : updatedProduct.stock,
      description : updatedProduct.description,
      couleurs : product.couleurs,
      livraison : product.livraison,

    })
  
  } else {
    res.status(401)
    throw new Error('Modification échouée. Veuillez recommencer l`\'opération.')
  }
})

//@desc   Update product info as an admin
//@route  PUT /api/products/admin/images/:productId
//@access Private
const updateImagesProductInfo = asyncHandler(async(req, res)=>{

  const user = await  User.findById(req.user._id)
  
  const product = await Product.findById(req.params.productId)

  if(user.isAdmin){
    product.images = req.body.images || product.images

    const updatedProduct = await product.save()

    res.json({
      message : "Images du produit mises à jour.",
      images : updatedProduct.images
    })
  
  } else {
    res.status(401)
    throw new Error('Modification échouée. Veuillez recommencer l`\'opération.')
  }
})


//@desc   Ajouter un produit
//@route  post /api/products/admin
//@access Private
const createProduct = asyncHandler(async(req, res)=>{
  const user = await  User.findById(req.user._id)

  if(user.isAdmin) {
    const newProduct = new Product({
      nom : req.body.nom,
      catégorie : req.body.catégorie,
      prix : req.body.prix,
      stock : req.body.stock,
      description : req.body.description,
      couleurs : req.body.couleurs,
      livraison : req.body.livraison,
      images : req.body.images
    })

    const productCreated = await newProduct.save()

    res.json(productCreated) 

  } else {
    res.status(404).json({message : "Un problème serveur empêche la création d'un nouveau produit. Essayez plus tard."})
  }
})

//@desc   Récupère un seul produit
//@route  DELETE /api/products/admin/:productId
//@access Private
const deleteProduct = asyncHandler(async(req, res)=>{
  const product = await Product.findById(req.params.productId)

  const user = await User.findById(req.user._id)

  if(product && user.isAdmin) {
    await product.remove()
    res.json({message : "Produit supprimé."})
  } else {
    res.status(404).json({message : 'Produit introuvable.'})
  }
})

//@desc   Update product stock info. 
//        req.body.order = [{_id : value, qty : value}]
//@route  PUT /api/products/stock
//@access Private
const updateProductStock = asyncHandler(async(req, res)=>{
  let err = [], success=[]
  for (let i=0 ; i<req.body.orderBody.length ; i++){
    let product = await Product.findById(req.body.orderBody[i]._id)
    if(product){
      product.stock -= req.body.orderBody[i].qty
      await product.save()
      success.push('success')
    } else {
      err.push('error')
    }
  }
  if(success.length === req.body.orderBody.length){
    res.json("Le stock a été modifié.")
  } else {
    throw new Error(`La mise à jour du stock des produits a échoué.`)
  }
  
})

export {getProducts, getProductById, updateProductInfo, createProduct, deleteProduct, updateImagesProductInfo, updateProductStock}