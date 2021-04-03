import axios from 'axios'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { payOrder } from '../actions/orderActions'
import LoaderSpin from '../components/LoaderSpin'
import { convertPrice, formatDate, pageTransition } from '../fonctionsOutils'
import {PayPalButton} from 'react-paypal-button-v2'
import { updateProductStock } from '../actions/productActions'
import { resetCartItems } from '../actions/cartActions'

const OrderScreen = () => {

  const [sdkReady, setSdkReady] = useState(true)
  const [loadingMount, setLoadingMount] = useState(true)

  const dispatch = useDispatch()
  const history = useHistory()

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin

  const orderDetails = useSelector(state=>state.orderDetails)
  const {order, loadingDetailsOrder} = orderDetails

  const {successCreateOrder, order : orderCreated} = useSelector(state=>state.orderCreate)

  const orderPay = useSelector(state=>state.orderPay)
  const {loading : loadingPay, success : successPay, error : errorPay} = orderPay

  const {loading} = useSelector(state=>state.productStockUpdate)

  useEffect(() => {
    if(!userInfo || !successCreateOrder){
      history.push('/')
    }
  },[userInfo, history, successCreateOrder])


  // useEffect(() => {
  //   if(successCreateOrder){
  //     dispatch(resetCartItems())
  //     dispatch({type : ORDER_CREATE_SUCCESS_TO_FALSE})
  //   }
  //   if(successPay||!order){
  //     if(successPay){
  //       const orderBody = order.produitsCommande.map(item => ({_id : item.product, qty : item.qty}))
  //       dispatch(updateProductStock({orderBody : orderBody}))
  //     }
  //     dispatch({type : ORDER_PAY_RESET})
  //     dispatch(getOrderDetails(id))
  //   }  
  // }, [dispatch, id, successPay, successCreateOrder, order])

  useEffect(()=>{
    if(successCreateOrder){
      setTimeout(()=>{
        setLoadingMount(false)
        dispatch(resetCartItems())
        //dispatch({type : ORDER_CREATE_SUCCESS_TO_FALSE})
      }, 5000) 
    }
  }, [successCreateOrder, dispatch])

  useEffect(() => {
    if(successPay){
      const orderBody = orderCreated.produitsCommande.map(item => ({_id : item.product, qty : item.qty}))
      dispatch(updateProductStock({orderBody : orderBody}))
      history.push(`/commande/${orderCreated._id}`)
    }
  },[successPay, dispatch, history, orderCreated])
  
  useEffect(()=>{
    const addPayPalScript = async (req, res)=>{
      const {data : clientId} = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = ()=>{
        setSdkReady(true)
      }
      document.querySelector('body').appendChild(script)
    }  
    
    if(!orderCreated.isPaid){
      if(!window.paypal){
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
    
  }, [dispatch, orderCreated])

  const successPaymentHandler = (paymentResult)=>{
    console.log(paymentResult)
    dispatch(payOrder(orderCreated._id, paymentResult)) 
  }


  return (
    <Wrapper variants={pageTransition} initital='initial' animate='animate' exit='exit'>
      
      {
        loadingDetailsOrder ? <LoaderSpin/> :
        orderCreated && 
        <div>
          <div className='header'>
            <h3>Détails commande n°{orderCreated._id}</h3>
            <div><span className='label'>Effectuée le </span> {formatDate(orderCreated.createdAt)} </div>
          </div>
          <div style={{borderBottom :'1px solid #d3d9d9', marginTop:'-20px', marginBottom:'50px'}}></div>
          
          <div>
            <h4>Produits achetés</h4>
            <div className='order'>
              <div className='order-container'>
                {
                  orderCreated.produitsCommande && orderCreated.produitsCommande.map((item, index)=>(
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
                  <div className='value'>{convertPrice(orderCreated.prixProduits)}€</div>
                  <div className='label'>Frais de port :</div>
                  <div className='value'>{convertPrice(orderCreated.fraisDePort)} €</div>
                  <div className='label last'>Total commande : </div>
                  <div className='value total-prix alert-success pr-2'>{convertPrice(orderCreated.prixTotal)} €</div>
                </div>
              </div>
            </div>
            {!orderCreated.isPaid && <div className='text-center mt-3 h4'>Paiement via Paypal ou carte bancaire</div>}
            
            <div className='payment-container'>
              {
                errorPay && <div className='alert-danger h4 text-center'>{errorPay}</div>
              }
              {
                orderCreated.isPaid ? 
                <p className='alert-success h4 mt-3 p-2 w-100'>Commande payée le {formatDate(orderCreated.datePaiement)} via {orderCreated.méthodePaiement}</p>:<p className='alert-danger h4 mt-3 p-2'>Commande non-payée</p>
              }
              {
                loadingPay || loading || loadingMount ? <LoaderSpin/> :
                !sdkReady ? <LoaderSpin/> :
                !orderCreated.isPaid &&
                <PayPalButton
                  amount={orderCreated.prixTotal}
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
                orderCreated.messageOrder && 
                <div className='card'>
                  <h4>Message de l'acheteur</h4>
                  <div className='infos-perso message'>
                    {orderCreated.messageOrder}
                  </div>
                </div>
              }
              <div className='card '>
                <h4>Livraison point relais</h4>
                <div className='infos-perso point-relais'>
                  {
                    orderCreated.pointRelais ?
                    <div>
                      <div className='nom'>{orderCreated.pointRelais.nom}</div>
                      <div>{orderCreated.pointRelais.adresse}</div>
                      <div>{orderCreated.pointRelais.codePostal} {orderCreated.pointRelais.ville}</div>
                    </div> :
                    <div></div>
                  } 
                </div>
              </div>
            </div>
            {
              !orderCreated.isPaid ? null :
              order.isDelivered ? <p className="alert-success h4 mt-3 p-2">Commande envoyée le {formatDate(orderCreated.deliveredAt)}</p> : <p className="alert-danger h4 mt-3 p-2">Commande en préparation</p> 
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

export default OrderScreen
