import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { filtersUpdate, getFilteredProducts, resetProductsPagination, updateProductsPagination } from '../actions/filterActions'
import CardHome from '../components/CardHome'
import Filtres from '../components/Filtres'
import Loader from '../components/Loader'
import Separateur from '../components/Separateur'
import {pageTransition} from '../fonctionsOutils'

const BoutiqueScreen = () => {
  const [categories, setCategories] = useState([])
  const [scrollYValue, setScrollYValue] = useState('')
  const [pages, setPages] = useState([])

  const dispatch = useDispatch()
  const history = useHistory()

  const productsFiltered = useSelector(state => state.productsFiltered)
  const {filters, allProducts, filteredProducts, unpaginateProducts, error, loading, productPagination} = productsFiltered
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
    console.log(sessionStorage.getItem('positionY'))
    
  }

  useEffect(() => {
    dispatch(getFilteredProducts())
  },[dispatch, filters, productPagination])

  useEffect(()=>{
    !loading && setCategories(['tous les produits',...new Set([...allProducts].map(product => product.catégorie))])
  }, [loading, allProducts])

  useEffect(()=>{
    if(history.action === 'POP'){
      window.scrollTo(0,+sessionStorage.getItem('positionY'))
    }
  }, [history])

  useEffect(() => {
    if(history.location.pathname === "/produits" && boutiquePage.current){
      boutiquePage.current.addEventListener('click', getPositionY)
    }      
  }, [history])

  useEffect(() => {
    if(productPagination.numberOfItemsToDisplay === 10){
      setScrollYValue(30)
    } else if(productPagination.numberOfItemsToDisplay === 50){
      setScrollYValue(-30)
    } else {
      setScrollYValue(0)
    }
  }, [productPagination])

  useEffect(() => {
    if(unpaginateProducts){
      let totalPages = Math.floor(unpaginateProducts.length/productPagination.numberOfItemsToDisplay)+1
      let totalPagesArray=[]
      for(let i=0 ; i<totalPages ; i++){
        totalPagesArray.push(i+1)
      }
      setPages(totalPagesArray)
    }
  }, [unpaginateProducts, productPagination])

  useEffect(() =>{
    if(history.action === 'POP'){
      window.scrollTo(0, sessionStorage.getItem("positionY"))
    }
  }, [history])


  const handleMinPriceChange = (name, value)=>{
    dispatch(filtersUpdate(filters, name, value))
  }
  
  const handleMaxPriceChange = (name, value)=>{
    dispatch(filtersUpdate(filters, name, value))
  }

  const handleClick = (name, value)=>{
    dispatch(filtersUpdate(filters, name, value))
    dispatch(updateProductsPagination(productPagination, "currentPage", 1))
  }

  const handleSortChange = (name, value) =>{
    dispatch(filtersUpdate(filters, name, value))
  }

  const clicNumberHandler = (event, value)=>{
    setScrollYValue(+event.target.id)
    dispatch(resetProductsPagination(value))  
  }

  const changeProductPagination = (name, value)=>{
    dispatch(updateProductsPagination(productPagination, name, value))
    window.scroll(0,0)
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
        {categories && unpaginateProducts ? 
          <Filtres 
            categories = {categories} 
            category = {category} 
            clic = {(event)=>handleClick(event.target.name, event.target.id)}
            minPrice = {minPrice}
            maxPrice = {maxPrice}
            sort = {sort}
            filteredProducts = {unpaginateProducts}
            handleMinPriceChange = {(event)=>handleMinPriceChange(event.target.name, +event.target.value)}
            handleMaxPriceChange = {(event)=>handleMaxPriceChange(event.target.name, +event.target.value)}
            handleSortChange = {(event)=>handleSortChange(event.target.name, event.target.value)}
          /> : <div></div>
        }
        
        {
          filteredProducts &&
          <Filters>
            <div className='tri'> Afficher </div>
            
            <div className='filter' style={{transform : `translateY(${scrollYValue}px)`}}>
              <div 
                id='30' 
                data-value='10' 
                data-name='numberOfItemsToDisplay' 
                className={`${scrollYValue === 30 ? "choix active" : "choix"}`} 
                onClick={(event)=>clicNumberHandler(event, +event.target.dataset.value)}
              >
                10
              </div>
    
              <div 
                id='0' 
                data-value='20' 
                data-name='numberOfItemsToDisplay' 
                className={`${scrollYValue === 0 ? "choix active" : "choix"}`} 
                onClick={(event)=>clicNumberHandler(event, +event.target.dataset.value)} 
                style={{margin:'5px auto'}}
              >
                20
              </div> 
            
              <div 
                id='-30' 
                data-value='50' 
                data-name='numberOfItemsToDisplay' 
                className={`${scrollYValue === -30 ? "choix active" : "choix"}`} 
                onClick={(event)=>clicNumberHandler(event, +event.target.dataset.value)}
              >
                50
              </div>
              
            </div>
            <div>objets par page</div>          
          </Filters>   
        }
      
        {
          loading ? <Loader/> : 
          error ? <h3>{error}</h3> : 
          filteredProducts.length!== 0 ? 
            <div className="products-container">
              {filteredProducts.map(product =>(
                <div className='card-container' key={product._id}>
                  <CardHome product={product} loading={loading}/>
                </div>
              ))}
            </div>
  
          :
          <h3 className='no-found'>Aucun produit ne correspond à vos critères de recherches.</h3>
        }
      </div>
      <Pagination>
        {
          pages === 1 ? null :
          pages.map((page, index) => 
            <div 
              className='page' 
              key={index}
              id={index+1}
              style={index === productPagination.currentPage-1 ? { backgroundColor : "#dde3e3", color : 'grey' } : null}
              data-name ='currentPage'
              onClick={(event) => changeProductPagination(event.target.dataset.name, +event.target.id)}
            >
              {page}
            </div>
          )
        }
      </Pagination>
        
    </Wrapper>
  )}      
       
const Filters = styled.div`
  display:flex;
  justify-content: center;
  margin-bottom : 20px;
  align-items: center;
  text-align : center;
  height : 80px;
  overflow : hidden;
  position: relative;

  &::before{
    content:'';
    width : 40px;
    height : 1px;
    background-color : white;
    position : absolute;
    opacity : 0.9;
    top : -5px;
    left : 45%;
    box-shadow : 0px 0px 15px 20px whitesmoke;
    z-index : 2;
  }
  &::after{
    content:'';
    width : 40px;
    height : 1px;
    background-color : white;
    position : absolute;
    opacity : 0.9;
    bottom : -5px;
    left : 45%;
    box-shadow : 0px 0px 15px 20px whitesmoke;
    z-index : 2;
  }

  .tri{
    margin-right : 25px;
  }
  .filter{
    margin-right : 15px;
    transition : all 0.3s ease-in;
    .choix{
      width : 40px;
      height : 25px;
      border : 2px solid #dde3e3;
      border-top-left-radius: 10px 50%;
      border-top-right-radius:10px 50%;
      border-bottom-right-radius: 10px 50%;
      border-bottom-left-radius:  10px 50%;
      color : grey;
      cursor: pointer; 
    }
    .choix.active{
      border : 2px solid #41819f;
      color : #41819f;
      font-weight : bold;
    }
  }
`

const Pagination = styled.div`
  display:flex;
  justify-content : center;
  margin : 20px auto 0px auto ;

  .page{
    text-align: center;
    color : white;
    background-color : grey;
    width : 20px;
    height : 20px;
    cursor : pointer;
    margin : 2px;
    border : 1px double #dde3e3;
  }
`

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
