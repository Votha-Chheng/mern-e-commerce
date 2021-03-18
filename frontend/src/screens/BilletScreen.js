import { motion } from 'framer-motion'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getArticleDetails } from '../actions/blogActions'
import LoaderSpin from '../components/LoaderSpin'
import BilletNormalDisplay from '../components/BilletNormalDisplay'
import { pageTransition } from '../fonctionsOutils'
import BilletGrilleDisplay from '../components/BilletGrilleDisplay'

const BilletScreen = () => {

  const [hidden, setHidden] = useState(true)

  const {article, loadingOneArticle, errorOneArticle} = useSelector(state=> state.articleById)

  const dispatch = useDispatch()
  const {idBillet} = useParams()

  const btnFixe = useRef(null)

  useEffect(()=>{
    dispatch(getArticleDetails(idBillet))

  }, [dispatch, idBillet])

  useLayoutEffect(() => {     
    const callbackEvent = ()=>{
      if(btnFixe.current){
        if(window.scrollY > btnFixe.current.offsetTop+230){
          setHidden(false)
        } else {
          setHidden(true)
        } 
      }   
    }   
    window.addEventListener("scroll", callbackEvent)

    return ()=> window.removeEventListener("scroll", callbackEvent)

  }, [hidden])

  return (
    <Wrapper variants={pageTransition} initial='initial' animate='animate' exit='exit'>
      <div className='buttons'>
        <div ref={btnFixe} className='back-fixe'>
          <Link to='/blog'>
            <button className='btn btn-warning rounded'><i className="fas fa-arrow-circle-left" style={{transform : 'scale(1.8)'}}/>&nbsp; &nbsp;Retour aux articles</button>
          </Link>
        </div>
      </div>
      {
        !hidden &&
        <div className='back'>
        <Link to='/blog'>
          <button className='btn btn-warning rounded'><i className="fas fa-arrow-circle-left" style={{transform : 'scale(1.8)'}}/>&nbsp; &nbsp;Retour aux articles</button>
        </Link>
      </div>
      }
      
      
      <div className='billet-container'>
        {
          errorOneArticle? <div className='alert-danger text-center h4'>{errorOneArticle}</div> :
          loadingOneArticle ? <LoaderSpin/> :
          article && article.displayPhotos === "normal" ? 
          <BilletNormalDisplay billet={article}/> :
          <BilletGrilleDisplay billet={article}/>
        }
      </div>
      
      
    </Wrapper>
  )
}

const Wrapper = styled(motion.div)`
  position: relative;

  .back{
    position : fixed;
    left : 40px;
    bottom : 150px;
    z-index : 1;
  }
  .back-fixe {
    left : 40px;
    position : absolute;
    top : 50px;
  }
  .billet-container{
    width: 1200px;
    margin: 50px auto;
  }

`

export default BilletScreen
