import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getFilteredOrders } from '../actions/filterActions'
import { formatDate } from '../fonctionsOutils'
import BullesStats from './BullesStats'
import Commandes from './Commandes'
import LoaderSpin from './LoaderSpin'

const GestionCommandes = () => {

  const [userToDisplay, setUserToDisplay] = useState('')

  const dispatch = useDispatch()

  const {filteredOrders, loadingAllOrders} = useSelector(state => state.ordersFiltered)
  const {usersList} = useSelector(state => state.usersList)

  const {error, success} = useSelector(state => state.orderDelivered)



  useEffect(() => {
    dispatch(getFilteredOrders())
  },[dispatch, success])

  const displayUser = useCallback((event)=>{
    event.preventDefault()
    if(userToDisplay === event.target.id){
      setUserToDisplay('')
    } else {
      setUserToDisplay('')
      setUserToDisplay(event.target.id)
    }  
    
  },[userToDisplay])


  const getUserWithRelatedOrder = (users, orderObj)=>{
    return users.filter(client => client._id === orderObj.client)[0]
  }



  console.log(filteredOrders)
  return (
    <>
      <Bulles>
        {
          filteredOrders &&
          <BullesStats items={'commandes'} icon={"far fa-credit-card"} itemsArray={filteredOrders} />
        }
      </Bulles>
      {error && <div className='alert-danger text-center h4 my-2'>{error}</div>}
      {
        loadingAllOrders ? <LoaderSpin/> :
        
        filteredOrders.map((order, index)=> 
          <Wrapper key={index}>
            
            <Commandes commande={order} key={index} />
            
            <button id={order._id} onClick={(event)=>displayUser(event)} className='btn btn-primary w-100'>Voir/Masquer le client associé à la commande</button><br/><br/>
            {
              usersList && 
              <div className={`infos-client ${userToDisplay === order._id? 'with-height':'no-height'}`}>
                <div style={{ border : '1px solid grey', padding:'5px', fontWeight:"bold"}}>
                  N° client : {getUserWithRelatedOrder(usersList, order)._id}
                </div>
                <div className={`client-container`} key={index}>
                  <div className='item id'>
                    <div>
                      {getUserWithRelatedOrder(usersList, order).prénom} {getUserWithRelatedOrder(usersList, order).nom}
                    </div>
                    <div>
                      {getUserWithRelatedOrder(usersList, order).email}
                    </div>
                    
                  </div>
                  <div className='item adresse'>
                    {
                      getUserWithRelatedOrder(usersList, order).adresse.adresse ? 
                      <div>
                        {getUserWithRelatedOrder(usersList, order).adresse.adresse}<br/>
                        {getUserWithRelatedOrder(usersList, order).adresse.codePostal} {getUserWithRelatedOrder(usersList, order).adresse.ville}
                      </div> :
                      <div>
                        Aucune adresse enregistrée.
                      </div>
                    }
                  </div>
                  <div className='item email-validation'>
                    {
                      getUserWithRelatedOrder(usersList, order).validationEmail ? 
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
                      getUserWithRelatedOrder(usersList, order).validationEmail &&
                      <div>
                        Inscrit depuis le <br/>
                        <span>{formatDate(getUserWithRelatedOrder(usersList, order).createdAt)}</span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            }  
          </Wrapper>
        )
      }
    </>
  )
}

const Bulles = styled.div`
  width : 200px;
  display: flex;
  justify-content: center;
  margin : 20px auto 30px auto;
`

const Wrapper = styled.div`
  width : 520px;
  margin : 50px auto;

  .btn{
    margin-top:-20px;
  }
  .no-height{
    height : 0;
  }
  .with-height{
    height : 100%;
  }
  .infos-client{
    width : 520px;
    margin : 0px auto;
    overflow: hidden;
  }
  .client-container {
    border: 1px solid grey;
    margin-bottom : 10px;
    padding : 5px;
    display : flex;
    align-items: center;
    width : 520px;
    overflow: hidden;
    transition : height 1s;

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
`

export default GestionCommandes
