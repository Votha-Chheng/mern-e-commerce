import React, {useState} from 'react'
import { useRef } from 'react'
import styled from 'styled-components'
import Modal from '../components/Modal'
import ImageComponent from './ImageComponent'
import LoaderSpin from './LoaderSpin'

const CarouselImageProduit = ({images, loading}) => {

  const [indexImg, setIndexImg] = useState(0)
  const [indexModal, setIndexModal] = useState(0)
  const [modal, setModal] = useState(false)


  return (
    <Wrapper>
      {
        modal && (
          <Modal>
            <div className='image-frame-modal' >
              <i className="fas fa-times-circle close" onClick={() => setModal(false)} />
              <div className='right' onClick={() => setIndexModal(indexModal === images.length-1 ? 0 : indexModal+1)}>
                <i className="fas fa-chevron-circle-right"/>
              </div>
              <div className='left' onClick={() => setIndexModal(indexModal === 0 ? images.length-1 : indexModal-1)}>
                <i className="fas fa-chevron-circle-left"></i>
              </div>
              <div 
                className='images-queue-modal' 
              >
                {
                  loading ? <LoaderSpin/> :
                  images.map((image, index)=> (
                    <div 
                      key={index} 
                      className='main-container-images-modal'
                      style={{transform: `translateX(${indexModal * -100}%)`}}
                    >
                      <ImageComponent
                        image={image}
                        frameHeight='900'
                        frameWidth ='900'
                      />
                    </div>
                  ))
                } 
              </div>
            </div>
          </Modal>        
        ) 
      }

      <div className='carousel-container'>
        <div className='image-frame' >
          <div className='images-queue'>
          { 
            loading ? <LoaderSpin/> :
            images.map((image, index) => (
              <div 
                key = {index} 
                className='main-container-images' 
                onClick={()=>{
                  setModal(true)
                  setIndexModal(indexImg)
                }} 
                style={{transform: `translateX(${indexImg * -100}%)`}}
                >
                <img 
                  src={image} alt ='carousel'
                  height= "450px"
                />
              </div>))
          }
          </div>
        </div>
        
        <div className='images-suite'>    
          {
            loading ? <LoaderSpin/> :
            images.map((image, index) =>(
              <div 
                key = {index} 
                className={`img-container ${indexImg === index ? "active" : "unactive"}` } 
                onClick={()=>{setIndexImg(index)}} 
              >
                <img 
                  src={image} alt ='carousel' 
                  height="150px"
                />
              </div>)
            ) 
          }
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`

  .image-frame-modal{
    position: relative;
    width: 900px;
    height : 900px;
    overflow: hidden;
    display: flex;
    border : 3px solid white;
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

  }
  .main-container-images-modal{
    width : 900px;
    display : flex;
    justify-content : center;
    transition : transform 0.5s ease-out;
  }
  .close{
    position :absolute;
    z-index: 9999999;
    cursor: pointer;
    transform : scale(2);
    top :10px;
    right :10px;
  }

/**********Carousel*******/

  .image-frame{
    width: 490px;
    height: 450px;
    margin-bottom : 15px;
    overflow: hidden;
    display: flex;
    border : 3px solid white;
  }
  .images-queue{
    width: 100%;
    height : 100%;
    display: flex;
    transition: transform 0.3s ease-in-out;
  }
  
  .main-container-images{
    display: flex;
    min-width: 100%;
    height: 100%;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
    transition : transform 0.5s ease-out;
  }
  
  .images-suite{
    display: flex;
    justify-content: center;
    width: 490px;
    border : 1px solid #dce3e5;
  }
  .img-container{
    position : relative;
    margin-bottom : 0;
    width : 160px;
    height : 150px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    margin : 0 2px;
    
  }
  .img-container.unactive::after{
    content:"";
    position : absolute;
    width : 100%;
    height : 100%;
    background-color : rgba(255,255,255,0.4);
  }
  .img-container.active::after{
    content:"";
    position : absolute;
    width : 100%;
    height : 100%;
    background-color : none;
  }
  
  @media only screen and (max-width: 920px){
    .image-frame-modal{
      width : 700px;
      height : 100%;
      background-color : none;
      .main-container-images-modal{
        width : 700px;
        overflow : hidden;
      }
    }
  }

  @media only screen and (max-width: 720px){
    .image-frame-modal{
      width : 500px;
      max-height : 100vh;
      .main-container-images-modal{
        width : 500px;
        overflow : hidden;
        img{
          object-fit : contain;
          width : 500px;
        }
      }
    }
  }

  @media only screen and (max-width: 570px){
    max-width : 340px;
    overflow: hidden;

    .image-frame-modal{
      width : 400px;
      max-height : 100vh;
      .main-container-images-modal{
        width : 400px;
        overflow : hidden;
        img{
          object-fit : contain;
          width : 400px;
        }
      }
    }
    .carousel-container{
      width : 340px;
      overflow : hidden;
      
      .image-frame{
        width : 100%;
      }
      .images-suite{
        width : 340px;
      }
    }
  }

  @media only screen and (max-width: 420px){
    .image-frame-modal{
      width : 360px;
      max-height : 100vh;
      .main-container-images-modal{
        width : 360px;
        overflow : hidden;
        img{
          object-fit : contain;
          width : 360px;
        }
      }
    }
  }
`

export default CarouselImageProduit
