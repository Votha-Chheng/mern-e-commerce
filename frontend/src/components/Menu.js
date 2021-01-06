import React from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

const Menu = () => {
  return (
    <Wrapper>
        <ul>
          <NavLink to='/'><li>Accueil</li></NavLink>
          <NavLink to='/boutique'><li>Boutique</li></NavLink>
          <NavLink to='/presentation'><li>Qui suis-je ?</li></NavLink>
          <NavLink to='/blog'><li>Blog</li></NavLink>
        </ul>
    </Wrapper>
    
  )
}

const Wrapper = styled.nav`
  margin: 0 px;
  z-index: 100000;
  flex-direction: row;
  justify-content :space-between;
  width: 500px;
  position : absolute;
  top: 160px;
  left: 0px;
  
  ul {
    display: flex;
    flex-direction : row;
    margin-left: 15px;
    padding-left :0px;
  }
  li{
    color:#C4A77D;
    list-style-type: none;
    padding-right : 18px;
    font-size : 1.2em;
    cursor: pointer;
    font-family:'Oswald', sans-serif;
  }
  @media only screen and (max-width: 1000px){
    display : none;
  }
`

export default Menu
