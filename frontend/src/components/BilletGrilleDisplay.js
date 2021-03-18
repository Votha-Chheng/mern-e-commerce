import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { formatDate } from '../fonctionsOutils'
import Modal from './Modal'

const BilletGrilleDisplay = ({billet}) => {

  // const [indexImg, setIndexImg] = useState(0)
  const [indexModal, setIndexModal] = useState(0)
  const [modal, setModal] = useState(false)
  const [refWidth, setRefWidth] = useState([])
  const [refHeight, setRefHeight] = useState([])
  const [refMiniWidth, setRefMiniWidth] = useState([])
  const [refMiniHeight, setRefMiniHeight] = useState([])

  const imgRef = useRef([])
  const miniImgRef = useRef([])

  const refAssign = (refObject, index)=>{
    setRefWidth([...refWidth, refObject.current[index].offsetWidth])
    setRefHeight([...refHeight, refObject.current[index].offsetHeight])
  }
  const refMiniAssign = (refObject, index)=>{
    setRefMiniWidth([...refMiniWidth, refObject.current[index].offsetWidth])
    setRefMiniHeight([...refMiniHeight, refObject.current[index].offsetHeight])
  }
  console.log(refMiniWidth)
  console.log(refMiniHeight)
  

  return (
    <Wrapper>
    {
      modal && (
        <Modal>
          <div className='image-frame-modal' >
            <i className="fas fa-times-circle close" onClick={() => setModal(false)} />
            <div className='right' onClick={() => setIndexModal(indexModal === billet.photos.length-1 ? 0 : indexModal+1)}>
              <i className="fas fa-chevron-circle-right"/>
            </div>
            <div className='left' onClick={() => setIndexModal(indexModal === 0 ? billet.photos.length-1 : indexModal-1)}>
              <i className="fas fa-chevron-circle-left"></i>
            </div>
            <div 
              className='images-queue-modal' 
            >
              { 
                billet &&
                billet.photos.map((image, index)=> (
                  <div 
                    key={index} 
                    className='main-container-images-modal'
                    style={{transform: `translateX(${indexModal * -100}%)`}}
                  >
                    <img 
                      src={image.url} 
                      alt='modal'
                      ref={(el) => imgRef.current[index] = el}
                      
                      onLoad={()=> refAssign(imgRef,index)}
                      height = {refWidth[index]>refHeight[index] ? `${(900*refHeight[index]/refWidth[index])}` : '900'}
                      width = {refWidth[index]>refHeight[index] ? '900' : `${(900*refWidth[index]/refHeight[index])}`}
                      style={{transform : `translateY(${refWidth[index]>refHeight[index] ? `${(900-(900*refHeight[index]/refWidth[index]))/2}px` : '0'})`}}
                    />
                  </div>
                ))
              } 
            </div>
          </div>
        </Modal>        
      ) 
    }
    {
      billet &&
      <>
        <h2 className='text-center'>{billet.titre}</h2>
        <div className='text-center text-muted mb-5'>publié le {formatDate(billet.dateBillet)}</div>

        <div className='images-billet'>
          {
            billet.photos.map((photo, index)=>
              <div key={index} className='img-container' 
                onClick={() => {
                  setModal(prev=>!prev)
                  setIndexModal(index)
                }}
              >
                <img  
                  src={photo.url} 
                  alt={`${billet.titre}-${index}`} 
                  ref={(el) => miniImgRef.current[index] = el}
                  onLoad={()=> refMiniAssign(miniImgRef,index)}
                  height = {refMiniWidth[index]>refMiniHeight[index] ? `${(300*refMiniHeight[index]/refMiniWidth[index])}` : '300'}
                  width = {refMiniWidth[index]>refMiniHeight[index] ? '300' : `${(300*refMiniWidth[index]/refMiniHeight[index])}`}
                  style={{transform : `translateY(${refMiniWidth[index]>refMiniHeight[index] ? `${(300-(300*refMiniHeight[index]/refMiniWidth[index]))/2}px` : '0'})
                          translateX(${refMiniWidth[index]<refMiniHeight[index] ? `${(300 - (refMiniWidth[index]*refMiniHeight[index]/300))/2}px` : '0'})`}}
                /> 
              </div>
              
            )
          }
        </div>

        <div className='sous-titre'><span>{billet.sousTitre}</span></div>
        <div className='texte' dangerouslySetInnerHTML={{__html : billet.texte}}></div>
      </>
      
    }
      
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding : 0 15px;

  /*******Modal *************/
  .image-frame-modal{
    position: relative;
    width: 900px;
    height : 900px;
    overflow: hidden;
    display: flex;
    border : 3px solid white;

    .close{
      position :absolute;
      z-index: 9999999;
      cursor: pointer;
      transform : scale(2);
      top :10px;
      right :10px;
    }

    .right, .left{
      position: absolute;
      top :450px;
      transform : scale(5);
      z-index: 9999999;
      background-color : rgba(0,0,0, 0);
      cursor : pointer;
      color : rgba(200,200,200);
      transition : color 0.3s;
    }
    .right:hover, .left:hover{
      color : grey;
    }
    .right{
      right : 40px;
    }
    .left{
      left : 40px;
    }
    .images-queue-modal{
      display : flex;
      flex-direction: row;
      justify-content: flex-start;

      .main-container-images-modal{
        width : 900px;
        max-height : 900px;
        display : flex;
        justify-content : center;
        transition : transform 0.5s ease-out;
        overflow: hidden;
      }
    }
  }
  

  /*********Fin modal*********** */

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
  .images-billet{
    display : flex;
    justify-content: center;

    .img-container{
      margin : 10px;
      width : 300px;
      height: 300px;
      cursor : pointer;
      position : relative;
      border : 10px solid #f5f5f5;
      overflow : hidden;

      &::after {
        content : '';
        position : absolute;
        top : 0;
        left : 0;
        width : 100%;
        height : 100%;
        transition : all ease-out 0.3s;
        opacity : 1;
      }
      &:hover::after{
        background-color : rgba(255, 255, 255, 0.35);
      }
    }
  }
`

export default BilletGrilleDisplay
