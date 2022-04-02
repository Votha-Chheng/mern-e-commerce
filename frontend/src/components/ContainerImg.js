import React, {useState } from 'react'
import styled from 'styled-components'

const ContainerImg = ({frameWidth, imageUrl, frameHeight}) => {

  const [ref, setRef] = useState('')
  const [ratio, setRatio] = useState('')

  return (
    <Container>
      <img
        src={imageUrl}
        alt = 'illustration'
        width={ratio>1 ? 'auto' : frameWidth}
        height={ratio>1 ? frameHeight : 'auto'}
        ref={newRef => setRef(newRef)}
        onLoad={()=>setRatio(ref.offsetWidth/ref.offsetHeight)}
        style = {
          ref.offsetWidth<frameWidth && ref.offsetHeight<frameHeight ? null :
          ratio<1 ? 
          {transform : `translateY(-${(ref.offsetHeight-frameHeight)/4}px)`} :
          {transform : `translateX(-${(ref.offsetWidth-frameWidth)/4}px)`}
        }
      />
    </Container>
  )
}

const Container = styled.div`

`

export default ContainerImg
