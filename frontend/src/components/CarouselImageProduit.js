import React, {useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import Modal from '../components/Modal'

const CarouselImageProduit = ({images}) => {
  const [imagesArray, setImagesArray] = useState([])
  const [ratioArray, setRatioArray] = useState([])
  const [indexImg, setIndexImg] = useState(0)
  const [indexModal, setIndexModal] = useState(0)
  const [modal, setModal] = useState(false)

  const imagesRef = useRef([])
    
  const modalShow = {
    start: {opacity : 0},
    end : {opacity : 1, transition : { ease : 'easeIn', duration:0.2}}
  }


  useEffect(() => {
    setImagesArray(images)
    setRatioArray([])
    const newRatioArray = imagesRef.current.map(image => image.naturalWidth/image.naturalHeight||image.clientWidth/image.clientHeight )
    setRatioArray([newRatioArray])
  },[images, imagesRef])

  // const ratioArray = imagesRef.current.map(image => image.naturalWidth/image.naturalHeight||image.clientWidth/image.clientHeight ) || [1, 1, 1]

  return (
    <Wrapper>
      {
        modal && (
          <motion.div className='modal-container' variants={modalShow} initial='start' animate='end' >
              <Modal>
                <div className='image-frame-modal' >
                <i className="fas fa-times-circle close" onClick={() => setModal(false)} />
                  <div className='right' onClick={() => setIndexModal(indexModal === imagesArray.length-1 ? 0 : indexModal+1)}>
                    <i className="fas fa-chevron-circle-right"/>
                  </div>
                  <div className='left' onClick={() => setIndexModal(indexModal === 0 ? imagesArray.length-1 : indexModal-1)}>
                    <i className="fas fa-chevron-circle-left"></i>
                  </div>
                  <div 
                    className='images-queue-modal' 
                    style={{transform: `translateX(${indexModal * -100}%)`}}
                  >
                    {
                      imagesArray.map((image, index)=> (
                        <div key={index} 
                          className='main-container-images-modal'
                        >
                          <img 
                            src={image} 
                            alt='modal'
                            width={ratioArray[index]>1? "880px" : "auto"} 
                            height={ratioArray[index]>1 ? "auto" : "880px"} 
                          />
                        </div>
                      ))
                    } 
                  </div>
                </div>
              </Modal>     
          </motion.div>
          
        ) 
      }

      <div className='carousel-container'>
        <div className='image-frame'>
          <div className='images-queue' 
          style={{transform: `translateX(${indexImg * -100}%)`}} 
          >
          {
            imagesArray.map((image, index) => (
              <div 
                key = {index} 
                className='main-container-images' 
                onClick={()=>{
                  setModal(true)
                  setIndexModal(indexImg)
                }} >
                <img 
                  onLoad = {()=> setImagesArray(images)} 
                  ref={element => imagesRef.current[index] = element} 
                  src={image} alt ='carousel'
                  width={ratioArray[index]>1? "490px" : "auto"} 
                  height={ratioArray[index]>1 ? "auto" : "450px"} 
                />
              </div>))
          }
          </div>
        </div>
        
        <div className='images-suite'>    
          {
            imagesArray.map((image, index) =>(
              <div 
                key = {index} 
                className={`img-container ${indexImg === index ? "active" : "unactive"}` } 
                onClick={()=>{setIndexImg(index)}} 
              >
                <img 
                  onLoad = {()=> setImagesArray(images)} 
                  ref={element => imagesRef.current[index] = element} 
                  src={image} alt ='carousel' 
                  width={ratioArray[index]>1? "150px" : "auto"} 
                  height={ratioArray[index]>1 ? "auto" : "150px"} 
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
  /**********Modal*****/
  .modal-container {
    z-index: 80000000000000;
    top: 0px;
    left: 0px;
    position: fixed;
    width: 100%;
    height: 100%;
    display : flex;
    justify-content: center;
    background-color : rgba(0,0,0,0.5);
    padding : 20px 20px;
  }

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
    transition : transform 0.3s ease-out;
  }
  .main-container-images-modal{
    min-width : 900px;
    display : flex;
    justify-content : center;
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
    transition: transform 0.5s ease-in-out;
  }
  
  .main-container-images{
    display: flex;
    min-width: 100%;
    height: 100%;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
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

`

export default CarouselImageProduit
