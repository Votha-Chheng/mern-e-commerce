import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

const CarouselImageProduit = ({images}) => {
  const [imagesArray, setImagesArray] = useState([])
    
  useEffect(() => {
    setImagesArray(images)
  }, [images])

  return (
    <div>
      <div className='carousel-container'>
        <div className='main-image'>
          
        </div>
        <div className='images-suite'>
          
          {

          imagesArray.map((image, index) => <div key={index}><img src={require('/images/47d.png')} alt ='carousel' width='100px'/></div>)
          }
        </div>
      </div>
    </div>
  )
}

export default CarouselImageProduit
