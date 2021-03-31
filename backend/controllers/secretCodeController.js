import asyncHandler from 'express-async-handler'
import SecretCode from '../models/secretCodeModel.js'
import {v4 as uuid} from 'uuid'

//@desc   Créer un code secret pour un email quand on s'inscrit
//@route  POST /api/secretCode
//@access Public
const createSecretCodeRegister = asyncHandler(async(req, res)=>{

  const secretCode = await SecretCode.findOne({emailCode : req.body.email})

  if(secretCode){
    res.status(400)
    throw new Error('Vous avez déjà reçu un e-mail de validation dans votre boîte mail.')
  }

  if(!secretCode){   
    const secretCodeCreated = await SecretCode.create({
      emailCode : req.body.email,
      code : uuid(),
      dateCreated : Date.now()
    })

    res.json(secretCodeCreated)

  } else {
    res.status(400).json(
      "Erreur du serveur pour trouver des nformations"
    )
  }
})


export {createSecretCodeRegister}