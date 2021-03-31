import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {convertPrice, pageTransition} from '../fonctionsOutils'
import { motion } from 'framer-motion'
import { loginModal } from '../actions/loginModalAction'

const CartScreen = ({location}) => {

  const {id} = useParams()

  const qty = location.search ? +location.search.substring(0,6).split('=')[1] : 1
  const couleur = location.search ? location.search.substring(6).split('=')[1] : ""
  
  const dispatch = useDispatch()
  const history = useHistory()

  const {cartItems} = useSelector(state=>state.cart)
  const {userInfo} = useSelector(state=>state.userLogin)

  useEffect(() => {
    if(id) {
      dispatch(addToCart(id, qty, couleur))
    }
  }, [dispatch, id, qty, couleur])


  const removeCart = (id)=>{
    dispatch(removeFromCart(id))
    console.log(id)
  }

  const proceedCkeckoutHandler = (event)=>{
    event.preventDefault()
    if(!userInfo){
      dispatch(loginModal())
    } else {
      console.log('Passer commande.')
      history.push('/adresse')
    }
  }

  return (
    <Wrapper variants={pageTransition} initial='initial' animate='animate' exit='exit'>
      <h2>Panier</h2>
        {
          cartItems.length===0 ? <>
            <p className='alert-primary message-empty'>
              <i className="fas fa-shopping-basket panier"/>Votre panier est vide.&nbsp;<Link to='/produits'> Visitez la boutique &nbsp;<i className="fas fa-store-alt"/></Link>
            </p>
            </> : 
          <div className='super-container'>
            <div className="cart-container">
            {
              cartItems.map((item, index)=>(
                <div key={index} className="cart-items" >
                  
                  <div className='item-photo' >
                    <Link to={`/produit/${item.product}`}><img src={item.image} alt='lampe en bois flotté' width='60px'/></Link>
                  </div>
                  
                  <div className='item-nom'>
                    <Link to={`/produit/${item.product}`}><span className='label'>{item.nom}</span></Link>
                  </div>
                  
                  <div className='item-couleur'>
                    <span className='label'>Couleur : </span>{item.couleur ? item.couleur : 'aucune'}
                  </div>
                  <div className='item'>
                  <span className='label'>Prix </span>{convertPrice(item.prix*+item.qty)} €
                  </div>
                  <div className='item-qty item'>
                    <label className='label'>Quantité</label> 
                    <select value={item.qty} onChange={event => dispatch(addToCart(item.product, +event.target.value, item.couleur))} >
                      {
                        [...Array(item.stock).keys()].map((x)=> (
                          <option key={x+1} value={x+1}>{x+1}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className='item'>
                    <button className='btn btn-danger supprimer' onClick={()=>removeCart(item.product)} >Supprimer</button>
                    <i className="fas fa-trash-alt" onClick={()=>removeCart(item.product)}/>
                  </div>
              </div>
              ))
            }
          </div>  
          <div className='recap'>
            <h4>Total des achats</h4>
            <h5>({cartItems.reduce((acc, item)=> acc + item.qty, 0)===1 ? '1 produit': cartItems.reduce((acc, item)=> acc + item.qty, 0) + ' produits'})</h5>
            <div className='prix-total'>
              <h4>{convertPrice(cartItems.reduce((acc, item)=> acc + item.qty*item.prix, 0))} €</h4>
              <div className='shipping-container'>
                <div>Frais de port</div>
                <h5>20,00 €</h5>
              </div>
            </div>
            
            <div className='total-commande'>Total de la commande :</div>
            <h4 className='prix-final'>{convertPrice(cartItems.reduce((acc, item)=> acc + item.qty*item.prix, 0)+20)} €</h4>
            <div className='checkout'>
              <button className='btn btn-block btn-primary checkout' onClick={(event)=>proceedCkeckoutHandler(event)} >Valider la commande</button>
            </div>
          </div> 
        </div>     
      }
  
  </Wrapper>
  )
}


const Wrapper = styled(motion.div)`
  h2{
    margin : 50px auto;
    text-align : center;
  }
  i{
    display : none;
    transform : scale(2);
    color : red;
    margin : auto;
    position : absolute;
    left : 50%;
    cursor : pointer; 
  }

  .message-empty{
    font-size : 2em;
    justify-content: left;
    width : 80%;
    margin : 20px auto;
    text-align : center;
    
    .panier{
      margin-top : 5px;
      margin-right : 10px;
    }
  }
  .label{
    font-weight : bold;
    color : black;
  }
.super-container{
  display : flex;
  flex-direction : row;
  justify-content: space-around;

  .cart-container{
    display: flex;
    flex-direction: column;

    .cart-items{
      display: flex;
      flex-direction : row;
      justify-content: space-between;
      margin : 3px 0px;
      align-items: center;
      border: 1px solid #cccccc; 
      height : 75px;

      .item-photo{
        margin : auto 15px;
        height : 60px;
        width : 60px;
        overflow: hidden;
        
        img {
          margin-top : 10px;
          transform : translateY(-15%)
        }
        
      }
      .item-couleur{
        width : 170px;
        padding : auto 10px;
        margin : auto 20px auto 0px;
        border-right : 1px solid #cccccc;
      }
      .item-qty.item{
        border-right : none;
      }
      .item{
        margin : auto 20px auto 0px;
        padding : auto 10px;
        width : 115px;
        border-right : 1px solid #cccccc;
        position : relative;
      }
      .item-nom{
        width : 130px;
        border-right : 1px solid #cccccc;
        margin-right : 10px;
      }
    }
  }
}
  .recap{
    padding : 20px;
    border : 1px solid #cccccc;
    h4, h5{
      text-align: center;
      padding-bottom : 10px;
    }
    h5{
      padding-bottom : 10px;
      border-bottom : 1px solid #cccccc;
    }
    .prix-total {
      h4{
        margin-top : 30px;
        text-align: right;
      }
      .shipping-container{
        display: flex;
        justify-content : space-between;
      }
    }
    .checkout{
      margin : 20px auto 0px auto;
      border-top : 1px solid #cccccc;
    }
  } 
  .total-commande {
    font-weight:bold;
  }
  h4.prix-final{
    width : 150px;
    margin:10px 0px 10px auto;
    text-align: right;
    color : green;
    padding : 10px;
    background-color : #d7eadb;
    
  }
  @media only screen  and (max-width : 1230px){
    .super-container{
      flex-direction : column;
      align-items: center;
      .recap{
        margin-top : 20px;
        width : 300px;
      }
    }
  }
  @media only screen and (max-width : 850px){
    width : 100%;
    .card-container{
      width : 80%;
      overflow: hidden;
      margin :0;
    }
    .cart-items{
      flex-direction : column;
      width:450px;
      height : 100%;
      margin :0;

      .item-photo{
        margin : 0;
        height : 100%;
        max-width : 20%;

        img{
          width : 30px;
          transform : translateY(0)
        }
      }
      .item-couleur{
        font-size : 0.7em;
        max-width : 20%;
        padding : 0px;
        margin-right :-50px;
      }
      .item-qty.item{
        border-right : none;
      }
      .item{
        font-size : 0.7em;
        margin : 0px;
        padding :0px;
        max-width : 20%;
      }
      .item-nom{
        font-size : 0.7em;
        max-width : 50px;
        margin-right : 0px;
      }
      i{
        display : block;
        border-right : none;
      }
      .supprimer{
        display : none;
        border : none;
      }
      
  }
}
@media only screen and (max-width : 500px){
  .cart-items {
    width : 360px;
    margin-right : 0;
  }
  .item{
    margin-left: -20px;
  }
  .item-photo{
    height : 100%;
    max-width : 20%;

    img{
      width : 30px;
      transform : translateY(0)
    }
  }
}
`

export default CartScreen
