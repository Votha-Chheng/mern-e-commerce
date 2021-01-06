import React, { useEffect, useRef, useState } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const CardHome = ({product}) => {

  const ratioFrame = 220/280
  const [ratio, setRatio] = useState(0)

  const img = useRef(null)

  

  useEffect(()=>{
    const getRatio = async () => {
      await setRatio(img.current.clientWidth/img.current.clientHeight)
    }
    getRatio()
  }, [ratio])

  
  return (
    <Wrapper >
        <Link to={`/produit/${product._id}`}>
          <div style={{position:'relative'}} className="image-frame">
            <img ref={img} src={product.image[0]} style={{position : 'absolute', left:'0', transform:`scale(0.9) translateY(${ratio>ratioFrame?15:0}px) translateX(-${ratio>1? 220*ratio/4 : '0'}px)`}} width={ratio<1 ? '220': 'auto'} height={ratio>1? '280px' : 'auto'} alt="lampe"/>
          </div>
        
          <div className="text-desc">
            <h3 className="nom-produit">{product.nom}</h3>
          </div>
        </Link>
          <h4 className="prix-card"><span>{product.prix} €</span></h4>
          <div className="btn-card">
            <button>Détails</button>
            <button>Ajouter au panier</button>
          </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`

  width:350px;
  height : 500px;
  overflow: hidden;
  margin:10px auto;
  background-color: #fff;
  z-index: 1;

  .text-desc{
    padding: 15px 20px;
  }
  .text-desc h3{
    height : 50px;
  }
  .image-frame{
    position: relative;
    text-align: center;
    width: 220px;
    height: 280px;
    overflow: hidden ;
    margin: 12px auto;
    cursor: pointer;
    border-bottom: 1px solid grey;
    transition: all 0.3s ease-in;
  }
  .image-frame:hover{
    transform: scale(1.05) translateY(-5px);
  }
  .image-frame::before:hover{
    content: '';
    width: 385px;
    height: 100%;
    background-color: rgba(255,255,255, 0.5);
    top: 0;
    left: 0;
    position: absolute;
    z-index: 33;
     
  }
  img{
    transition: all 0.3s ease-in;
    opacity : 1;
    border-image: linear-gradient(#f6b73c, #4d9f0c) 30;
  }
  img:hover{  
    opacity : 0.7;
    transition: all 0.3s ease-in;
  }
  .nom-produit{
    text-align: center;
    font-size: 1.2em;
  }
  .prix-card{
    text-align: right;
    padding-right: 18px;
    padding-top:20px;
    font-weight: bold;
    
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
  .btn-card :nth-child(1){
    background-color: #2A3D45 ;
  }
  .btn-card :nth-child(1):hover{
    background-color: white;
    border : 2px solid #2A3D45;
    color: #2A3D45;
    transition: all 0.3s ease-out;
  }
  .btn-card :nth-child(2){
    background-color: #FF8427 ;
    border : 2px solid #FF8427;
  }
  .btn-card :nth-child(2):hover{
    background-color: white;
    border : 2px solid #FF8427;
    color: #FF8427;
    transition: all 0.3s ease-out;
  }
  .btn-card button{
    font-size:1.1em;
    padding:10px 15px;
    cursor: pointer;
    margin: 0 5px;
    font-family: 'Lato', sans-serif;
    text-transform: uppercase;
    border:none;
    color: #fff;
  }

  @media only screen and (max-width: 1520px){
    .btn-card button{
      font-size:0.9em;
      padding:6px;
    }
    .btn-card :nth-child(1){
    width:80px;
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

    width:350px;
    height: 470px;

    .btn-card button{
      font-size:1.1em;
      padding:10px 15px;
      margin: 0 5px;
    }
    .btn-card :nth-child(1){
      width:unset;
    }
  }
  @media only screen and (max-width: 768px){

      width:260px;
      height: 450px;

    .btn-card button{
      font-size:0.8em;
      padding:4px;
      margin: 0;
    }
    .btn-card :nth-child(1){
    width:75px;
    }
    .btn-card :nth-child(2){
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
