import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import { listProducts } from '../actions/productActions'
import DisplayProducts from '../components/DisplayProducts'
import Filtres from '../components/Filtres'

const BoutiqueScreen = () => {
  const [indexOnglet, setIndexOnglet ] = useState(0)
  const [categorie, setCategorie] = useState('')
  // const [produits, setProduits] = useState([])
  // const [categoriesChosen, setCategoriesChosen] = useState('')
  // const [filteredProducts, setFilteredProducts] = useState([])

  const dispatch = useDispatch()

  const productsList = useSelector(state => state.productsList)
  const {loading, error, products} = productsList

  
  useEffect(()=>{
    dispatch(listProducts())
    // setProduits(products)

    // eslint-disable-next-line
  }, [dispatch])

  const categories = ['tous les produits', ...new Set(products.map(product=>product.catégorie))]

  const categoryChange = (event, truc)=>{
    event.preventDefault()
    setIndexOnglet(truc)
  }
  const handleFilterChange = (e)=>{
    console.log(e.target.value)
  }

  return (
    <Wrapper>
      <h2>Boutique</h2>
      <div className="separateur"></div>
      {loading ? <h2>Chargement</h2> : error ? <h3>{error}</h3> : 
        (<>
        <form onChange={handleFilterChange}>
          <Filtres categories = {categories} indexOnglet={indexOnglet} clic={(event)=>categoryChange(event, +event.target.id)} />
        </form>
         
          
        <DisplayProducts 
          filteredProducts =
            {
              indexOnglet===0 ? products : 
              (indexOnglet===1 ? products.filter(product =>(product.catégorie === categories[1])) :
              indexOnglet===2 ? products.filter(product =>(product.catégorie === categories[2])) : 
              (indexOnglet===3 && products.filter(product =>(product.catégorie === categories[3]))))
            } />
        </>)
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
  
  button{
    outline : none;
    border : 1px solid white !important;
  }
  @media only screen and (max-width:1520px){
    .card-container{
      height :450px;
    }
  }
`

export default BoutiqueScreen
