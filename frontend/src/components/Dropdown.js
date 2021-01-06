import React from 'react'
import styled from 'styled-components'

const Dropdown = ({classProps}) => {
  return (
    <NavStyle >
      <nav className={classProps.dropdown}>
        <ul>
          <li className={classProps.li}>Accueil</li>
          <li className={classProps.li}>Boutique</li>
          <li className={classProps.li}>Qui suis-je ?</li>
          <li className={classProps.li}>Blog</li>
        </ul>
      </nav>
    </NavStyle>
  )
}

const NavStyle = styled.div`
  nav{
    position: absolute;
    width: 100%;
    top: 0px;
    left: 0px;
    height: 0px;
    visibility:hidden;
    transition: all 0.3s ease-in-out;
    z-index: 0;
    transform: translateY(190px);
  }
  ul{
    width: 100%;
    height: 100%;
    padding-left:0;
    padding-top : 10px;
    background-color: #0C1B33;
    
  }
  .down{
    visibility:visible;
    z-index: 80;
    height: 190px;
    opacity : 1;
  }
  li{
    text-align : center;
    color : #C4A77D;
    list-style: none;
    font-size : 1.8em;
    cursor : pointer;
    opacity : 0;
  }
  .fade{
    transition: all 0.8s ease-in-out;
    opacity : 1;
  }
`

export default Dropdown
