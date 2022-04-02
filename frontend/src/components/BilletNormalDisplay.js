import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { formatDate } from '../fonctionsOutils'

const BilletNormalDisplay = ({billet}) => {

  const [refArray, setRefArray] = useState([])

  const imgRef = useRef([])

  console.log(refArray)

  return (
    <Wrapper>
      <h2 className='text-center'>{billet.titre}</h2>
      <div className='text-center text-muted'>publié le {formatDate(billet.dateBillet)}</div>
      <div className='sous-titre'><span>{billet.sousTitre}</span></div>
      <div className='texte' dangerouslySetInnerHTML={{__html : billet.texte}}></div>
      <div className='images'>
        {
          billet.photos.map((photo, index)=>
            <div key={index} className='img-container'>
              <div className='py-2 conteneur'>{photo.legende && photo.legende}</div>
              <img
                src={photo} 
                alt={`${billet.titre}-${index}`} 
                ref={(el) => imgRef.current[index] = el}
                onLoad={()=> setRefArray([...refArray, imgRef.current[index].offsetWidth/imgRef.current[index].offsetHeight])}
                height = {refArray[index]<1 ? '750' : 'auto'}
                width = {refArray[index]>1 ? '800' : 'auto'}
              /> 
            </div>  
          )
        }
      </div>
      
        
    </Wrapper>
  )
}

const Wrapper = styled.div`

  padding : 0 15px;

  h2{
    font-family: 'Indie Flower', cursive;
    color : black;
    font-size : 2.5em;
  }
  .sous-titre{
    font-family: 'Yanone Kaffeesatz', cursive;
    font-size : 1.9em;
    font-weight : bold;
    color: black;
    margin : 75px 0 20px 0;
    width : 50%;

    span {
      border-bottom : 10px solid #f5f5f5;
    }
  }
  .texte{
    font-family: 'Cabin', sans-serif;
    font-size : 1.2em;
    line-height : 25px;
    margin : 20px 5px;
  }
  .images{
    display : flex;
    justify-content: space-around;
    flex-wrap : wrap;

    .img-container{
      background-color : #f5f5f5;
      border-left : 10px solid #f5f5f5;
      border-right : 10px solid #f5f5f5;
      border-bottom : 10px solid #f5f5f5;
      display : flex;
      flex-direction : column;
      align-items: center;
      max-width : 800px;
      margin : 20px auto 10px auto;  
    }
  }

  @media screen and (max-width : 800px){
    .img-container{
      width : 500px;
        img{
          width : 500px;
          object-fit : contain;
        }  
    }
  }
  @media screen and (max-width : 520px){
    padding :0;

    .img-container{
      width : 330px;
      height : 100%;

      img{
        width : 330px;
        height : 100%;
        object-fit : contain;
      }
      
      
    }
  }
  
`


export default BilletNormalDisplay
