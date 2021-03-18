import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CardHome from './CardHome'
import { useDispatch, useSelector } from 'react-redux'
import { getFilteredProducts } from '../actions/filterActions'
import LoaderSpin from './LoaderSpin'
import Separateur from './Separateur'

const HomeProducts = () => {
  const [products, setProducts] = useState([])

  const dispatch = useDispatch()

  const {allProducts, loading, error} = useSelector(state => state.productsFiltered)

  useEffect(() => {
    dispatch(getFilteredProducts())
  }, [dispatch])

  useEffect(() => {
    const derniersProduits = [allProducts[allProducts.length-1], allProducts[allProducts.length-2],allProducts[allProducts.length-3],allProducts[allProducts.length-4]]
    setProducts(derniersProduits)
  }, [allProducts])


  return (
    <Wrapper>
        <div className='forme-1'></div>
        <div className='forme-2'></div>
        <h2>
          Derniers produits
        </h2>
        <Separateur/>

        <div id='conteneur-produits'>   
           {
              error ? <div className='alert-danger text-center h3'>{error}</div> :
              loading ? <LoaderSpin/> :
              products && products.map((product, index) => (
                <div key={index} className='card-container'>
                  <CardHome product = {product} loading={loading}/>
                </div>
                
                
              ))
            }
      
        </div>  

    </Wrapper>
  )
}

const Wrapper = styled.section`
  
  position: relative;
  margin : 50px auto;
  background-color: #f9f6f1;
  width: 100%;
  min-height : 750px;
  
  h2{
    padding-top :30px;
    text-align: center;
  }
  .forme-1{
    position: absolute;
    width:80%;
    height : 150px;
    background-color:#D0D6B5;
    z-index:-0.5;
    top : 150px;
    left : 50px;
  }
  .forme-2{
    position: absolute;
    width: 80%;
    height : 150px;
    background-color:#C4A77D;
    z-index: 0;
    top : 550px;
    right : 0px;
    margin-right:50px;
  }

  #conteneur-produits{
    display: flex;
    justify-content: space-around;

  }
  @media only screen and (max-width: 1440px){
    #conteneur-produits{
      width: 100%;
      padding-bottom: 50px;
      flex-wrap : wrap;
    }
    .forme-2{
      z-index: 0;
      top : 690px;
      margin-right:50px;
    }
  }
  @media only screen and (max-width: 1060px){
    #conteneur-produits{
      width: 100%;
      padding-bottom: 50px;
    }
    .forme-2, .forme-1{
      display: none;
    }
  }  
`

export default HomeProducts
