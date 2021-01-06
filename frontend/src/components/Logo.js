import React, {useEffect, useState} from 'react'
import logo from '../images/logoCavallo.svg'
import styled from 'styled-components'


const Logo = () => {

  const [hidden, setHidden] = useState(true)

  useEffect(() =>{
    setTimeout(()=>{
      setHidden(false)
    }, 500)
    
  }, [])

  return (
    <Wrapper>
      <img src={logo} alt="logo-luminaires-Cavallo" width="380" className = {hidden ? "up":""}/>
      <h1 className={hidden ? "down":""} >Luminaire Cavallo</h1>
    </Wrapper>
    
  )
}

const Wrapper = styled.div`
  display : flex;
  flex-direction : column;
  margin : 0 auto;
    
  .up{
    transform : translateY(-100%);
    opacity : 0;
  }
  .down{
    transform : translateY(100%);
    opacity : 0;
  }
  img{
    transform : translateY(0);
    transition: all 2s ease-out;
    opacity : 1;
    text-align:center;
  }
  h1 {
    color: #C4A77D;
    text-align:center;
    font-size : 2.3em;
    margin-top : 5px;
    border-top : 1px solid #C4A77D;
    opacity : 1;
    transition: all 2s ease-out;
  }
  @media only screen and (max-width: 680px){
    margin-top : -20px;

    img, h1{
      width : 250px
    }
    h1{
      font-size : 1.35em;
    }
  }
  @media only screen and (max-width: 450px){

    img, h1{
      width : 220px
    }
    h1{
      font-size : 1.14em;
    }
  }
`

export default Logo
