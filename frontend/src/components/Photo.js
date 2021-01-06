import React from 'react'

const Photo = ({src, alt, width, classStyle, id}) => {

  return (
    <>  
      <img src={src} alt={alt} width={width} className={classStyle} id={id} />   
    </>
  )
}

export default Photo
