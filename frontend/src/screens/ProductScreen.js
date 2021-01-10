import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import {listProductDetails} from '../actions/productActions'
import styled from 'styled-components'
import CarouselImageProduit from '../components/CarouselImageProduit'

const ProductScreen = () => {
  const history = useHistory()
  const {id} = useParams()

  const [qty, setQty] = useState(1)
  const [couleur, setCouleur] = useState('beige')

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails

  useEffect(() => {

    dispatch(listProductDetails(id))
    console.log(history)
  }, [dispatch, id, history])

  const convertPrice = (price)=>{
    let priceString = (Math.floor(price*100)/100).toFixed(2)
    let priceArray = priceString.split('.')
    return priceArray.join(',')
  }

  const displayOpt = (nombre)=>{
    let text = []
    for(let i=0; i<nombre; i++){
      text.push(i+1)
    }
    return text
  }
  

  return (
    <Wrapper>
      {
        loading? <h2>Chargement...</h2> : error ? <h3>{error}</h3> : (
        <>
          <div className='card-container'>
            <CarouselImageProduit images={product.image}/>
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
                        { product.couleurs.map((couleur, index) => <div key={index} id={couleur} className={`coloris`}></div>) }
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
                  {product.stock<1 && <div className='info-container'><button className="btn grey btn-block">Ajouter au panier</button></div>}
                  {product.stock>0 && (<>
                  <div className='info-container'>
                    <h5 >Quantité :</h5>
                    <select id='quantity' value={qty} onChange={(event)=>setQty(event.target.value)}>
                      {
                        displayOpt(product.stock).map((item, index) => <option key={index} value={item}>{item}</option>)
                      }
                    </select>
                  </div>
                  <div className='bouton'>
                      {
                        product.livraison ? <button className='btn btn-block btn-primary'>Ajouter au panier</button> : <button className='btn btn-block btn-warning'>Me contacter</button>
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

const Wrapper = styled.div`
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
    width : 30px;
    height: 30px;
    border-radius : 50%;
    border : 3px double white;
    box-shadow : -3px 5px 10px 0px grey;
    cursor: pointer;
    margin : 0 10px;
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
`
export default ProductScreen
