import React, { useCallback, useEffect } from 'react'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import ModalForm from './ModalForm'
import { loginModal } from '../actions/loginModalAction'
import { capitalize, diminuerLongueurString } from '../fonctionsOutils'
import { logout } from '../actions/userActions'
import Loader from './Loader'

const Utils = () => {


  const dispatch = useDispatch()

  const cart = useSelector(state=>state.cart.cartItems)
  const {showModalLogin} = useSelector(state=>state.showModalLogin)
  const {userInfo, error, loading} = useSelector(state=>state.userLogin)

  const clickCompte =  useCallback(()=>{
    dispatch(loginModal())
    window.scrollTo(0,0)
  },[dispatch])

  // const clickCompte = ()=>{
  //   dispatch(loginModal())
  //   window.scrollTo(0,0)
  // }

  return (
    <Wrapper>
        <ul>
          <NavLink to='/panier'>
            <li>
              <span>Panier<br/></span>
              <i className="fas fa-shopping-basket">
              {
                cart.length !==0 ? <div className="articles-dans-panier"><Span>{cart.length}</Span></div> : ""
              }
              </i>
            </li>
          </NavLink>
          { 
            loading ? <Loader/>:
            error? <h3>{error}</h3> :
            userInfo ? 
              <NavLink to='/profil'><li><span>{diminuerLongueurString(capitalize(userInfo.prénom),7)}<br/></span><i className="fas fa-user-alt"></i></li></NavLink> : 

              <li onClick={()=>clickCompte()}><span>Compte<br/></span><i className="fas fa-user-alt"></i></li>
          }

          {
            userInfo && <li onClick={()=>dispatch(logout())} ><span>Déconnexion</span><br/><i className="fas fa-power-off logout"></i></li>
          }
          
          { showModalLogin && <ModalForm closeModal={()=>dispatch(loginModal())} showModalLogin={showModalLogin} />}
          
        </ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`

  ul{
    display : flex;
    list-style-type : none;
    padding-right: 0px;
    padding-left : 0;
  }
  li {
    padding : 0 10px;
    cursor : pointer;
    color: #C4A77D;
    justify-content: center;
    text-align: center;
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
