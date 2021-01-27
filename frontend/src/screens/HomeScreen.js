import { motion } from 'framer-motion'
import React from 'react'
import Home from '../components/Home'
import HomeCarousel from '../components/HomeCarousel'
import HomeProducts from '../components/HomeProducts'
import { pageTransition } from '../fonctionsOutils'


const HomeScreen = () => {

  return (
    <motion.div variants={pageTransition} animate='animate' exit='exit'>
      <Home/>
      <HomeProducts/>
      <HomeCarousel/>
    </motion.div>
  )
}

export default HomeScreen
