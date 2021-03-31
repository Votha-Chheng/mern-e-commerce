import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getFilteredOrders, updateOrdersFilters, updateOrdersPagination } from '../actions/filterActions'
import { formatDate } from '../fonctionsOutils'
import BullesStats from './BullesStats'
import Commandes from './Commandes'
import LoaderSpin from './LoaderSpin'

const GestionCommandes = () => {

  const [userToDisplay, setUserToDisplay] = useState('')
  const [pages, setPages] = useState([])

  const dispatch = useDispatch()

  const {filteredOrders, allOrders, loadingAllOrders, orderFilters, orderPagination} = useSelector(state => state.ordersFiltered)
  const {usersList} = useSelector(state => state.usersList)

  const {error, success} = useSelector(state => state.orderDelivered)

  const {userInfo} = useSelector(state => state.userLogin)



  useEffect(() => {
    dispatch(getFilteredOrders())
        
  },[dispatch, success, orderFilters, orderPagination])

  useEffect(() => {
    if(allOrders){
      const totalPages = Math.floor(allOrders.length/orderPagination.numberOfItemsToDisplay)+1
      let totalPagesArray=[]
      for(let i=0 ; i<totalPages ; i++){
        totalPagesArray.push(i+1)
      }
      setPages(totalPagesArray)
    }
  }, [allOrders])

  console.log(pages)

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

  const changeOrderFilters = (name, value)=>{
    dispatch(updateOrdersFilters(orderFilters, name, value))
  }

  const changeOrderPagination = (name, value)=>{
    dispatch(updateOrdersPagination(orderPagination, name, value))
  }

  console.log(orderFilters)
  return (
    <>
      <Bulles>
        {
          filteredOrders &&
          <BullesStats items={'commandes'} icon={"far fa-credit-card"} itemsArray={allOrders} />
        }
      </Bulles>
      {error && <div className='alert-danger text-center h4 my-2'>{error}</div>}

      <Filters className='filters-container'>
        <div className='tri'>Trier par : </div>
        <div className='filter'>
          <div>Date</div>
          <select 
            name='sortDate' 
            id='sortDate' 
            value={orderFilters.sortDate} 
            onChange={(event)=>changeOrderFilters(event.target.name, event.target.value)}
          >
            <option value='newest'>Récent</option>
            <option value='older'>Anciens</option>
          </select>
        </div>
        <div className='filter'>
          <div>Paiement</div>
          <select
            name='sortPayment' 
            id='sortPayment' 
            value={orderFilters.sortPayment} 
            onChange={(event)=>changeOrderFilters(event.target.name, event.target.value)}
          >
            <option value=''>Aucun filtre</option>
            <option value='paid'>Payée</option>
            <option value='unpaid'>Non-payée</option>
          </select>
        </div>
        <div className='filter'>
          <div>Livraison</div>
          <select
            name='sortShipping' 
            id='sortShipping' 
            value={orderFilters.sortShipping} 
            onChange={(event)=>changeOrderFilters(event.target.name, event.target.value)}
          >
            <option value=''>Aucun filtre</option>
            <option value='delivered'>Livrée</option>
            <option value='undelivered'>Non-Livrée</option>
          </select>
        </div>
        <div className='filter'>
          <div>Nombre</div>
          <select
            name='numberOfItemsToDisplay' 
            id='numberOfItemsToDisplay' 
            value={orderPagination.numberOfItemsToDisplay} 
            onChange={(event)=>changeOrderPagination(event.target.name, +event.target.value)}
          >
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='50'>50</option>
          </select>
        </div>
      </Filters>
      <Pagination>
        {
          pages.map((page, index) => 
            <div 
              className='page' 
              key={index}
              id={index+1}
              style={index === orderPagination.currentPage-1 ? { backgroundColor : "#dde3e3", color : 'grey' } : null}
              data-name ='currentPage'
              onClick={(event) => changeOrderPagination(event.target.dataset.name, (event.target.id))}
            >
              {page}
            </div>
          )
        }
      </Pagination>
      
        {
          loadingAllOrders ? <LoaderSpin/> :
          filteredOrders && filteredOrders.map((order, index)=> 
            <Wrapper key={index}>
              
              <Commandes commande={order} key={index} user={userInfo} />
              
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
const Filters = styled.div`
  display:flex;
  justify-content: center;

  .tri{
    margin-top : 15px;
    margin-right : 15px;
  }
  .filter{
    margin-right : 15px;
    text-align : center;
  }
`

const Pagination = styled.div`
  display:flex;
  justify-content : center;
  margin : 20px auto 0px auto ;

  .page{
    text-align: center;
    color : white;
    background-color : grey;
    width : 20px;
    height : 20px;
    cursor : pointer;
    margin : 2px;
    border : 1px doubl2 #dde3e3;
  }
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
