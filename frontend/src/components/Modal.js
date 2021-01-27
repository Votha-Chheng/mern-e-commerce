import React from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'

const Modal = ({children}) => {

  const modalAnim = {
    start: {y : '300px'},
    end: {y : 0, transition : { duration : 0.5}}
  }


  return (
    <ModalDiv>
      <motion.div variants={modalAnim} initial="start" animate='end' >
        {children}
      </motion.div>
    </ModalDiv>
  )
}

const ModalDiv = styled.div`
  z-index: 80000000000000;
  top: 0px;
  left: 0px;
  position: fixed;
  width: 100%;
  height: 100%;
  display : flex;
  justify-content: center;
  background-color : rgba(0,0,0,0.5);
  padding : 20px;
  
  div{
    background-color : white;
  }
`

export default Modal
