import React from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import { pageTransition } from '../fonctionsOutils'
import MRComponent from '../components/MRComponent'

const PointRelaisScreen = () => {

  const refreshHandler = ()=>{
    window.location.reload()
  }

  return (
    <Wrapper variants={pageTransition} initial='initial' animate='animate' exit='exit'> 
      <CheckoutSteps step1={true} step2={true}/>
     
      <h2>Choix du point relais</h2>
     
      <MRComponent refreshHandler={()=>refreshHandler()}/>
    </Wrapper>
  )
}

const Wrapper = styled(motion.div)`
  margin : 0 auto;
  display : flex;
  flex-direction: column;
  align-items: center;
  width : 600px;

  h2{
    text-align: center;
    margin: 20px auto;
  }

  .widget-MR{
    width : 605px;
    height : 500px;
    margin : 20px auto;
  }
`

export default PointRelaisScreen
