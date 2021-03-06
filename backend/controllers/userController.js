import asyncHandler from 'express-async-handler'
import {v4 as uuid} from 'uuid'
import User from '../models/userModel.js'
import SecretCode from '../models/secretCodeModel.js'
import generateToken from '../helpersBackend/generateToken.js'
import { sendEmail, sendEmailContactMe } from '../sendEmail.js'
import Order from '../models/orderModel.js'

//@desc   Auth user & get token
//@route  POST /api/users/login
//@access Public
const authUsers = asyncHandler(async(req, res)=>{
  const {email, motDePasse} = req.body

  const user = await User.findOne({email})

  if(user && await user.matchPassword(motDePasse)){
    res.json({
      _id : user._id,
      nom : user.nom,
      prénom : user.prénom,
      isAdmin : user.isAdmin,
      email : user.email,
      validationEmail : user.validationEmail,
      adresse : user.adresse,
      token : generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Mot de passe ou e-mail invalide.')
  }
})

//@desc   Send validation email to user
//@route  get /api/users/validation
//@access Private
const sendValidationEmail = asyncHandler(async(req, res)=>{
  const user = await User.findById(req.user._id)

  if(!user){
    res.status(401)
    throw new Error(`Un problème sur le serveur est survenu. Veuillez réessayer plus tard.`)
  } 

  const secretCodeUser = await SecretCode.findOne({
    emailCode : user.email,
  })

  if(user && secretCodeUser){
    const options={
      email : user.email,
      subject : "Valider votre compte.",
      message : `<p>Veuillez cliquez sur ce lien pour valider la création de votre compte : <a href='${req.protocol}://luminairescavallo.herokuapp.com/validationemail/${user._id}&${secretCodeUser.code}'>${req.protocol}://luminairescavallo.herokuapp.com/validationemail/${user._id}&${secretCodeUser.code}</a></p><p>Les Luminaires Cavallo</p>` 
    }
    
    await sendEmail(options)

    res.json({
      message : `E-mail envoyé à cette adresse e-mail : ${user.email}.`
    })
  } else {
    res.status(401)
    throw new Error(`L'email de validation n'est valable que 10 minutes. Veuillez demander un autre envoi d'email de validation dans votre profil utilisateur.`)
  }
})

//@desc   Register anew user
//@route  POST /api/users
//@access Public
const registerUser = asyncHandler(async(req, res)=>{
  const {nom, prénom, email, motDePasse} = req.body
  const userExists = await User.findOne({email})
  if(userExists){
    res.status(400)
    throw new Error('Cette adresse e-mail est déjà utilisée.')
  } 
  const user = await User.create({
    nom, 
    prénom,
    email,
    motDePasse
  })

  if(user){
    res.status(201).json({
      _id : user._id,
      nom : user.nom,
      prénom : user.prénom,
      isAdmin : user.isAdmin,
      email : user.email,
      validationEmail : false,
      adresse : user.adresse,
      token : generateToken(user._id), 
    })
  } else {
    res.status(400)
    throw new Error('Informations invalides.')
  } 
})


//@desc   Send email to me written by user
//@route  POST /api/users/contact
//@access Private
const sendEmailContact = asyncHandler(async(req, res)=>{
  //Ckeck si l'adresse est dans la base de données des envoyeurs.
  const adresseEmail = await SecretCode.findOne({emailCode : req.body.email})

  //Si cette adresse existe déjà, on lui rajoute +1 aux messages envoyés
  if(adresseEmail && adresseEmail.numberEmailSent<=3){

      const options={
        from : req.body.email,
        email : process.env.PERSONAL_EMAIL,
        subject : req.body.subject,
        message : `<p>Message de ${req.body.email}</p><p>${req.body.message}</p>` 
      }

      await sendEmailContactMe(options)

      adresseEmail.numberEmailSent = adresseEmail.numberEmailSent+1
      
      await adresseEmail.save()

      res.json(
        "Message envoyé."
      )

    } else if(!adresseEmail){

    const adresseEmailCreated = await SecretCode.create({
      emailCode : req.body.email,
      code : uuid(),
      dateCreated : Date.now()
    })
    
    const options={
      email : process.env.PERSONAL_EMAIL,
      from : req.body.email,
      subject : req.body.subject,
      message : `<p>Message de ${req.body.email}</p><br/><p>${req.body.message}</p>` 
    }

    await sendEmailContactMe(options)

    adresseEmailCreated.numberEmailSent = 1

    await adresseEmailCreated.save()

    res.json(
      "Message envoyé."
    )
  } else {
    res.status(401)
    throw new Error(`Pour éviter le spamming, vous ne pouvez pas envoyer plus de trois e-mails toutes les 10 minutes. Veuillez attendre.`)
  }
})

//@desc   Validate email user
//@route  GET /api/users/confirmation?userId=valueUserId&code=valueCode
//@access Private
const validateEmail = asyncHandler(async(req, res)=>{
  const user = await User.findById(req.query.userId)

  const secretCode = await SecretCode.findOne({emailCode : user.email, code : req.query.code})

  if(user && secretCode){
    user.validationEmail = true

    await user.save()

    res.status(201).json(
      `Le compte associé à l'e-mail ${user.email} a été validé !`
    )
  } else {
    res.status(404)
    throw new Error('Validation impossible, connectez-vous à votre compte.')
  }
  
})

//@desc   Get user profile
//@route  GET /api/users/:id
//@access Private
const getUserProfile = asyncHandler(async(req, res)=>{

  const user = await User.findById(req.user._id)

  if(user){
    res.json(
      {
        _id : user._id,
        nom : user.nom,
        prénom : user.prénom,
        isAdmin : user.isAdmin,
        email : user.email,
        validationEmail : user.validationEmail,
        adresse : user.adresse,
        commandes : user.commandes
      }
     )
  } else {
    res.status(404)
    throw new Error('Utilisateur introuvable')
  }

})

//@desc   Update user profile
//@route  PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async(req, res)=>{

  const user = await User.findById(req.user._id)

  if(user){
    user.nom = req.body.nom || user.nom,
    user.prénom = req.body.prénom || user.prénom,
    user.adresse.adresse = req.body.adresse || user.adresse.adresse,
    user.adresse.codePostal = req.body.codePostal || user.adresse.codePostal
    user.adresse.ville = req.body.ville || user.adresse.ville

    user.adresse = {
      adresse : user.adresse.adresse || user.adresse.adresse,
      codePostal : req.body.codePostal || user.adresse.codePostal,
      ville : req.body.ville || user.adresse.ville
    }

    if(req.body.email !== user.email){
      user.email = req.body.email
      user.validateEmail = false
    }
    
    const updateUser = await user.save()

    res.json(
      {
        _id : updateUser._id,
        nom :  updateUser.nom,
        prénom : updateUser.prénom,
        email : updateUser.email,
        adresse : updateUser.adresse,
        token: generateToken(updateUser._id)
      }
     )

  } else {
    res.status(404)
    throw new Error("Modification non-effectuée. L'adresse e-mail est peut-être déjà utilisée.")
  }

})

