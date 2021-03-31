import React, { useLayoutEffect, useRef, useState } from 'react'
import {Link, NavLink, useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {convertPrice} from '../fonctionsOutils'
import LoaderSpin from './LoaderSpin'

const CardHome = ({product, loading}) => {

  const ratioFrame = 220/264
  const [ratio, setRatio] = useState('')

  const image = useRef(null)

  const history = useHistory()

  const addCartHandler = ()=> {
    history.push(`/panier/${product._id}?qty=1`)
  }

  console.log(ratio)
  return (
    <Wrapper >     
      <Link to={`/produit/${product._id}`}>
        <div style={{position:'relative'}} className="image-frame">
          {
            loading ? <LoaderSpin/> :
            <img 
              ref={image} 
              src={product.images[0]} 
              alt={product.nom} 
              width={ratio>1 ? 'auto' : '220'}
              height={ratio>1? '264' : 'auto'}
              style={{position : 'absolute', left:'0', transform:`scale(0.9) translateY(${ratio>ratioFrame?15:-15}px) translateX(-${ratio>1? 220*ratio/4 : '0'}px)`}}
              onLoad={() => setRatio(image.current.offsetWidth/image.current.offsetHeight)}
            />
          } 
        </div>
      
        <div className="text-desc">
          <h3 className="nom-produit">{product.nom}</h3>
        </div>
      </Link>
      <h4 className="prix-card"><span>{convertPrice(product.prix)} €</span></h4>
      <div className="btn-card">
        <NavLink to={`/produit/${product._id}`} className='details'><button>Détails</button></NavLink>
        
        {
          product.stock <=0 ? <div className='cart'><button className='no-dispo'>Rupture de stock</button></div> : product.livraison ? 
          <div className='cart' ><button className='dispo' onClick={()=>addCartHandler()}>Ajouter au panier</button></div> : 
          <div className='cart'><button className='btn btn-block btn-primary' onClick={()=>history.push('/contact')}>Me contacter</button></div>
        }
        
      </div>
      <div className='background'>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width:350px;
  height : 500px;
  overflow: hidden;
  margin:10px auto;
  position: relative;
  background-color: white;

  .text-desc{
    padding: 15px 20px;

    .nom-produit{
      text-align: center;
      font-size: 1.2em;
      height: 40px;
    }
    
  }
  /* .text-desc h3{
    height : 40px;
  } */
  .image-frame{
    position: relative;
    text-align: center;
    width: 220px;
    height: 280px;
    overflow: hidden;
    margin: 12px auto;
    cursor: pointer;
    border-bottom: 1px solid grey;
    transition: all 0.3s ease-in;
    padding-top : 15px;

    &:hover {
      transform: scale(1.05) translateY(-5px);
    }

    &::before:hover{
      content: '';
      width: 100%;
      height: 100%;
      background-color: rgba(255,255,255, 0.5);
      top: 0;
      left: 0;
      position: absolute;
    }

    img{
      transition: all 0.3s ease-in;
      opacity : 1;
      border-image: linear-gradient(#f6b73c, #4d9f0c) 30;

      &:hover{  
        opacity : 0.7;
        transition: all 0.3s ease-in;
      }
    }
  }

  .prix-card{
    text-align: right;
    padding-right: 18px;
    padding-top:20px;
    font-weight: bold;
    margin-right : 18px;
  }
  .prix-card span{
    border: 1px solid black;
    padding-left: 10px;
  }
  .btn-card{
    width:100%;
    display: flex;
    justify-content:space-around;
  }
  .details{
    width:100px;

    button{
      background-color: #2A3D45 ;
      width:100%;
      border : 1px solid #2A3D45;
    }
    button:hover{
      background-color: antiquewhite;
      color: #2A3D45;
      border : 1px solid #2A3D45;
      transition: all 0.3s ease-out;
    }
  }
  .cart{
    width : 200px;

    .dispo{
      width:100%;
      background-color: #FF8427 ;
      border : 1px solid #FF8427
    }
    button:hover{
      background-color: antiquewhite;
      color: #FF8427;
      border : 1px solid #FF8427;
      transition: all 0.3s ease-out;
    }
  }
  button.no-dispo{
    color : red !important;
    cursor : default !important ;
    padding : 10px 20px !important;
  }
  .btn-card button{
    font-size:1.1em;
    padding:10px 15px;
    cursor: pointer;
    margin: 0 0px;
    font-family: 'Lato', sans-serif;
    text-transform: uppercase;
    border:none;
    color: #fff;
    width:100%;

    
  }

  @media only screen and (max-width: 1520px){
    height: 450px;

    .btn-card button{
      font-size:0.9em;
      padding:6px;
      height : 40px;
    }
    .image-frame{
      margin-top : 0px;
      margin-bottom : 0px;
    }
    .prix-card {
      line-height : 10px;
      padding-top :0px;
      margin-bottom : 22px;
    }
  }

  @media only screen and (max-width: 1200px){
    width:320px;
    height: 440px;
  }

  @media only screen and (max-width: 768px){

    width:260px;
    height: 450px;

    .btn-card button{
      font-size:0.8em;
      padding:4px;
      margin: 0;
    }
    .details{
    width:80px;
    }
    .cart{
    width:110px;
    }
    .prix-card {
      line-height : 10px;
      padding-top :0px;
      margin-bottom : 22px;
    }
  }

`

export default CardHome
