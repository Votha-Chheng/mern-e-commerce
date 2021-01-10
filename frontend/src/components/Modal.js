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

  div{
    max-width :900px;
    max-height :900px;
    background-color : white;
    display :flex;
    justify-content:center;
    align-items:center;
    position :relative;
  }
  
`

export default Modal
