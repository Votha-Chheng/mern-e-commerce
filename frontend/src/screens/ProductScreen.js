import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import {listProductDetails} from '../actions/productActions'
import styled from 'styled-components'
import CarouselImageProduit from '../components/CarouselImageProduit'
import {convertPrice, pageTransition} from '../fonctionsOutils'
import { motion } from 'framer-motion'
import Loader from '../components/Loader'

const ProductScreen = () => {

  const [qty, setQty] = useState(1)
  const [couleur, setCouleur] = useState('beige')
  const [loadingSend, setLoadingSend] = useState(false)

  const {id} = useParams()
  const dispatch = useDispatch()
  const history = useHistory()


  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails

  useEffect(() => {
    dispatch(listProductDetails(id))
    
  }, [dispatch, id, history])


  const displayOpt = (nombre)=>{
    let text = []
    for(let i=0; i<nombre; i++){
      text.push(i+1)
    }
    return text
  }

  const addCartHandler = ()=> {
    history.push(`/panier/${product._id}?qty=${qty}&couleur=${couleur}`)
  }


  return (
    <Wrapper variants={pageTransition} initial='initial' animate='animate' exit='exit'>
      {
        loading? <Loader/> : error ? <h3>{error}</h3> : (
        <>
          <div className='card-container'>
            <CarouselImageProduit images={product.images} loading={loading}/>
            <div className='card-description'>
              <div className='partie-haute'>
                <h3>{product.nom}</h3>
                <small>Catégorie : <span className='categorie'>{product.catégorie}</span></small><br/><br/>
                
                <p className="desc">{product.description}</p>

                {
                  !product.livraison && (
                    <div className='livraison-false'>
                      
                      <p><i className="fas fa-exclamation-circle warning"/>  Cette lampe est disponible. Pour des questions évidentes de fragilité et d'emballage, il est difficile d'expédier ce lampadaire par les réseaux de transport classiques. Si ce modèle vous plait, contactez moi et nous verrons ensemble quelle solution adopter pour vous livrer. En vous remerciant de votre compréhension</p>
                    </div>
                  )
                }

                {product.couleurs.length>0 && (
                    <div className='couleurs'>
                      <h5>Couleurs d'abat-jour disponibles</h5>
                      <div className='couleurs-container'>
                        { 
                          product.couleurs.map((color, index) => 
                            <div 
                              key={index} 
                              id={color} 
                              className='coloris'
                              onClick={(event)=>{setCouleur(event.target.id)}} 
                            >
                            {
                              color===couleur && <svg width="10" height="91" viewBox="0 0 90 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M37.627 89.6151C35.6169 88.9665 34.5779 88.3948 32.7322 86.9221C30.2998 84.9812 3.43728 57.8773 2.48853 56.4067C1.06725 54.2036 0.514866 52.4102 0.380722 49.5636C0.248512 46.758 0.500418 45.3351 1.52639 43.0921C3.10149 39.6485 6.35167 36.8313 10.0318 35.7196C12.0547 35.1086 15.8213 35.1031 17.8228 35.7083C21.112 36.7029 22.0075 37.4172 30.3915 45.734L38.3695 53.6481L39.0566 52.6369C39.4345 52.0808 39.7437 51.5456 39.7437 51.4475C39.7437 51.3494 40.3204 50.2757 41.0254 49.0615C41.7303 47.8473 44.0707 43.6392 46.2264 39.7101C48.382 35.781 50.59 31.7924 51.1331 30.8465C51.6761 29.9007 52.4313 28.5612 52.8112 27.87C53.1912 27.1788 53.8171 26.0477 54.2021 25.3564C54.5872 24.6652 56.9821 20.3492 59.5241 15.7653C62.0662 11.1814 64.5568 6.86875 65.0588 6.18164C69.5225 0.0721297 78.3463 -1.1379 84.4583 3.52137C89.5781 7.42436 91.2354 14.7573 88.3017 20.5278C87.491 22.1225 79.8223 36.0599 77.8927 39.4455C77.2292 40.6097 76.4048 42.0861 76.0607 42.7264C75.7166 43.3668 75.1244 44.4383 74.7446 45.1077C74.0361 46.3567 71.8375 50.3171 64.6685 63.258C62.4113 67.3326 60.2274 71.2616 59.8154 71.9893C59.4035 72.7169 57.7251 75.7529 56.0858 78.7361C53.5231 83.3994 52.8454 84.4205 51.2531 86.0167C49.2072 88.0676 47.5108 89.0949 45.1584 89.7076C43.0631 90.2534 39.468 90.2092 37.627 89.6151V89.6151Z" fill="black"/>
                              </svg>
                            }
                            </div>
                          ) 
                        }
                      </div>
                    </div>
                  )}
              </div>
              
              <div className='card-product'>
                <div className='info-container'>
                  <h5 >Prix :</h5>
                  <div className='prix'>{convertPrice(product.prix)} €</div>
                </div>
                <div className='info-container'>
                  <h5 >Livraison :</h5>
                  <div className={product.livraison? 'livraison' : "livraison red"}>{product.livraison ? "Oui" : "Me contacter"}</div>
                </div>
                <div className='info-container'>
                  <h5 >Disponibilité :</h5>
                  <div className={product.stock>0? 'stock' : "stock red"}>{product.stock>0 ? "Oui" : "Rupture de stock"}</div>
                </div>
                  {product.stock<1 &&
                    <> 
                      <div className='info-container'>
                        <button className="btn grey btn-block">Ajouter au panier</button>
                      </div>
                      <div className='info-container no-bottom-border'>
                        <button className='btn btn-block btn-warning '>Me contacter</button>
                      </div>
                    </>
                  }
                  {product.stock>0 && (<>
                  <div className='info-container'>
                    <h5 >Quantité :</h5>
                    <select name='quantity' value={qty} onChange={(event)=>setQty(+event.target.value)}>
                      {
                        displayOpt(product.stock).map((item, index) => <option key={index} value={item}>{item}</option>)
                      }
                    </select>
                  </div>
                  <div className='bouton'>
                      {
                        product.livraison ? 
                        <button className='btn btn-block btn-primary'onClick={()=>addCartHandler()} >Ajouter au panier</button> 
                        : 
                        <button className='btn btn-block btn-warning' onClick={()=>history.push('/contact')}>Me contacter</button>
                      } 
                   </div>
                   </>
                  )}  
              </div> 
            </div>
            
          </div>
        </>
        )
      } 
    </Wrapper>
  )
}

