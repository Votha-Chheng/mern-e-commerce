import React, { useRef, useState } from 'react'

const ImageModalComponent = ({frameWidth, frameHeight, image}) => {
  const [ratio, setRatio] = useState('')

  const imageRef = useRef(null)

  return (
    <img 
      ref={imageRef}
      src={image} 
      alt='modal'
      onLoad={()=>setRatio(imageRef.current.naturalWidth/imageRef.current.naturalHeight)}
      style={{objectFit : "contain"}}
      width={ratio>1 ? frameWidth : 'auto'}
      height={ratio>1 ? "auto": frameHeight} 
    /> 
  )
}

export default ImageModalComponent
