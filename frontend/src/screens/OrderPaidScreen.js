import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getOrderDetails } from '../actions/orderActions'
import LoaderSpin from '../components/LoaderSpin'
import { ORDER_CREATE_SUCCESS_TO_FALSE, ORDER_PAY_RESET } from '../constants/orderConstants'
import { convertPrice, formatDate, pageTransition } from '../fonctionsOutils'

const OrderPaidScreen = () => {

  const dispatch = useDispatch()
  const {id} = useParams()
  const history = useHistory()

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin

  const orderDetails = useSelector(state=>state.orderDetails)
  const {order, loadingDetailsOrder} = orderDetails


  useEffect(() => {
    if(!userInfo){
      history.push('/')
    }
  },[userInfo, history])

  useEffect(() => {
    dispatch({type : ORDER_CREATE_SUCCESS_TO_FALSE})
    dispatch({type : ORDER_PAY_RESET})
    dispatch(getOrderDetails(id))
    
  }, [dispatch, id])


  return (
    <Wrapper variants={pageTransition} initital='initial' animate='animate' exit='exit'>
      
      {
        loadingDetailsOrder ? <LoaderSpin/> :
        order && 
        <div>
          <div className='header'>
            <h3>Détails commande n°{order._id}</h3>
            <div><span className='label'>Effectuée le </span> {formatDate(order.createdAt)} </div>
          </div>
          <div style={{borderBottom :'1px solid #d3d9d9', marginTop:'-20px', marginBottom:'50px'}}></div>
          
          <div>
            <h4>Produits achetés</h4>
            <div className='order'>
              <div className='order-container'>
                {
                  order.produitsCommande && order.produitsCommande.map((item, index)=>(
                    <div className='order-items-container' key={index}>
                      <Link to={`/produit/${item.product}`} className="img-container">
                        <img src={item.image} alt={item.nom} width='60'/>
                      </Link>
                      <div className='item-nom'>
                        {item.nom}
                      </div>
                      <div className='item-prix'>
                        {item.qty} x {convertPrice(item.prix)} = <span className='sous-total'>{convertPrice(item.qty*item.prix)} € </span> 
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className='container-summary'>
                <div className='summary'>
                  <h5>Total</h5>
                  <div className='label'>
                    Sous-total : 
                  </div>
                  <div className='value'>{convertPrice(order.prixProduits)}€</div>
                  <div className='label'>Frais de port :</div>
                  <div className='value'>{convertPrice(order.fraisDePort)} €</div>
                  <div className='label last'>Total commande : </div>
                  <div className='value total-prix alert-success pr-2'>{convertPrice(order.prixTotal)} €</div>
                </div>
              </div>
            </div>
            {!order.isPaid && <div className='text-center h4'>Paiement via Paypal ou carte bancaire</div>}
            
            <div className='payment-container'>
              
              <div className='alert-success h4 p-2'>
              {order.isPaid ? 
              <p>Commande payée le {formatDate(order.datePaiement)} via {order.méthodePaiement}</p>:<p className='alert-danger h4 mt-3 p-2'>Commande non-payée</p>}
              </div>
              
            </div>  
            <div style={{borderBottom :'1px solid #d3d9d9', margin:'30px 0'}}>
            </div>
            
            
            <div className='card-container'>
              <div className='card'>
                <h4 className='destinataire'>Destinataire</h4>
                <div className='infos-perso'>
                  {
                    userInfo.adresse && (<>
                      <div className='nom'>
                        {userInfo.prénom} {userInfo.nom}
                      </div>
                      <div>
                        {userInfo.adresse.adresse}
                      </div>
                      <div>
                        {userInfo.adresse.codePostal} {userInfo.adresse.ville}
                      </div>
                    </>)
                  }
                </div>
              </div>
              {
                order.messageOrder && 
                <div className='card'>
                  <h4>Message de l'acheteur</h4>
                  <div className='infos-perso message'>
                    {order.messageOrder}
                  </div>
                </div>
              }
              <div className='card '>
                <h4>Livraison point relais</h4>
                <div className='infos-perso point-relais'>
                  {
                    order.pointRelais ?
                    <div>
                      <div className='nom'>{order.pointRelais.nom}</div>
                      <div>{order.pointRelais.adresse}</div>
                      <div>{order.pointRelais.codePostal} {order.pointRelais.ville}</div>
                    </div> :
                    <div></div>
                  } 
                </div>
              </div>
            </div>
            {
              !order.isPaid ? null :
              order.isDelivered ? <p className="alert-success h4 mt-3 p-2">Commande envoyée le {formatDate(order.deliveredAt)}</p> : <p className="alert-danger h4 mt-3 p-2">Commande en préparation</p> 
            } 
          </div>
          <div style={{borderBottom :'1px solid #d3d9d9', margin:'30px 0'}}></div>
        </div> 
        }   
    </Wrapper>
  )
}

const Wrapper = styled(motion.div)`
  margin : 50px auto;
  width: 80%;
  .label{
    font-weight: bold;
  }
  h3{
    margin : 30px auto 0px auto;
  }
  .header{
    font-size : 1.1em;
    margin : 30px 0px;
  }


  .order{
    display : flex;
    justify-content: space-between;
  }
  .order-container{
    width : 600px;
    margin-right : 30px;
    display: flex;
    flex-direction: column;
    border-top : 1px solid #d3d9d9;
    margin-top : 10px;
    padding : 0 15px;

    .order-items-container{
      display : flex;
      flex-direction: row;
      align-items: center;
      border-bottom:1px solid #d3d9d9;
      padding : 10px 0;

      .img-container{
        text-align: center;
        width : 60px;
        height : 60px;
        overflow : hidden;
        border : 3px solid #d3d9d9;
      }
      .item-nom{
        padding-left : 20px;
        width : 300px;
        font-weight : bold;
        font-size : 1.1em;
        border-right : 1px solid #d3d9d9;
      }
      .item-prix{
        padding-left : 20px;

        .sous-total{
          font-size : 1.1em;
          font-weight : bold;
          
        }
      }
    }
  }  

  .summary{
    width : 200px;
    border:1px solid #d3d9d9;
    padding : 15px;
    h5{
      text-align: center;
      border-bottom: 1px solid #d3d9d9;
    }
    .label{
      font-weight : bold;
    }
    .label.last{
      margin-top:15px;
    }
    .value{
      text-align: right;
      margin-bottom : 5px;

    }
    .value.total-prix{
      font-size:1.4em;
      font-weight : bold;
    }
  }

  .payment-container{
    display : flex;
    justify-content : space-between;
    margin-top : 20px;

    p{
      width : 100%;
      height : 40px;
      margin-right : 30px;
    }
  }

  h4{
    margin-top : 30px;
  }
  .infos-perso.point-relais{
    background-color:#edffb2;
    width: 300px;
  }
  .infos-perso.message{
    width: 400px;
  }
  .infos-perso {
    width: 300px;
    font-size : 1.2em;
    padding : 15px;
    border: 1px solid #d3d9d9;

    .nom{
      font-weight:bold;
    }
  }
  .card-container{
    display: flex;
    justify-content: space-between;

    .card{
      border: none;
    }
  }

  @media (max-width:800px){
    width : 100%;
    padding : 10px;

    .order{
      flex-direction : column;
      align-items : center;
      .summary{
        margin-top : 15px;
      }
    }
    .payment-container{
      flex-direction : column;

    }
    .card-container{
      flex-direction : column;
      align-items : center;
    }
  }

  @media (max-width:600px){
  .order-container{
    width : 100%;
    .order-items-container{
      width : 100%;
      margin : 0 auto;

      .item-nom{
        padding-left : 10px;
        width : 100px;
        font-size : 0.8em;
      }
    }
  }
  
}
    
`

export default OrderPaidScreen