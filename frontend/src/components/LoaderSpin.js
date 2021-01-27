import React from 'react'
import styled from 'styled-components'
import spinner from '../images/spinner.gif'

const LoaderSpin = () => {

  const spinning = {
    initial : {

    }
  }

  return (
    <Wrapper>
      <img src={spinner} alt='loading' width='50px'/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width : 50px;
  margin: 0 auto;

`

export default LoaderSpin
