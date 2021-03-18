import React from 'react'
import styled from 'styled-components'

const GrilleDisplay = () => {
  return (
    <Wrapper>
      <h6 className='text-center mb-3'>TITRE</h6>
      <div className='images-group mb-2'>
        <div className='image' id='im-1'></div>
        <div className='image' id='im-2'></div>
        <div className='image' id='im-3'></div>
      </div>
      <div className='sous-titre mb-2'><u>Sous titre</u></div>
      <div className='texte'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
      
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  padding: 5px 10px;
  
  .sous-titre{
    font-size: 10px;
    font-weight: bold;
  }
  .texte{
    font-size: 8px;
  }
  .images-group{
    display: flex;
    .image{
      margin: 0 auto; 
      background-color : #c6e1fb;
      border : 2px solid #f5f5f5;
      margin-bottom : 3px;
    }
    #im-1{
      width : 40px;
      height : 50px;
    }
    #im-3{
      width : 65px;
      height : 50px;
    }
    #im-2{
      width : 80px;
      height : 50px;
    }
  }
  
`

export default GrilleDisplay
