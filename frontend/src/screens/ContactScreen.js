import axios from 'axios'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import LoaderSpin from '../components/LoaderSpin'
import { pageTransition } from '../fonctionsOutils'

const ContactScreen = () => {

  const [email, setEmail] = useState('')
  const [sujet, setSujet] = useState('Renseignement sur un produit')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')


  const {userInfo} = useSelector(state => state.userLogin)

  useEffect(()=>{
    if(userInfo){
      setEmail(userInfo.email)
    }
  }, [userInfo])

  const submitHandler = async (event)=>{
    event.preventDefault()

    try{
      setLoading(true)

      const {data} = await axios
        .post('/api/users/contact', 
        {
          email : email,
          subject : sujet,
          message : message,
          dateCreated : Date.now()
        }
      )
      if(data){
        setSuccessMessage(data)
        setLoading(false)
      }
      

    } catch (err) {

      setErrorMessage(err)
      setLoading(false)

    }
  }

  return (
    <Wrapper variants={pageTransition} initial='initial' animate='animate' exit='exit'>
      <h2 className='text-center my-5'>Me contacter</h2>

      {
        loading ? <LoaderSpin/> :
        errorMessage ? <div className='alert-danger h4 p-2'>Une erreur du serveur est survenue. Pour éviter le spamming, vous ne pouvez pas envoyer plus de trois e-mails toutes les 10 minutes. Veuillez attendre.</div> :
        successMessage ? <div className='alert-success h4 text-center'>{successMessage}</div> :
        <>
          <div className='email-container'>
          { 
            !userInfo &&
            <div className='adresse'>
              <label htmlFor='email'>Votre adresse e-mail</label>
              <input id='email' type='email' value={email} onChange={(event)=>setEmail(event.target.value)} required/>
            </div>
          }
          <div className='sujet'>
            <label htmlFor='sujet'>Sélectionnez le sujet de votre e-mail</label>
            <select id='sujet' value={sujet} onChange={(event)=>setSujet(event.target.value)}>
              <option value='Renseignement sur un produit'>Renseignement sur un produit</option>
              <option value="Renseignement relatif à la livraison d'un produit">Renseignement relatif à la livraison d'un produit</option>
              <option value='Information pour une lampe à faire sur mesure'>Information pour une lampe à faire sur mesure</option>
              <option value='Autres'>Autres...</option>
            </select>
          </div>
          <div className='message'>
            <label htmlFor='message'>Votre message</label>
            <textarea type='text' id='message' value={message} onChange={(event)=>setMessage(event.target.value)} required/>
          </div>
          </div>
          <button className='btn btn-primary btn-block mt-2' onClick={(event)=>submitHandler(event)} >Envoyer votre message</button>
        </>
      }

      
      
    </Wrapper>
  )
}

const Wrapper = styled(motion.div)`
  width : 600px;
  margin : auto;

  .email-container{
    width : 100%;
    display : flex;
    flex-direction : column;
    align-items : flex-start;

    .adresse,.sujet{
      display : flex;
      flex-direction : column;
      margin-top : 20px;

      input {
        width : 600px;
      }
    }

    .sujet{
      select{
        width : 600px;
      }
    }

    .message{
      display : flex;
      flex-direction : column;

      label{
        margin-top : 20px;
      }
      textarea {
        width : 600px;
        height : 300px;
        padding : 5px
      }
    }
  }
`

export default ContactScreen
