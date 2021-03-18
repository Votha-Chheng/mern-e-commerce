import React, { useCallback, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {motion} from 'framer-motion'
import {pageTransition} from '../fonctionsOutils'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { validateUserEmail } from '../actions/userActions'
import LoaderSpin from '../components/LoaderSpin'
import ModalForm from '../components/ModalForm'
import { loginModal } from '../actions/loginModalAction'


const ValidationScreen = () => {

  const dispatch = useDispatch()

  const {location : pathname} = useHistory()

  const userEmailValidate = useSelector(state => state.userEmailValidate)
  const {loadingValidateUserEmail, successValidateUserEmail, errorValidateUserEmail, message} = userEmailValidate
  const {userInfo} = useSelector(state=>state.userLogin)

  const {showModalLogin} = useSelector(state=>state.showModalLogin)

  //Si successValidateUserEmail est false &&  action = POP retourner à l'accueil

  useEffect(() => {
    const query = pathname.pathname.slice(17).split('&')
    const userId = query[0]
    const code = query[1]
    dispatch(validateUserEmail(userId, code))
  }, [dispatch, pathname])


  const clickCompte =  useCallback(()=>{
    window.scrollTo(0,0)
    dispatch(loginModal())
  },[dispatch])

  return (
    <motion.div variants={pageTransition} initial='initial' animate='animate' exit='exit' >
      { showModalLogin && <ModalForm closeModal={()=>dispatch(loginModal())} showModalLogin={showModalLogin} />}
      {
        loadingValidateUserEmail ? <LoaderSpin/> :
        errorValidateUserEmail ? <H2 className='alert-danger'>{errorValidateUserEmail}</H2> :
        successValidateUserEmail ? <H2 className='alert-success'>{message}</H2> : null
      }

      {!userInfo && <div className='text-center'><span className='h4'>Cliquez ici pour vous connecter à votre compte : <Link onClick={()=>clickCompte()}>connexion</Link></span></div>}
    </motion.div>
  )
}

const H2 = styled.p`
  margin : 90px auto;
  text-align :center;
  font-size : 2em;

`
export default ValidationScreen
