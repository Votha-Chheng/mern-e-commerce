import React from 'react'
import styled from 'styled-components'
import { convertPrice, formatDate } from '../fonctionsOutils'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LoaderSpin from './LoaderSpin'
import { deliverOrder } from '../actions/orderActions'

const Commandes = ({commande, user}) => {


  const dispatch = useDispatch()

  const {loadOrderDetails} = useSelector(state =>state.orderDetails)
  const {loading} = useSelector(state => state.orderDelivered)
  const {userInfo} = useSelector(state => state.userLogin)


  const setToDelivered = (event)=>{
    dispatch(deliverOrder(event.target.id, userInfo))
  }

  return (
    <Wrapper>
      {
        loadOrderDetails ? <LoaderSpin/> :
        commande ?
        <div className='order'>
          <div className='order-title'>
            <h6>
              <Link to={`/commande/${commande._id}`}>Commande n°{commande._id}</Link>
            </h6>
            <div>
              Passée le : {formatDate(commande.createdAt)}
            </div>
            <div className='item-order envoi'>
              {
                loading ? <LoaderSpin/> :
                commande.isDelivered ? 
                <div className='alert-success text-center h4 my-2'>Envoyé le {commande.deliveredAt && formatDate(commande.deliveredAt)}</div> : 
                user.isAdmin ? 
                <button 
                  id={commande._id} 
                  className='btn btn-block btn-danger rounded my-2' 
                  onClick={(event)=>setToDelivered(event)} 
                >
                  Marquer comme envoyé
                </button> :
                <div className='alert-danger h4 text-center my-2'>Commande en préparation</div>
              }
            </div>
          </div>
          <div className='order-items-container'>
            {
              commande.produitsCommande.map((item, index) => 
                <div className='order-items 'key={index} style={!commande.isDelivered ? {backgroundColor :"#f8c9c9"} : null}>
                  <div className='order-items-image'>
                    <Link to={`/produit/${item.product}`}>
                      <img src={item.image} alt={item.nom} width="50"/>
                    </Link>
                  </div>
                  <div className='item-order nom'>
                    <span>{item.nom}</span><br/> (couleur : {item.couleur? item.couleur : "aucune"})
                  </div>
                  <div className='item-order prix'>
                    <div>{item.qty} x {convertPrice(item.prix)} =</div><div className='text-right font-weight-bold' >{convertPrice(item.prix*item.qty)}€</div> 
                  </div>
                </div>
              )
            }
          </div>
          <div className='footer-order'>
            <div className='point-relais'>
              <h5>Point relais : </h5>
              <div>
                {commande.pointRelais.nom}
              </div>
              <div>
                {commande.pointRelais.adresse}
              </div>
              <div>
                {commande.pointRelais.codePostal} {commande.pointRelais.ville}
              </div>
            </div>
            <div className='total-commande'>
              <div className='content'>
                <div>
                  Frais de port :
                </div> 
                <div>
                  {convertPrice(commande.fraisDePort)} €
                </div>
              </div>
              <div className='content'>
                <div>
                  Total commande :
                </div>
                <div className='alert-success'>
                  {convertPrice(commande.prixTotal)}€
                </div>  
              </div>  
            </div>
          </div>
          
        </div> :
        <h5>Une erreur est survenue.</h5>
      }
    </Wrapper> 

  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border : 1px solid grey;
  width : 520px;
  padding : 15px;
  margin : 20px auto;
  
  .order-title{

  }
  .order-items-container div.order-items:last-child{
    border-bottom : 1px solid grey;
  }
  .order-items-container{
    
    .order-items{
      display: flex;
      width: 100%;
      border-top : 1px solid grey;
      padding : 10px 0;
      align-items: center;
      justify-content: space-between;

      .order-items-image{
        width : 50px;
        height: 60px;
        overflow: hidden;
        text-align: center;
        border : 3px solid #d3d9d9;
      }
      .item-order{
        margin-left : 5px;
        padding-left: 5px;
      }
      .item-order.nom{
        width : 50%;
        span{
          font-weight: bold;
          color: black;
        }
      }
      .item-order.prix{
        border-left:1px solid #d3d9d9;
        width : 35%;
      }
    }
  }
  .footer-order{
    margin-top : 10px;
    display : flex;
    justify-content: space-between;

    .point-relais{
      width : 50%;
      div{
        font-weight:bold;
        color:black;
        font-style : 'Lato', sans-serif;
      }
    }
    .total-commande{
      width : 50%;
      border-left : 1px solid #d3d9d9;
      padding-left : 10px;

      .content div:first-child{
        text-align: left;
        font-weight: bold;
      }
      .content div:last-child{
        text-align: right;
        font-weight: bold;
        color: black;
        font-size:1.1em;
      }
    }
  

  }
  
  
`

export default Commandes
