import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { filtersUpdate, getFilteredProducts } from '../actions/filterActions'
import CardHome from '../components/CardHome'
import Filtres from '../components/Filtres'
import Loader from '../components/Loader'
import Separateur from '../components/Separateur'
import {pageTransition} from '../fonctionsOutils'

const BoutiqueScreen = () => {
  const [categories, setCategories] = useState([])

  const dispatch = useDispatch()
  const {pathname} = useLocation()

  const productsFiltered = useSelector(state => state.productsFiltered)
  const {filters, allProducts, filteredProducts, error, loading} = productsFiltered
  const {minPrice, maxPrice, category, sort} = filters

  const boutiquePage = useRef(null)

  const shapeAnimation = {
    initial : {
      y : 350
    },
    animate : {
      y:0,
      transition : {
        duration : 4
      }
    }
  }

  const getPositionY = () => {
    sessionStorage.setItem('positionY', window.scrollY)
  }

  useEffect(() => {
    dispatch(getFilteredProducts())
  },[dispatch, filters])

  useEffect(()=>{
    !loading && setCategories(['tous les produits',...new Set([...allProducts].map(product => product.catégorie))])
  }, [loading, allProducts])

  useEffect(() => {
    boutiquePage.current.addEventListener('click', ()=>{
      if(pathname==='/produits'){
        getPositionY()
      }
    })
  }, [pathname])
  

  const handleMinPriceChange = (name, value)=>{
    dispatch(filtersUpdate(filters, name, value))
  }
  
  const handleMaxPriceChange = (name, value)=>{
    dispatch(filtersUpdate(filters, name, value))
  }

  const handleClick = (name, value)=>{
    dispatch(filtersUpdate(filters, name, value))
  }

  const handleSortChange = (name, value) =>{
    console.log(name,value)
    dispatch(filtersUpdate(filters, name, value))
  }

  return (
    <Wrapper variants={pageTransition} initial='initial' animate='animate' exit='exit' ref={boutiquePage}>
      <div className="hero">

      </div>
      <div className='title-wrap'>
        <div className='title'>
          <motion.div variants={shapeAnimation} initial='initial' animate='animate' className='shape'>
            <motion.svg width="600" height="600" viewBox="0 0 59 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.7143 57.5298C45.5793 57.5298 58.4405 44.6686 58.4405 28.8036C58.4405 12.9385 45.5793 0.0773773 29.7143 0.0773773C13.8493 0.0773773 0.988098 12.9385 0.988098 28.8036C0.988098 44.6686 13.8493 57.5298 29.7143 57.5298Z" fill="#EAF0CE"/>
            </motion.svg>
          </motion.div>
          <h2>Boutique</h2> 
        </div>
        <Separateur/>
      </div>

      <div className='content-container'>       
        {categories ? 
          <Filtres 
            categories = {categories} 
            category = {category} 
            clic = {(event)=>handleClick(event.target.name, event.target.id)}
            minPrice = {minPrice}
            maxPrice = {maxPrice}
            sort = {sort}
            filteredProducts = {filteredProducts}
            handleMinPriceChange = {(event)=>handleMinPriceChange(event.target.name, +event.target.value)}
            handleMaxPriceChange = {(event)=>handleMaxPriceChange(event.target.name, +event.target.value)}
            handleSortChange = {(event)=>handleSortChange(event.target.name, event.target.value)}
          /> : <div></div>
        }
           
        {
          loading ? <Loader/> : 
          error ? <h3>{error}</h3> : 
          filteredProducts.length!== 0 ?  
          (  
            <div className="products-container">
              {filteredProducts.map(product =>(
                <div className='card-container' key={product._id}>
                  <CardHome product={product} loading={loading}/>
                </div>
              ))}
            </div>
          ) :
          <h3 className='no-found'>Aucun produit ne correspond à vos critères de recherches.</h3>
        }
      </div>
        
    </Wrapper>
  )}      
          

const Wrapper = styled(motion.div)`
  position: relative;
  .hero{
    position: absolute;
    width: 100%;
    height: 150px;
    background-color : #C4A77D;
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
      .shape{
        position : absolute;
        right: -200px;
        top: -40px;
        z-index:-1;
        svg{
          transition: all 0.3s ease-in-out;
        }
      }
    }
  }
  .content-container{
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }
  .no-found{
    margin: 80px auto;
    text-align: center;
  }
  
  button{
    outline : none;
    border : 1px solid white !important;
  }

  .products-container{
    width : 100%;
    display: flex;
    flex-wrap :wrap;
    justify-content:space-evenly;
    
    .card-container{
      border: solid 1px #eaf0ce;
      margin-bottom : 25px;
      height:510px;
      overflow: hidden;
    }
  }

  @media only screen and (max-width: 1490px){
    .card-container{
      height : 460px;
    }
  }

  @media only screen and (max-width: 1250px){
    .content-container{
      width : 900px;
    }
  }
  @media only screen and (max-width: 924px){
    .shape{
      width : 300px;
      height : 300px;
      left : -199px;      
    }
    .content-container{
      width : 674px;
    }
  }
  @media only screen and (max-width: 680px){
    .content-container{
      width : 350px;
    }
  }

`

export default BoutiqueScreen
