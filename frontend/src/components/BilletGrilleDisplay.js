import React, { useState } from 'react'
import styled from 'styled-components'
import { formatDate } from '../fonctionsOutils'
import Modal from './Modal'
import ImageComponent from './ImageComponent'
import ImageModalComponent from './ImageModalComponent'

const BilletGrilleDisplay = ({billet}) => {

  const [indexModal, setIndexModal] = useState(0)
  const [modal, setModal] = useState(false)

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
            <div className='images-queue-modal'>
              { 
                billet &&
                billet.photos.map((image, index)=> (
                  <div 
                    key={index} 
                    className='main-container-images-modal'
                    style={{transform: `translateX(${indexModal * -100}%)`}}
                  >
                    <div className='text-center mt-5 legende'>{image.legende}</div>
                    <div className='text-center modal-component'>
                      <ImageModalComponent
                        image = {image}
                        frameWidth = "900"
                        frameHeight = "900"
                      />
                    </div>
                    
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
            billet &&
            billet.photos.map((photo, index)=>
              <div 
                key={index} 
                className='img-container' 
                onClick={() => {
                  setModal(prev=>!prev)
                  setIndexModal(index)
                }}
              >
                <ImageComponent
                  image = {photo.url}
                  frameWidth = "280"
                  frameHeight = "280"
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
    max-height : 900px;
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
    flex-wrap : wrap;

    .img-container{
      margin : 10px;
      width : 300px;
      height: 300px;
      cursor : pointer;
      position : relative;
      border : 10px solid #f5f5f5;
    //  overflow : hidden;

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
  @media only screen and (max-width: 920px){
    .image-frame-modal{
      width : 700px;
      height : 100%;
      background-color : none;
      .main-container-images-modal{
        width : 700px;
        overflow : hidden;
        .legende, .modal-component{
          width : 700px
        }
        .modal-component{
          img{
            width :700px;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 720px){
    .image-frame-modal{
      width : 500px;
      background-color : none;
      .main-container-images-modal{
        width : 500px;
        overflow : hidden;
        .legende, .modal-component{
          width : 500px
        }
        .modal-component{
          img{
            width :500px;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 520px){
    .image-frame-modal{
      width : 360px;
      background-color : none;
      .main-container-images-modal{
        width : 360px;
        overflow : hidden;
        .legende, .modal-component{
          width : 360px
        }
        .modal-component{
          img{
            width :360px;
          }
        }
      }
    }
  }
`

export default BilletGrilleDisplay
