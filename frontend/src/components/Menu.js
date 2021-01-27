import React from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

const Menu = () => {
  return (
    <Wrapper>
        <ul>
          <NavLink className='item' to='/'><li>Accueil</li></NavLink>
          <NavLink className='item' to='/produits'><li>Boutique</li></NavLink>
          <NavLink className='item' to='/presentation'><li>Qui suis-je ?</li></NavLink>
          <NavLink className='item' to='/blog'><li>Blog</li></NavLink>
        </ul>
    </Wrapper>
    
  )
}

const Wrapper = styled.nav`
  
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
  .item:hover{
    text-decoration: none !important;
  }

`
export default Menu
