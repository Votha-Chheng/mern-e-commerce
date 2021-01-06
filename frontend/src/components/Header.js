import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Menu from './Menu'
import Logo from './Logo.js'
import Utils from './Utils'
import burgerImg from '../images/Hamburger_icon.svg'
import Dropdown from './Dropdown'

const Header = () => {

  const [show, setShow] = useState(true)

  useEffect(() => {
    setShow(true)
  }, [])

  const handleBurger = ()=>{
    setShow(!show)
  }

  const showBurger = ()=>{
    let position = {}
    if(show){
      position.burger = 'visible'
      position.cross = 'non-visible'
      position.dropdown = ''
      position.li = ''
    } else {
      position.burger = 'non-visible'
      position.cross =  'visible'
      position.dropdown = 'down'
      position.li = 'fade'
    }
    return position
  }

  return (
    <Wrapper>
      <div className='header'>
        <Menu className='menu'/>
        <div className={" burger "+showBurger().burger} onClick={handleBurger}>
          <img src={burgerImg} alt='burger-menu' />
        </div>
        <i  className={"fas fa-times fa-2x cross " + showBurger().cross} onClick={handleBurger}></i>
        <Logo/>
        <Utils/>
        <Dropdown classProps={showBurger()}/>
      </div>
        
    </Wrapper>
  )
}

const Wrapper = styled.header`
  .header{
    position : relative;
    display : flex;
    flex-direction : row;
    background-color : #0C1B33;
    width: 100%;
    height: 190px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    text-align : center;
    width: 100%;
    height: 190px;
    transition : all 1s;
    z-index: 90000000;
  }
  .burger {
    position : absolute;
    opacity: 1;
    width: 100 px;
    transform : translateY(-1500px)
  }
  .cross{
    position : absolute;
    opacity: 0;
    color: #C4A77D;
    transform : translateY(-1500px);
  }

  @media only screen and (max-width: 1000px){
    .burger{
      left: 10px;
      bottom: 5px;
      cursor: pointer;
      transform : translateY(0);
      transition : all 0.5s;
      
    }
    .cross{
      left: 15px;
      bottom: 5px;
      cursor: pointer;
      transition : all 0.5s;
      transform : translateY(0);
    }
    .visible{
      display : block;
      opacity:1;
      
    }
    .non-visible {
      transform : rotate(90deg);
      opacity:0;
    }
  }
  
`

export default Header
