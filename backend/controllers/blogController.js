import asyncHandler from 'express-async-handler'
import Billet from '../models/billetModel.js'
import User from '../models/userModel.js'

//@desc   Créer un billet de blog
//@route  POST /api/billets
//@access Private
const createBlogArticle = asyncHandler(async(req, res)=>{
  const user = await User.findById(req.user._id)

  if(user.isAdmin){
    const newArticle = new Billet({
      titre : req.body.titre,
      sousTitre :req.body.sousTitre,
      texte : req.body.texte,
      photos : req.body.photos,
      displayPhotos : req.body.displayPhotos,
    })

    const articleCreated = await newArticle.save()

    res.json(articleCreated)

  } else {
    res.status(404).json({message : "Un problème serveur empêche la création d'un nouvel article. Veuillez essayer plus tard."})
  }
})

//@desc   Accéder à tous les billets
//@route  GET /api/billets
//@access public
const getAllBlogArticles = asyncHandler(async(req, res)=>{

  const allBlogArticles = await Billet.find({})
  if(allBlogArticles){

  res.json(allBlogArticles)

  } else {
    res.status(404).json({message : "Un problème serveur empêche d'accéder à tous les billets du blog."})
  }
})

//@desc   Accéder à un billet par son ID
//@route  GET /api/billets/:idBillet
//@access public
const getBlogArticleById = asyncHandler(async(req, res)=>{

  const blogArticle = await Billet.findById(req.params.idBillet)
  if(blogArticle){

  res.json(blogArticle)

  } else {
    res.status(404).json({message : "Un problème serveur empêche d'accéder à ce billet du blog."})
  }
})

//@desc   Accéder à tous les billets
//@route  put /api/billets/:idBillet
//@access private
const updateArticle = asyncHandler(async(req, res)=>{
  
  const articleToUpdate = await Billet.findById(req.params.idBillet)

  const user = await User.findById(req.user._id)
  
  if(articleToUpdate && user.isAdmin){
    articleToUpdate.titre = req.body.titre||articleToUpdate.titre
    articleToUpdate.sousTitre = req.body.sousTitre || articleToUpdate.sousTitre
    articleToUpdate.texte = req.body.texte || articleToUpdate.texte
    articleToUpdate.photos = req.body.photos || articleToUpdate.photos
    articleToUpdate.displayPhotos = req.body.displayPhotos || articleToUpdate.displayPhotos

    const updatedArticle = await articleToUpdate.save()

    res.json(updatedArticle)

  } else {
    res.status(401)
    throw new Error('Modification échouée. Veuillez recommencer l`\'opération.')
  }
})

//@desc   Récupère un seul produit
//@route  DELETE /api/billets/:idBillet
//@access Private
const deleteArticle = asyncHandler(async(req, res)=>{
  const billet = await Billet.findById(req.params.idBillet)

  const user = await User.findById(req.user._id)

  if(billet && user.isAdmin) {
    await billet.remove()
    res.json({message : "Billet supprimé."})
  } else {
    res.status(404).json({message : 'Billet introuvable.'})
  }
})

export {createBlogArticle, getAllBlogArticles, getBlogArticleById, updateArticle, deleteArticle}