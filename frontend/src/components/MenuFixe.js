import React, { useState, useEffect } from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'


const MenuFixe = () => {

  const [scroll, setScroll] = useState(0)

  const handleClick =()=>{
    window.scrollTo(0,0)
  }

  useEffect(() => {
    window.onscroll = ()=>{
      setScroll(window.pageYOffset)
    }
  }, [])

  let classProps = ''
  if(scroll<190){
    classProps = 'invisible'
  } else {
    classProps = ''
  }
  return (
    <Wrapper>
      <nav className={classProps} >
        <ul>
          <div className='li-items'>
            <NavLink to='/' onClick={handleClick}><li>Accueil</li></NavLink>
            <NavLink to='/produits' onClick={handleClick}><li>Boutique</li></NavLink>
            <NavLink to='/presentation' onClick={handleClick}><li>Qui suis-je ?</li></NavLink>
            <NavLink to='/blog' onClick={handleClick}><li>Blog</li></NavLink>
          </div>
          <div className='utils'>
            <li><i className="fas fa-shopping-basket"><div className="articles-dans-panier"><Span>0</Span></div></i></li>
            <li><i className="fas fa-user-alt"></i></li>
          </div> 
        </ul>
      </nav>
       
    </Wrapper>
  )
}

const Wrapper = styled.div`
    position : sticky;
    top: 0px;
    width: 100%;
    background-color : #0C1B33;
    z-index: 18000000000000;
  nav{
    padding-top:10px;
    border-top : 1px solid #C4A77D;
  }
  ul{
    width: 100%;
    list-style:none;
    padding-left : 0;
    padding-bottom : 8px;
    display:flex;
    flex-direction:row;
    justify-content:center;
  }
  .li-items{
    display:flex;
    width: 100%;
    justify-content:flex-start;
    font-size : 1.2em;
    text-align:center;
  }
  li{
    color : #C4A77D;
    width: 100%;
    cursor: pointer;
    margin-right:30px;
  }
  .utils{
    display : flex;
    justify-content: center;
  }
  .utils li{
    margin-right:25px;
    
  }
  .fas.fa-shopping-basket{
    position: relative;
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
    z-index: 100000000000;
  }
  .invisible{
    display : none;
  }
  @media only screen and (max-width: 450px){
    ul{
      flex-direction : column-reverse;
    }
    .li-items{
      display : flex;
      justify-content:center;
      text-align: center;
      margin-top:10px;
      font-size:0.9em;
    }
    .utils{
      width: 20%;
      margin :0px auto;
    }
  }
`
const Span = styled.div`
  font-size:0.7em;
  text-align: center;
  font-family:'Lato', sans-serif;
  margin-left:2px;
  margin-top:2px;`

export default MenuFixe
