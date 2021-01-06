import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {productDetails} from '../actions/productActions'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import Modal from '../components/Modal'
import CarouselImageProduit from '../components/CarouselImageProduit'

const ProductScreen = ({match}) => {

  const modalShow = {
    start: {opacity : 0},
    end : {opacity : 1, transition : { ease : 'easeIn', duration:0.5}}
  }

  // const [ratio, setRatio] = useState(0)
  const [modal, setModal] = useState(false)
  // const image = useRef(null)
  const imageModal = useRef(null)

  const dispatch = useDispatch()

  const {loading, error, product} = useSelector(state => state.productDetails)

  useEffect(() => {
    dispatch(productDetails(match.params.id))
  }, [match, dispatch])
  

  return (
    <Wrapper>
      {
        modal && (
          <motion.div  className='modal-container' onClick={() => setModal(false)} style={{ }}>
              <Modal>
                <motion.img variants={modalShow} initial = 'start' animate='end' ref={imageModal} src={product.image[0]} alt={product.nom} height='750px' />
              </Modal>     
          </motion.div>
          
        ) 
      }
      {
        loading? <h2>Chargement...</h2> : error ? <h3>{error}</h3> : (
        <>
          <div className='card-container'>
            {/* <div className='card-image' onClick={() => setModal(true)}>
              <img ref={image} onLoad={()=>{setRatio(image.current.naturalWidth/image.current.naturalHeight)}} src={product.image[0]} alt={product.name} width={ratio>1? '500px' : 'auto'} height={ratio<1? '500px' : 'auto'} />
            </div> */}
            <CarouselImageProduit images={product.image}/>
            <div className='card-description'>
              <h3>{product.nom}</h3>
              <small>Catégorie : <span className='categorie'>{product.catégorie}</span></small><br/><br/>
              <h4 >Prix : <span className='prix'>{product.prix} €</span></h4>
            </div>
            
          </div>
        </>
        )
      } 
      
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .modal-container {
    z-index: 80000000000000;
    top: 0px;
    position: fixed;
    width: 100%;
    height: 100vh;
    display : flex;
    justify-content: center;
    background-color : rgba(0,0,0,0.5);
    padding : 50px 20px;
  }
  h3{
    text-align: Left;
    margin-top:0px;
    font-stretch : condensed;
  }
  small{
    font-size: 0.9em;
  }
  .categorie{
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
    width : 500px;
    height : 500px;
    margin-right : 50px;
    border : 3px solid rgba(200, 200, 200, 0.5);
    overflow: hidden;
    cursor: pointer;
  }
  .prix{
    color : #b62902;
  }
  .card-description{
    width:500px;
  }
`
export default ProductScreen
