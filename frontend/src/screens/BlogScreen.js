import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import { pageTransition } from '../fonctionsOutils'

const BlogScreen = () => {
  return (
    <motion.div variants={pageTransition} initial='initial' animate='animate' exit='exit' >
      <h2>Blog</h2>
    </motion.div>
  )
}

const Wrapper = styled.div`
  
`

export default BlogScreen
