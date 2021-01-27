import asyncHandler from 'express-async-handler'
import {v4 as uuid} from 'uuid'
import User from '../models/userModel.js'
import SecretCode from '../models/secretCodeModel.js'
import generateToken from '../helpersBackend/generateToken.js'
import { sendEmail } from '../sendEmail.js'



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
      commandes : user.commandes,
      token : generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Mot de passe ou e-mail invalide.')
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

  const secretCode = await SecretCode.create({
    email,
    code:uuid(),
  })


  const options={
    email : user.email,
    subject : "Valider votre compte.",
    message : `<p>Veuillez cliquez sur ce lien pour valider la création de votre compte : <a href='${req.protocol}://localhost:3000/validationemail/${user._id}/${secretCode.code}'>${req.protocol}://localhost:3000/validationemail/${user._id}/${secretCode.code}</a></p><p>Les Luminaires Cavallo</p>` 
  }
  
  await sendEmail(options)

  if(user && secretCode){
    res.status(201).json({
      _id : user._id,
      nom : user.nom,
      prénom : user.prénom,
      isAdmin : user.isAdmin,
      email : user.email,
      validationEmail : false,
      token : generateToken(user._id),
      
    })

  } else {
    res.status(400)
    throw new Error('Informations invalides.')
  }
  
})

//@desc   Send validation email to user
//@route  GET /api/users/validation/:token
//@access Private
const sendValidationEmail = asyncHandler(async(req, res)=>{
  const user = await User.findById(req.user._id)

  const secretCodeUser = await SecretCode.create({
    email : user.email,
    code : uuid()
  })

  if(user && secretCodeUser){
    const options={
      email : user.email,
      subject : "Valider votre compte.",
      message : `<p>Veuillez cliquez sur ce lien pour valider la création de votre compte : <a href='${req.protocol}://localhost:3000/validationemail/${user._id}/${secretCodeUser.code}'>${req.protocol}://localhost:3000/validationemail/${user._id}/${secretCodeUser.code}</a></p><p>Les Luminaires Cavallo</p>` 
    }
    
    await sendEmail(options)
    res.json({
      message : `E-mail envoyé à cette adresse e-mail : ${user.email}`
    })
  } else {
    res.status(401)
    throw new Error(`L'email de validation n'est valable que durant 10 minutes après son envoi. Veuillez demander un autre envoi d'email de validation`)
  }
})

//@desc   Validate email user
//@route  GET /api/users/confirmation/:userId/:code
//@access Private
const validateEmail = asyncHandler(async(req, res)=>{
  const user = await User.findById(req.params.userId)

  const secretCode = await SecretCode.find({code : req.params.secretCode, email : user.email})

  if(user && secretCode){
    user.validationEmail = true

    await user.save()

    res.json({
      validationEmail : true,
      message : 'Votre adresse e-mail a été validée. Bonne navigation !'
    })
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
        validateEmail : user.validationEmail
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
    user.email = req.body.email || user.email
    
    const updateUser = await user.save()

    res.json(
      {
        _id : updateUser._id,
        nom :  updateUser.nom,
        prénom : updateUser.prénom,
        email : updateUser.email,
        token: generateToken(updateUser._id)
      }
     )

  } else {
    res.status(404)
    throw new Error('Modification non-effectuée.')
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
    throw new Error('Modification impossible')
  }

})

export {authUsers, getUserProfile, registerUser, updateUserProfile, updateUserPassword, sendValidationEmail, validateEmail}