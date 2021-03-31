import { motion } from 'framer-motion'
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
// import { resetCartItems } from '../actions/cartActions'
import { createOrder } from '../actions/orderActions'
import CheckoutSteps from '../components/CheckoutSteps'
import { convertPrice, pageTransition } from '../fonctionsOutils'

const PaymentScreen = () => {

  const [messageOrder, setMessageOrder] = useState('') 

  const dispatch = useDispatch()
  const history = useHistory()

  const cart = useSelector(state=>state.cart)
  const {pointRelaisChoisi, cartItems} = cart

  const {userInfo} = useSelector(state=>state.userLogin)

  const orderCreate = useSelector(state=>state.orderCreate)
  const {successCreateOrder, errorCreateOrder, order} = orderCreate

  cart.prixProduits = cartItems.reduce((acc, item)=> acc + item.qty*item.prix, 0)
  cart.prixTotal = cartItems.reduce((acc, item)=> acc + item.qty*item.prix, 0)+20

  useEffect(()=>{
    if(!userInfo){
      history.push('/')
    }
  }, [history, userInfo])

  useEffect(()=>{
    if (!messageOrder){
      setMessageOrder(sessionStorage.getItem('orderMessage'))
    }
    
  }, [dispatch, messageOrder])

  useEffect(()=>{
    if(successCreateOrder || cartItems.length === 0){
      history.push(`/commande`)
    }
  }, [successCreateOrder, history, order, cartItems])

  const placeOrderHandler = ()=>{
    dispatch(createOrder({
      produitsCommande : cartItems, 
      pointRelais : pointRelaisChoisi, 
      prixTotal : +cart.prixTotal, 
      prixProduits : +cart.prixProduits, 
      fraisDePort : 20,
      messageOrder : messageOrder
    }))
  }

  return (

    <Wrapper variants={pageTransition} initial='initial' animate='animate' exit='exit' >
      <CheckoutSteps step1={true} step2={true} step3={true} />
      <h2>Récapitulatif de votre commande</h2>
        {
          errorCreateOrder && <div className='alert-danger '>{errorCreateOrder}</div>
        }
      <div className='recap-container'>
        <div className='recap-left'>
          <h3>Point Relais choisi </h3>
           {
              pointRelaisChoisi ? 
              <div className='point-relais'>
                {pointRelaisChoisi.nom}<br/>
                {pointRelaisChoisi.adresse}<br/>
                {pointRelaisChoisi.ville} &nbsp;{pointRelaisChoisi.codePostal}
              </div> :
              <div></div>
            }
          
          <h3>Produits commandés </h3>
          <div className='recap-produits'>
            {
              cartItems.map((item, index)=>(
                <div key={index} className="cart-items" >
                  <Link to={`/produit/${item.product}`}>
                    <div className='item-photo' >
                      <img src={item.image} alt='lampe en bois flotté' width='60px'/>
                    </div>
                  </Link>
                  
                    <div className='item-nom item'><Link to={`/produit/${item.product}`}>
                    <span className='label'>{item.nom}</span></Link>
                    </div>
                  
                  <div className='item-couleur item'>
                    <span className='label'>Couleur : {item.couleur ? item.couleur : 'aucune'}</span>
                  </div>
                  <div className='item-prix-total item'>
                  <span className='label'>Prix : {convertPrice(item.prix)} x {item.qty} = <span className='prix-final'>{convertPrice(item.prix*+item.qty)} €</span></span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className='recap-right'>
          <h4>Votre commande</h4>
          <h5>({cartItems.reduce((acc, item)=> acc + item.qty, 0)===1 ? '1 produit': cartItems.reduce((acc, item)=> acc + item.qty, 0) + ' produits'})</h5>
          <div className='prix-total'>
            <h4>{convertPrice(cartItems.reduce((acc, item)=> acc + item.qty*item.prix, 0))} €</h4>
            <div className='shipping-container'>
              <div>Frais de port :</div>
              <h5>20,00 €</h5>
            </div>
          </div>
          
          <div className='total-commande'>Total à payer :</div>
          <h4 className='prix-final'>{convertPrice(cartItems.reduce((acc, item)=> acc + item.qty*item.prix, 0)+20)} €</h4>
          
          <div className='checkout'>
            <button className='btn btn-block btn-primary checkout' onClick={()=>placeOrderHandler()} >Procéder au paiement</button>
          </div>
        </div>

      </div>
    </Wrapper>
  )
}

const Wrapper = styled(motion.div)`
  margin : 0 auto;
  display : flex;
  flex-direction: column;
  width : 100%;

  h2{
    margin : 20px auto 50px auto;
  }

  .recap-container{
    display : flex;
    flex-direction: row;
    justify-content: space-around;
    margin : 10px 30px;
    
    .recap-left{
      width : 60%;

      h3{
        margin-top : 20px;
      }
      .point-relais{
        border-bottom : 1px solid #DEE3E3;
        padding : 15px 0px 30px 0px;
        font-weight : bold;
        font-size : 1.15em;
      }
      .recap-produits{
        display : flex;
        flex-direction: column;
        padding : 15px 0;
        

        .cart-items{
          display : flex;
          align-items: center;
          padding : 10px 0;
          border-bottom : 1px solid #DEE3E3;

          .item-photo{
            /* position : relative; */
            height : 80px;
            width : 80px;
            text-align: center;
            overflow: hidden;
          }
          .item-nom{
            width : 150px;
          }
          .item-couleur{
            width : 290px;
          }
          .item-qty{
            width : 140px;
          }
          .item-prix-total{
            width : 380px;

            .prix-final{
              font-size : 1.3em;
              font-weight : bold;
            }
          }
          .item{
            display : flex;
            flex-direction: column;
            justify-content : center;
            padding : 20px ;
            border-left : 1px solid #DEE3E3;
            height : 80px;
          }
        }
      }
    }
    .recap-right{
      padding:20px;
      width : 20%;
      border : 1px solid #DEE3E3;

      h4, h5{
        text-align: center;
      }
      
      h5{
        padding-bottom: 20px;
        border-bottom : 1px solid #DEE3E3;
      }

      .prix-total{
        h4{
          text-align: right;
        }
        .shipping-container{
          padding: 20px 0;
        }
        .shipping-container{
          h5{
            text-align: right;
          }
        }
        
      }

      h4.prix-final{
        text-align:right;
      }
      .checkout{
        margin-top: 20px;
      }
    }
  }
@media (max-width:890px){
  .recap-container{
    flex-direction: column;
    align-items: center;
    .recap-right, .recap-left{
      width : 100%;
    }
    .recap-left
      .recap-produits{
        .cart-items{
          display : flex;
          font-size : 0.8em;
  
          .item-nom{
            width : 80px;
            padding-left : 0px;
          }
          .item-couleur.item{
            text-align : center;
            width : 70px;
          }
          .item-qty{
            width : 140px;
          }
          .item-prix-total{
            width : 300px;

            .prix-final{
              font-size : 1.3em;
              font-weight : bold;
            }
          }
          .item{
            display : flex;
            flex-direction: column;
            justify-content : center;
            padding : 5px ;
            border-left : 1px solid #DEE3E3;
            height : 80px;
          }
        }
      }

  }
}
`

export default PaymentScreen
