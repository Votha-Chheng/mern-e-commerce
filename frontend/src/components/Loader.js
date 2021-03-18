import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import logo from '../images/logoCavallo.svg'

const Loader = () => {

  const animationLoader = {
    initial : {
      opacity : 0,
    },
    animate: {
      opacity : 1,
      transition :{
        duration : 0.5
      }
    },
    exit : {
      opacity : 0,
      transition :{
        duration : 0.5
      }
      
    }
  }

  return (
    <LoaderDiv>
      <motion.img src={logo} alt='logo' width = '400' variants={animationLoader} initial='initial' animate='animate' exit='exit' exitBeforeEnter />
    </LoaderDiv>
  )
}


const LoaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height : 600px;
  
`

export default Loader
