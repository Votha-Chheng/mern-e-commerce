import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import AdminView from '../components/AdminView'
import UserView from '../components/UserView'
import Loader from '../components/Loader'
import { pageTransition } from '../fonctionsOutils'
import { getUserDetails, updateUserPassword, updateUserProfile, sendEmailValidation } from '../actions/userActions'

const ProfileScreen = () => {

  const [oldPassword, setOldPassword] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [prénom, setPrénom] = useState('')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [modifier, setModifier] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const {loading, error, user} = userDetails

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin

  const userUpdateProfile = useSelector(state=>state.userUpdateProfile)
  const {success} = userUpdateProfile

  const userUpdatePassword =useSelector(state=>state.userUpdatePassword)
  const {successPassword, errorPassword} = userUpdatePassword

  const validationEmail = useSelector(state=>state.validationEmail)
  const {successValidationEmail, message, errorValidationEmail, loadingValidation} = validationEmail


  useEffect(() => {
    if(!userInfo){
      history.push('/')
    } else {
      if(!user.nom) {
        dispatch(getUserDetails('profile'))
      } else {
        setPrénom(user.prénom)
        setNom(user.nom)
        setEmail(user.email)
      }
    }
    
    console.log(user.validateEmail)
  }, [userInfo, user, history, dispatch])

  const submitHandler = (event)=>{
    event.preventDefault()
    dispatch(updateUserProfile( {id : user._id, nom, prénom, email}))
    setModifier(false)
  }

  const submitNewPassword = (event)=>{
    event.preventDefault()
    dispatch(updateUserPassword({id:user._id, oldPassword, motDePasse}))
    setMotDePasse("")
    setOldPassword("")
  }

  const modifierHandler = ()=>{
    setModifier(!modifier)
  }

  const changeHandler = (name, value)=>{
    if(name==='prénom') setPrénom(value)
    if(name==='nom') setNom(value)
    if(name==='email') setEmail(value)
    if(name==='oldPassword') setOldPassword(value)
    if(name==='motDePasse') setMotDePasse(value)
  }

  const sendEmailButton = ()=>{
    dispatch(sendEmailValidation())
  }

  return (
    <motion.div variants={pageTransition} initial='initial' animate='animate' exit='exit'>
      {
        loading? <Loader /> : 
        error? <h4>{error}</h4> : 
        user.isAdmin ? 
        <AdminView 
          
        /> : 
        <UserView 
          submitHandler={(event)=>submitHandler(event)}
          changeHandler={(event)=>changeHandler(event.target.name, event.target.value)}
          nom={nom}
          prénom={prénom}
          email={email}
          oldPassword={oldPassword}
          motDePasse={motDePasse}
          success={success}
          modifier={modifier}
          modifierHandler={modifierHandler}
          validationEmail={user.validateEmail}
          commandes = {user.commandes}
          submitNewPassword={(event)=>submitNewPassword(event)}
          successPassword={successPassword}
          errorPassword={errorPassword}
          sendEmailValidation = {sendEmailButton}
          successValidationEmail = {successValidationEmail}
          errorValidationEmail={errorValidationEmail}
          message={message}
          loadingValidation = {loadingValidation}
        />
      }     
    </motion.div>
  )
}

export default ProfileScreen
