import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {productDetails} from '../actions/productActions'
import styled from 'styled-components'

const ProductScreen = ({match}) => {
  const [ratio, setRatio] = useState()
  const image = useRef(null)

  const dispatch = useDispatch()

  const {loading, error, product} = useSelector(state => state.productDetails)

  useEffect(() => {
    dispatch(productDetails(match.params.id))
  }, [match, dispatch])
  

  return (
    <Wrapper>
      {
        loading? <h2>Chargement...</h2> : error ? <h3>{error}</h3> : (
        <>
          
          <div className='card-container'>
            <div className='card-image'>
              <img ref={image} onLoad={()=>{setRatio(image.current.naturalWidth/image.current.naturalHeight)}} src={product.image} alt={product.name} width={ratio>1? '600px' : 'auto'} height={ratio<1? '600px' : 'auto'} />
            </div>
            <div className='card-description'>
              <h3>{product.nom}</h3>
              <small>Catégorie : <span>{product.catégorie}</span></small><br/>
            </div>
          </div>
        </>
        )
      }
      
      
      
    </Wrapper>
  )
}

const Wrapper = styled.div`
  h3{
    text-align: Left;
    margin-top:0px;

    font-stretch : condensed;
  }
  small{
    font-size: 0.9em;
  }
  span{
    font-style : italic;
    font-weight: bold;
  }
  .card-container{
    margin:75px auto 0 auto;
    display: flex;
    justify-content: center;
  }
  .card-image{
    display : flex;
    justify-content: center;
    width : 600px;
    height : 600px;
    margin-right : 50px;
    border : 3px solid rgba(200, 200, 200, 0.5);
    /* border-radius : 10px; */
    overflow: hidden;
  }
  img{
    
  }
  .card-description{
    width:500px;
  }
`
export default ProductScreen
