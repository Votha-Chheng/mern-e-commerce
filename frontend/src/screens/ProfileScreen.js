import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import AdminView from '../components/AdminView'
import UserView from '../components/UserView'
import { pageTransition } from '../fonctionsOutils'

const ProfileScreen = () => {

  const history = useHistory()

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin

  useEffect(() => {
    if(!userInfo){
      history.push('/')
    }
  }, [userInfo, history])

  return (
    <motion.div variants={pageTransition} initial='initial' animate='animate' exit='exit'>
      {
        userInfo && userInfo.isAdmin ? 
        <AdminView /> : 
        <UserView />
      }     
    </motion.div>
  )
}

export default ProfileScreen
