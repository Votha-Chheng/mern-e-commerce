import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'

import Separateur from '../components/Separateur'
import { pageTransition } from '../fonctionsOutils'
import { getAllArticles } from '../actions/blogActions'
import LoaderSpin from '../components/LoaderSpin'
import BlogCard from '../components/BlogCard'
import { Link } from 'react-router-dom'

const BlogScreen = () => {

  const dispatch = useDispatch()

  const {articles, loadingAllArticles, errorAllArticles} = useSelector(state => state.allArticles)

  useEffect(()=>{
    dispatch(getAllArticles())
  }, [dispatch])

  const shapeAnimation = {
    initial : {
      opacity : 1
    },
    animate : {
      opacity : 1,
      transition : {
        delay : 1,
        delayChildren : 2, 
        staggerChildren : 0.3
      }
    }
  }

  const shapeTranslation3 = {
    initial: {
      y : 80,
      x:-100,
    },
    animate : {
      y:-20,
      x:180,
      transition : {
        duration : 4
      }
    }
  }
  const shapeTranslation2 = {
    initial: {
      y : -300,
      x:-180,
    },
    animate : {
      y:-20,
      x:180,
      transition : {
        duration : 3
      }
    }
  }
  const shapeTranslation1 = {
    initial: {
      y : -300,
      x: 180,
    },
    animate : {
      y:-20,
      x:180,
      transition : {
        duration : 2
      }
    }
  }

  return (
    <Wrapper variants={pageTransition} initial='initial' animate='animate' exit='exit' >
      <div className="hero">

      </div>
      <div className='title-wrap'>
        <div className='title'>
          <motion.div variants={shapeAnimation} initial='initial' animate='animate' className='shape'>
            <motion.div variants={shapeTranslation1} className='sheet-1'></motion.div>
            <motion.div variants={shapeTranslation2}  className='sheet-2'></motion.div>
            <motion.div variants={shapeTranslation3} className='sheet-3'></motion.div>
          </motion.div>
          <h2>Blog</h2> 
        </div>
        <Separateur/>
      </div>

      <div className='container-blog'>
        <nav className='container-nav'>
          <h5>Les articles par titre</h5>
          <ul>
            {
              errorAllArticles ? <div>{errorAllArticles}</div>:
              loadingAllArticles ? <LoaderSpin/> : 
              articles && articles.reverse().map((billet, index)=>
                <Link key={index} to={`/blog/${billet._id}`} style={{ textDecoration: 'none' }}><li>{billet.titre}</li></Link>
              )
            }    
          </ul>
        </nav>
        <main className='container-articles'>
          {
            errorAllArticles ? <div>{errorAllArticles}</div>:
            loadingAllArticles ? <LoaderSpin/> :
            articles && 
            articles.map((billet, index)=>
              <div key={index} className='cardblog-container'>
                <BlogCard billet={billet} loading={loadingAllArticles} />
              </div> 
            )
          } 
        </main>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled(motion.div)`
  width: 100%;
  position : relative;

  .hero{
    position: absolute;
    width: 100%;
    height: 150px;
    background-color : #EAF0CE;
    z-index:-1;
  }
  .title-wrap{
    z-index : 2;
    height: 150px;
    padding : 20px 0px;
    margin-bottom: 50px;
    overflow: hidden;
    
    .title{
      position: relative;
      width : 200px;
      margin : 0 auto;

      h2 {
      text-align: center;
      margin: 50px auto -20px auto;
      z-index: 50;
      }

      .sheet-1{
        width : 75px;
        height : 150px;
        background-color : #c89b7b;
        z-index : -1;
        position: absolute;
        border : 2px solid white;
      }
      .sheet-2{
        width : 75px;
        height : 150px;
        background-color : #bcc8c8;
        z-index : -1;
        position: absolute;
        border : 2px solid white;
        top : 15px;
        left : -10px;
      }
      .sheet-3{
        width : 75px;
        height : 150px;
        background-color : #ffddad;
        z-index : -1;
        position: absolute;
        border : 2px solid white;
        top : 30px;
        left : -20px;
      }
    }
  }

/*******************/

  .container-blog{
    display : flex;
    flex-direction : row;
    width: 1230px;
    margin: 0 auto;

    .container-nav{
      width : 220px;
      height : 100%;
      padding : 0px 15px 0 15px;
      border-left: 8px solid #e0e0e0;
      border-radius : 6px;

      h5{
        padding : 10px;
        line-height : 25px;
        text-align: center;
        margin-bottom : 30px;
        background-color : #e0e0e0;
      }
      ul{
        list-style: none;
        padding-left : 0;
        margin-bottom : 0;

        li{
          margin-top : 10px; 
          padding : 0 5px;  

          &:hover {
            background-color : #c7d1d1
          }
        }
      }

    }
    .container-articles{
      width : 1000px;
      border-left: 8px solid #e0e0e0;

      div:last-child {
        margin-bottom : 0px;
        border-bottom : none;
      }
      .cardblog-container{
        margin-bottom : 20px;
        padding: 15px;
      }
    }
  }
`

export default BlogScreen
