import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import styled from 'styled-components'
import Menu from './Menu'

import Utils from './Utils'


const MenuFixe = () => {

  const [scroll, setScroll] = useState(0)

  const {userInfo} = useSelector(state=>state.userLogin)

  useEffect(() => {
    window.onscroll = ()=>{
      setScroll(window.pageYOffset)
    }
  }, [])

  useEffect(()=>{

  }, [userInfo])


  return (
    <Wrapper style={scroll<190?{display:'none'} : {display:'block'}}>
      <div className='menu-container'>
        <div className='menu-fixe-container'>
          <Menu/>
        </div>
        
        <div className='utils-fixe'>
          <Utils scroll={scroll} />
        </div>
      </div>
      
       
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position : sticky;
  top: 0px;
  width: 100%;
  height : 50px;
  padding-top : 15px;
  background-color : #0C1B33;
  z-index: 18000000000000;

  .menu-container{
    display : flex ;
    justify-content: space-between;

    .utils-fixe{
      transform : scale(0.9) translateY(-15px)
    }
  }

  @media only screen and (max-width: 640px){
    height : 83px;

    .menu-container{
      flex-direction: column-reverse;
      justify-content: center;
      align-items: center;

      .menu-fixe-container{
        transform : translateY(-15px)
      }

      .utils-fixe{
        height: 50px;
      }
    }
    
  }
`

export default MenuFixe
