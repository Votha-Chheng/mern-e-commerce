import axios from 'axios'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import LoaderSpin from '../components/LoaderSpin'
import { convertPrice, formatDate, pageTransition } from '../fonctionsOutils'
import {PayPalButton} from 'react-paypal-button-v2'
import { ORDER_PAY_RESET } from '../constants/orderConstants'
import { getUserDetails } from '../actions/userActions'

const OrderScreen = () => {

  const [sdkReady, setSdkReady] = useState(true)

  const dispatch = useDispatch()
  const {id} = useParams()
  const history = useHistory()

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin

  const {user} = useSelector(state=>state.userDetails)

  // const orderCreate = useSelector(state=>state.orderCreate)

  const orderDetails = useSelector(state=>state.orderDetails)
  const {order, loadingOrderDetails, produitsCommande} = orderDetails

  const orderPay = useSelector(state=>state.orderPay)
  const {loading : loadingPay, success : successPay, error : errorPay} = orderPay


  useEffect(() => {

    dispatch(getOrderDetails(id))
    dispatch(getUserDetails(userInfo._id))

  }, [dispatch, id])

  useEffect(() => {
    if(!userInfo){
      history.push('/')
    }
  },[userInfo, history])

  useEffect(() => {
    const addPayPalScript = async (req, res)=>{
      const {data : clientId} = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = ()=>{
        setSdkReady(true)
      }
      document.getElementsByTagName('head')[0].appendChild(script)
    }

      
    if(!order || successPay){
      dispatch({type : ORDER_PAY_RESET})
      dispatch(getOrderDetails(id))
      if(successPay){
        //Mettre à jour le stock dans les produits achetés.
      }
    } else if (!order.isPaid){
      if(!window.paypal){
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
    
  },[dispatch, id, successPay, order])


  const successPaymentHandler = (paymentResult)=>{
    console.log(paymentResult)
    dispatch(payOrder(id, paymentResult))
  }


  return (
    <Wrapper variants={pageTransition} initital='initial' animate='animate' exit='exit'>
      
      {
        loadingOrderDetails ? <LoaderSpin/> :
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
              {
                errorPay && <div className='alert-danger h4 text-center'>{errorPay}</div>
              }
              {
                order.isPaid ? 
                <p className='alert-success h4 mt-3 p-2 w-100'>Commande payée le {formatDate(order.datePaiement)} via {order.méthodePaiement}</p>:<p className='alert-danger h4 mt-3 p-2'>Commande non-payée</p>
              }
              {
                loadingPay? <LoaderSpin/> :
                !sdkReady ? <LoaderSpin/> :
                !order.isPaid &&
                <PayPalButton
                  amount={order.prixTotal}
                  onSuccess={successPaymentHandler}
                />
              }
            </div>  
            <div style={{borderBottom :'1px solid #d3d9d9', margin:'30px 0'}}>
            </div>
            
            

            <div className='card-container'>
              <div className='card'>
                <h4 className='destinataire'>Destinataire</h4>
                <div className='infos-perso'>
                  {
                    user && (<>
                      <div className='nom'>
                        {user.prénom} {user.nom}
                      </div>
                      <div>
                        {user.adresse.adresse}
                      </div>
                      <div>
                        {user.adresse.codePostal} {user.adresse.ville}
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
    
`

export default OrderScreen
