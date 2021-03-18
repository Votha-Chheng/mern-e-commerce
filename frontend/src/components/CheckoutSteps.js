import React from 'react'
import styled from 'styled-components'

const CheckoutSteps = ({step1, step2, step3, step4}) => {
  return (
    <NavStyle>
      <li>
        <div className={`block ${step1 && "active"}` }>    
          <div className='step'>1</div>
        </div>
      </li>
      <div className={`link ${step1 && "active"}` }></div>
      <li>
        <div className={`block ${step2 && "active"}` }>    
          <div className='step'>2</div>
        </div>
      </li>
      <div className={`link ${step3 && "active"}` }></div>
      <li>
        <div className={`block ${step3 && "active"}` }>    
          <div className='step'>3</div>
        </div>
      </li>
      
    </NavStyle>
  )
}

const NavStyle = styled.nav`
  margin : 20px auto;
  display : flex;
  align-items: center;

  li{
    list-style: none;

    h6{
      text-align: center;
      margin-left : -5px;
    }
  }

  .block{
    width : 50px;
    height : 50px;
    /* background-color : #0C1B33; */
    
    position: relative;
    border-radius : 50%;
    border : 1px solid #d3d9d9; 

    .step{
      width : 30px;
      background-color: white;
      height : 30px;
      top: 9px;
      left: 9px;
      text-align: center;
      padding : 4px;
      position: absolute;
      border-radius : 50%;
      border : 1px solid #d3d9d9; 
    }
    
  }
  .link{
    width : 50px;
    height : 10px;
    margin-left : -1px;
    margin-right : -1px;
    border-top : 1px solid #d3d9d9;
    border-bottom : 1px solid #d3d9d9;
    background-color: white; 
    z-index: 1;
  }
  .active{
    background-color: #D0D6B5;
  }
`

export default CheckoutSteps
