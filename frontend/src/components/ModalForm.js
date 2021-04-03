import React from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import LoginRegisterForm from './LoginRegisterForm'
import { useDispatch, useSelector } from 'react-redux'
import { loginModalClose } from '../actions/loginModalAction'

const ModalForm = () => {

  const dispatch = useDispatch()

  const {showModalLogin} = useSelector(state=>state.showModalLogin)

  
  const modalAnim = {
    start: {y : '300px'},
    end: {y : 0, transition : { duration : 0.5}}
  }

  return (
    
    <FormDiv style={showModalLogin ? {overflowY : 'hidden', overflowX : 'hidden'}: ""}>
      <motion.div className='conteneur' variants={modalAnim} initial='start' animate='end' >
        <div className='frame-modal' >
          <i className="fas fa-times-circle close" onClick={()=> dispatch(loginModalClose())} />
          <LoginRegisterForm />
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
