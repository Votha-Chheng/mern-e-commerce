import React from 'react'
import logo from '../images/logoCavallo.svg'
import styled from 'styled-components'

const Logo = () => {

  return (
    <Wrapper>
      <div  className='logo-container'>
        <img src={logo} alt="logo-luminaires-Cavallo" width="380" />
        <h1 >Luminaires Cavallo</h1>
      </div>
    </Wrapper>
    
  )
}

const Wrapper = styled.div`
  .logo-container{
    display : flex;
    flex-direction : column;
    margin : 0 auto;
    
  }
  img{
    text-align:center;
  }
  h1 {
    color: #C4A77D;
    text-align:center;
    font-size : 2.3em;
    margin-top : 5px;
    border-top : 1px solid #C4A77D;
  }
  @media only screen and (max-width: 680px){
    margin-top : -20px;

    img, h1{
      width : 250px
    }
    h1{
      font-size : 1.29em;
    }
  }
  @media only screen and (max-width: 450px){

    img, h1{
      width : 220px
    }
    h1{
      font-size : 1.09em;
    }
  }
`

export default Logo