const Wrapper = styled(motion.div)`
  .bouton{
    margin-top : 30px;
  }
  #quantity{
    width:60px;
  }
  h3{
    text-align: Left;
    margin-top:0px;
    font-stretch : condensed;
    padding : 2px;
  }
  .desc{
    padding-bottom : 20px;
    border-bottom : 2px solid #dce3e5;
  }
  .livraison-false{
    color : red;
  }
  .warning{
    transform : scale(1.2)
  }
  small{
    font-size: 0.9em;
    padding : 2px;
  }
  .categorie{
    font-style : italic;
    font-weight: bold;
  }
  .card-container{
    margin:75px auto 0 auto;
    display: flex;
    justify-content: center;
    width: 1200px;
  }
  .partie-haute{
    width:380px;
    margin-right:20px;
    
  }
  p{
    font-size : 1em;
    font-weight: bold;
    padding : 2px;
  }
  .card-image{
    display : flex;
    justify-content: center;
    width : 500px;
    height : 500px;
    margin-right : 50px;
    border : 3px solid rgba(200, 200, 200, 0.5);
    overflow: hidden;
    cursor: pointer;
  }
  .prix{
    font-weight: bold;
    font-size : 1.2em
  }
  .card-description{
    width:100%;
    margin-top : 10px;
    margin-left : 50px;
    display : flex;
  }
  .card-product{
    width:380px;
    max-height:350px;
    border : 1px #dce3e5 solid;
    padding : 10px 20px;
  }
  h4{
    margin : 0;
  }
  .info-container{
    display : flex;
    justify-content: space-between;
    margin : 10px 0;
    padding : 10px;
    line-height: 15px;
    border-bottom : 1px solid #dce3e5;
    
  }
  .info-container.no-bottom-border{
    border-bottom : transparent !important;
  }
  .stock{
    font-size: 1.1em
  }
  .stock.red, .livraison.red{
    color : red;
    font-weight: bold;
  }
  button{
    margin-bottom : 0px;
  }
  .grey{
    background-color:#dce3e5;
    pointer-events: none;
  }
  .couleurs{
    margin : 25px 2px
  }
  .couleurs-container{
    display : flex;
  }
  .coloris {
    position: relative;
    width : 30px;
    height: 30px;
    border-radius : 50%;
    border : 3px double white;
    box-shadow : -3px 5px 10px 0px grey;
    cursor: pointer;
    margin : 0 10px;
    svg{
      position :absolute;
      top : -32px;
      left: 7px;
    }
  }

  #beige{
    background-color : #e1c699
  }
  #blanc{
    background-color : #ffffff
  }
  #bleu-clair{
    background-color : #318ce7
  }

  @media only screen and (max-width: 1350px){
    width : 900px;  
    margin : 0 auto;

    .card-container{
      width : 100%;
      flex-direction : column;
      align-items : center;

      .card-description{
        margin-top : 20px;
      }
    }
  }
  @media only screen and (max-width: 820px){
    width : 500px;
    .card-description{
      margin-top : 20px;
      flex-direction : column;
    }
  }

  @media only screen and (max-width: 570px){
    width : 340px;
    overflow : hidden;
    .card-container{
      width : 340px; 
      .card-description{
        width : 335px;
        margin : 0px 0px 0px 5px;
        .partie-haute{
          width : 330px;
          margin-right : 0px;
          margin-left : 0px;
        }
        .couleurs{
          width : 300px;
          display :flex;
          flex-direction : column;
          align-items : center;
          justify-content : center;

          h5{
            margin-left : 20px;
          }
        }
      }
      .card-product{
        padding : 0;
        width : 340px;
        margin-left : -5px;
        .info-container{
          width : 320px;
          margin : 2px;
          padding : 5px;
        }
      }
    }

    /* 
      
        
        
          
        }
        .
      }
    } */
  }



`
export default ProductScreen
