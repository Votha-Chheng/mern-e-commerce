import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import LoginRegisterForm from './LoginRegisterForm'
import { useDispatch, useSelector } from 'react-redux'
import { login, register } from '../actions/userActions'
import { loginModalClose } from '../actions/loginModalAction'
// import { useHistory, useLocation } from 'react-router-dom'

const ModalForm = ({closeModal}) => {

  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')

  const [emailRegister, setEmailRegister] = useState('')
  const [motDePasseRegister, setMotDePasseRegister] = useState('')
  const [motDePasseConfirmRegister, setMotDePasseConfirmRegister] =useState('')
  const [nomRegister, setNomRegister] = useState('')
  const [prénomRegister, setPrénomRegister] = useState('')
  const [messageMatchPassword, setMessageMatchPassword] =useState('')

  const dispatch = useDispatch()

  const {showModalLogin} = useSelector(state=>state.showModalLogin)
  const {userInfo, errorLogin, loadingLogin, successLogin} = useSelector(state=>state.userLogin)
  const userRegister = useSelector(state=>state.userRegister)
  const {errorRegister, successRegister, userInfoRegister} = userRegister



  const submitHandler = (event)=>{
    event.preventDefault()
    dispatch(login(email, motDePasse))
  }

  const submitRegisterHandler = (event)=>{
    event.preventDefault()
    if(motDePasseRegister===motDePasseConfirmRegister){
      setMessageMatchPassword('')
      dispatch(register(nomRegister,prénomRegister, emailRegister, motDePasseRegister))
    } else {
      setMessageMatchPassword('Les deux mots de passe sont différents.')
    }
    
  }

  const onChangeFormHandler=(name, value)=>{
    if(name==='motDePasse'){
      setMotDePasse(value)
    }
    if(name==='email'){
      setEmail(value)
    }
    if(name==='motDePasseConfirmRegister'){
      setMotDePasseConfirmRegister(value)
    }
    if(name==='emailRegister'){
      setEmailRegister(value)
    }
    if(name==='motDePasseRegister'){
      setMotDePasseRegister(value)
    }
    if(name==='nomRegister'){
      setNomRegister(value)
    }
    if(name==='prénomRegister'){
      setPrénomRegister(value)
    }
  }

  useEffect(()=>{
    if(successLogin){
      dispatch(loginModalClose())
    }
  }, [successLogin, dispatch, showModalLogin])

  const clickLogin = (emailUser, password)=>{
    dispatch(login(emailUser, password))
    
  }
  


  const modalAnim = {
    start: {y : '300px'},
    end: {y : 0, transition : { duration : 0.5}}
  }

  return (
    
    <FormDiv style={showModalLogin ? {overflowY : 'hidden', overflowX : 'hidden'}: ""}>
      <motion.div className='conteneur' variants={modalAnim} initial='start' animate='end' >
        <div className='frame-modal' >
          <i className="fas fa-times-circle close" onClick={successRegister?()=> clickLogin(emailRegister, motDePasseRegister) : closeModal} />
          <LoginRegisterForm 
            email={email} 
            motDePasse={motDePasse} 
            errorLogin={errorLogin}
            errorRegister={errorRegister}
            successRegister={successRegister}
            emailRegister={emailRegister}
            motDePasseRegister={motDePasseRegister}
            motDePasseConfirmRegister = {motDePasseConfirmRegister}
            messageMatchPassword={messageMatchPassword}
            nomRegister={nomRegister}
            prénomRegister={prénomRegister}
            userInfo={userInfo}
            userInfoRegister={userInfoRegister}
            loadingRegister = {userRegister.loadingRegister}
            loadingLogin={loadingLogin}
            submitHandler={submitHandler} 
            submitRegisterHandler={submitRegisterHandler}
            onChangeFormHandler={(event)=>onChangeFormHandler(event.target.name, event.target.value)} />
        </div>
      </motion.div>
    </FormDiv>
  )
}

const FormDiv = styled.div`
  z-index: 9990000000;
  top: 0px;
  left: 0px;
  position: fixed;
  width: 100%;
  height: 100%;
  display : flex;
  justify-content: center;
  background-color : rgba(0,0,0,0.5);
  padding : 20px;
  
  .conteneur{
    z-index: 10000000;
    .frame-modal{
      max-width :900px;
      margin : 50px auto;
      background-color : blue;
      display :flex;
      justify-content:center;
      align-items:center;
      position :relative;
      .close{
        position: absolute;
        top: 10px;
        right: 10px;
        color : black;
        cursor: pointer;
        transform: scale(1.5)
      }
    }
  }

  
`
export default ModalForm
