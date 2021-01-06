import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import {listProducts} from '../actions/productActions'
import CardHome from '../components/CardHome'
import Filtres from '../components/Filtres'

const BoutiqueScreen = () => {
  const dispatch = useDispatch()

  const productsList = useSelector(state => state.productsList)
  const {loading, error, products} = productsList

  const [indexOnglet, setIndexOnglet ] = useState(0)

  useEffect(()=>{
    dispatch(listProducts())
    // eslint-disable-next-line
  }, [dispatch])

  const categories = ['tous les produits', ...new Set(productsList.products.map(product=>product.catégorie))]
  
  return (
    <Wrapper>
      <h2>Boutique</h2>
      <div className="separateur"></div>
      {loading ? <h2>Chargement</h2> : error ? <h3>{error}</h3> : 
        (<>
          <Filtres/>
          <div className='conteneur-onglets'>
            {categories.map((category, index) =>(
              <div key={index} id={index} onClick={(event)=>setIndexOnglet(+event.target.id)} className={index===indexOnglet? 'onglet active' : 'onglet'} >{category}</div>
            ))}
          </div>
          <div className="products-container">
            {indexOnglet===0 && products.map(product =>(
              <div className={'card-container'} key={product._id}><CardHome product={product}/></div>
            ))}
            {indexOnglet===1 && products.filter(product =>(product.catégorie === categories[1])).map((item)=>(
              <div className={'card-container'} key={item._id}><CardHome product={item}/></div>
            ))}
            {indexOnglet===2 && products.filter(product =>(product.catégorie === categories[2])).map((item)=>(
              <div className={'card-container'} key={item._id}><CardHome product={item}/></div>
            ))}
            {indexOnglet===3 && products.filter(product =>(product.catégorie === categories[3])).map((item)=>(
              <div className={'card-container'} key={item._id}><CardHome product={item}/></div>
            ))}
          </div>
        </>
          
        )
      }
      
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 1200px;
  margin: 0 auto;

  h2 {
    text-align: center;
    margin: 50px auto;
  }
  .separateur{
    margin : 50px auto;
    width :50px;
    height :3px;
    background-color:#0C1B33
  }
  .products-container{
    width : 100%;
    display: flex;
    flex-wrap :wrap;
    justify-content:space-evenly;
  }
  .conteneur-onglets{
    display: flex;
    justify-content:center;
    width :100%;
    margin: 10px auto;
    border-bottom: 1px solid #C4A77D;
  }
  .onglet{
    position: relative;
    cursor : pointer;
    text-transform:uppercase;
    margin : 0 auto;
    text-align:center;
    color : black;
    border : 1px solid #eaf0ce;
    width :100%;
    line-height : 35px;
    padding : 10px auto;
    overflow-x: hidden;
    opacity: 0.5;
  }
  .onglet.active{
    opacity : 1;
  }
  .onglet::before{
    content :"";
    position : absolute;
    width :100%;
    height :10px;
    top:-5px;
    left:0px;
    background-color : #C4A77D;
    transform:translateX(-100%);
    transition : all 0.3s;
  }
  .onglet.active::before{
    transform:translateX(0)
  }
  .card-container{
    border: solid 1px #eaf0ce;
    margin-bottom : 25px;
    height:510px;
    overflow: hidden;
  }
  @media only screen and (max-width:1520px){
    .card-container{
      height :450px;
    }
  }
`

export default BoutiqueScreen
