import { motion } from 'framer-motion'
import React, { useState } from 'react'
import styled from 'styled-components'
import { formatDate } from '../fonctionsOutils'
import LoaderSpin from './LoaderSpin'
import Commandes from './Commandes'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrdersList } from '../actions/orderActions'
import BullesStats from './BullesStats'

const GestionClients = ({usersList}) => {

  const [indexCommandes, setIndexCommandes] = useState('')
  
  const dispatch = useDispatch()

  const {userOrdersList, loadingUserOrdersList, errorUserOrdersList} = useSelector(state=>state.userOrdersList)

  const displayOrderHandler = (event)=>{
    if(indexCommandes===event.target.id){
      setIndexCommandes('')
    } else {
      setIndexCommandes(event.target.id)
      dispatch(getUserOrdersList(event.target.dataset.id))
      console.log(event.target.dataset.id)
    }
  }

  return ( 
    <Wrapper>
      <div className='bulle-stat'>
        {
          usersList.usersList &&
          <BullesStats items={'clients'} itemsArray={usersList.usersList.slice(1)} icon={"fa fa-user-friends"} />
        }  
      </div>
      <div> 
        {
          usersList.loadingUsersList ? <LoaderSpin/> :
          usersList.errorUsersList ? <div className='alert-danger'>{usersList.errorUsersList}</div> :
          usersList.usersList &&
          usersList.usersList.filter(user=> user.nom && user.prénom !== 'administrateur').map((user, index)=>
            <div key={user._id} className='item-container'>
              <h6>
                Id client : {user._id}
              </h6>
              <div className='client-container' key={index}>
                <div className='item id'>
                  <div>
                    {user.prénom} {user.nom}
                  </div>
                  <div>
                    {user.email}
                  </div>
                  
                </div>
                <div className='item adresse'>
                  {
                    user.adresse.adresse ? 
                    <div>
                      {user.adresse.adresse}<br/>
                      {user.adresse.codePostal} {user.adresse.ville}
                    </div> :
                    <div>
                      Aucune adresse enregistrée.
                    </div>
                  }
                </div>
                <div className='item email-validation'>
                  {
                    user.validationEmail ? 
                    <div className='alert-success'>
                      E-mail vérifié.
                    </div> :
                    <div className='alert-warning'>
                      E-mail non vérifié.
                    </div>
                  }
                </div>
                <div className='item date-inscription'>
                  {
                    user.validationEmail &&
                    <div>
                      Inscrit depuis le <br/>
                      <span>{formatDate(user.createdAt)}</span>
                    </div>
                  }
                </div>
                <div className='item voir-commandes' data-id={user._id} id={index} onClick={(event)=>{displayOrderHandler(event)}}>
                  {indexCommandes === String(index) ? 'Cacher' : 'Voir'} les commandes de cet utilisateur<br/><i className="fas fa-eye"/>
                </div>
              </div>
              <div className={`commandes-client ${indexCommandes === String(index) ? 'display' : ''}`} id={index}>
                {
                  errorUserOrdersList ? <div className='alert-danger text-center h3'>{errorUserOrdersList}</div>:
                  loadingUserOrdersList ? loadingUserOrdersList && <LoaderSpin/> :
                  userOrdersList && userOrdersList.length!==0 ?
                  <>
                    <h5>Commandes passées</h5>
                      {userOrdersList.map((order, index)=> 
                        <Commandes key={index} commande={order}/>
                      )}
                  </> 
                  :
                  <div className='alert-warning text-center h5'>Aucune commande passée.</div>
                  
                }
              </div> 
            </div> 
          )
        }
      </div>
    </Wrapper>  
  )
}

const Wrapper = styled(motion.div)`

  .bulle-stat{
    width : 200px;
    display: flex;
    justify-content: center;
    margin : 20px auto 30px auto;
  }

  .item-container{
    width: 900px;
    margin: 20px auto;

    h6{
      border : 1px solid #b3bdbd;
      padding : 5px 10px;
      margin-bottom : 0px;
      background-color : #e9ecec ;
    }
    
    .client-container {
      border: 1px solid grey;
      margin-bottom : 10px;
      padding : 5px;
      display : flex;
      align-items: center;

      .item:last-child{
        border-right : none;
      }
      .item{
        padding : 5px 10px;
        border-right : 1px solid #dee3e3;
      }
      .id{
        font-family: 'Yanone Kaffeesatz', sans-serif;
        font-size: 1.1em;
        width: 150px;
      }
      .adresse{
        font-weight : bold;
        font-family: 'Poppins', sans-serif;
        width: 210px;
        
      }
      .email-validation{
        width: 150px;
      }
      .date-inscription{
        width: 150px;
        div span{
          font-weight : bold;
        }
      }
      .voir-commandes{
        text-align: center;
        cursor: pointer;
        &:hover{
          color : #b5a6c9;
        }
      }
    }
    .commandes-client.display{
      max-height : 100%;
      transform : translateY(0);
      transition : height 0.5s;
    }
    .commandes-client{
      overflow: hidden;
      max-height: 0;
      transform : translateY(-100%);
      
      h5{
        text-align: center;
      }
    }
  } 
`

export default GestionClients