//@desc   Update user password
//@route  PUT /api/users/password
//@access Private
const updateUserPassword = asyncHandler(async(req, res)=>{
  
  const user = await User.findById(req.user._id)

  if(user && await user.matchPassword(req.body.oldPassword)){

    user.motDePasse = req.body.motDePasse

    await user.save()

    res.json({message : "Mot de passe modifié."})
  
  } else {
    res.status(401)
    throw new Error('Modification impossible. Vérifiez bien votre mot de passe actuel.')
  }

})

//@desc   Update user adress
//@route  PUT /api/users/address
//@access Private
const updateUserAddress = asyncHandler(async(req, res)=>{
  
  const user = await User.findById(req.user._id)

  if(user){
    user.adresse = {
      adresse : req.body.adresse,
      codePostal : req.body.codePostal,
      ville : req.body.ville
    }

    await user.save()

    res.json({message : "Adresse enregistrée"})
  
  } else {
    res.status(401)
    throw new Error('Une erreur serveur est survenue. Veuillez recommencer l`\'opération.')
  }

})

//@desc   Update user orders
//@route  PUT /api/users/orders
//@access Private
const updateUserOrders = asyncHandler(async(req, res)=>{
  
  const commandes = await Order.find({client : req.user._id})
  const user = await User.findById(req.user._id)

  if(user){
    user.commandes = commandes

    await user.save()

    res.json({message : "Profil mis à jour."})
  
  } else {
    res.status(401)
    throw new Error('Une erreur serveur est survenue. Veuillez recommencer l`\'opération.')
  }

})

//@desc   Get users list
//@route  GET /api/users/admin
//@access Private
const getUsersList = asyncHandler(async(req, res)=>{

  const user = await User.findById(req.user._id)

  if(user.isAdmin){

    const usersList = await User.find()

    res.json(usersList)
  } else {
    res.status(404)
    throw new Error("Vous n'êtes pas administateur du site.")
  }

})


export {authUsers, getUserProfile, registerUser, updateUserProfile, updateUserPassword, sendValidationEmail, validateEmail, updateUserAddress, updateUserOrders, getUsersList, sendEmailContact}