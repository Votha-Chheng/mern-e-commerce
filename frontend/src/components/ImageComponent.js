import React, { useEffect, useRef, useState } from 'react'

const ImageComponent = ({image, frameWidth, frameHeight}) => {

  const [ratio, setRatio] = useState('')

  const imageRef = useRef(null)

  useEffect(() => {
    if (imageRef.current){
      console.log(imageRef)
    }
    
  }, [] )

  return (
    <img 
      ref={imageRef}
      src={image} 
      alt='modal'
      onLoad={()=>setRatio(imageRef.current.naturalWidth/imageRef.current.naturalHeight)}
      style={{objectFit : "contain", 
      transform : `translateX(${ratio<1 && imageRef.current? (frameWidth - imageRef.current.offsetWidth)/2 : "0"}px) translateY(${ratio>1 && imageRef.current? (frameHeight - imageRef.current.offsetHeight)/2 : "0"}px)`
    }}
      width={ratio>1 ? frameWidth : 'auto'}
      height={ratio>1 ? "auto": frameHeight} 
    /> 
  )
}

export default ImageComponent
