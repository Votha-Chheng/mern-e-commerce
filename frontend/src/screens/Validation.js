import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {motion} from 'framer-motion'
import {pageTransition} from '../fonctionsOutils'
import styled from 'styled-components'


const Validation = () => {

  const[message, setMessage] = useState('')

  const {userId, secretCode} = useParams()

  const validate = useCallback(async ()=>{
    try{
      const {data} = await axios.get(`/api/users/confirmation/${userId}/${secretCode}`)
      const {message} = data

      console.log(message)
      setMessage(message)

    } catch (error){
      setMessage(error)
    }
  }, [userId, secretCode]) 

  useEffect(() => {
    validate() 
  }, [validate])

  

  return (
    <motion.div variants={pageTransition} initial='initial' animate='animate' exit='exit' >
      <H2>{message}</H2>
    </motion.div>
  )
}

const H2=styled.h2`
  margin : 90px auto;
  text-align :center;
`
export default Validation
