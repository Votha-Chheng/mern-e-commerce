import React, {useEffect, useState, useRef} from 'react'
import styled from 'styled-components'

const CarouselImageProduit = ({images}) => {
  const [imagesArray, setImagesArray] = useState([])

  const imagesRef = useRef([])
    
  useEffect(() => {
    setImagesArray(images)
    console.log(imagesRef.current)
    window.onload = ()=>{
      console.log(imagesRef.current)
    }
  }, [images, imagesRef])

  
  return (
    <Wrapper>
      <div className='carousel-container'>
        <div className='main-image'>
          
        </div>
        <div className='images-suite'>    
          {imagesArray.map((image, index) => <div key = {index} className='img-container'><img ref={element => imagesRef.current[index] = element} src={image} alt ='carousel' width='100px'/></div>)}
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
.images-suite{
  display: flex;
}
.img-container{
  margin-bottom : 0;
  width : 160px;
  height : 150px;
  border : 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
}
img{

}
`

export default CarouselImageProduit
