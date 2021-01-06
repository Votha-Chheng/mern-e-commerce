import React from 'react'
import styled from 'styled-components'

const Utils = () => {
  return (
    <Wrapper>
        <ul>
          <li><span>Panier<br/></span><i className="fas fa-shopping-basket"><div className="articles-dans-panier"><Span>0</Span></div></i></li>
          <li><span>Compte<br/></span><i className="fas fa-user-alt"></i></li>
        </ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`

    position: absolute;
    top: 140px;
    right: 0px;
    z-index: 1;

  ul{
    display : flex;
    list-style-type : none;
    padding-right: 50px;
  }
  li {
    padding : 0 10px;
    cursor : pointer;
    color: #C4A77D;
    
  }
  i {
    transform: scale(1.2);
  }
  .articles-dans-panier{
    position: absolute;
    left:12px;
    top: -5px;
    width:15px;
    height:15px;
    border-radius: 50%;
    background-color:red;
    text-align: center;
    
  }
  @media only screen and (max-width: 850px){
    /* top : 80px; */

    ul{
      padding-right: 5px;
    }
    li{
      margin-bottom : 15px;  
    }
  }
  @media only screen and (max-width: 450px){
    ul{
      padding-right: 0px;
    }
    li{
      transform: scale(0.9)  
    }
  }
`
 const Span = styled.div`
  font-size:0.7em;
  text-align: center;
  font-family:'Lato', sans-serif;
  margin-left:2px;
  margin-top:2px;
 `

export default Utils
