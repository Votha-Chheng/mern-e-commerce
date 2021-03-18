import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getFilteredProducts } from '../actions/filterActions'
import AdminListProducts from './AdminListProducts'
import AdminProductDetails from './AdminProductDetails'
import AdminAddProduct from './AdminAddProduct'
import { setSuccessCreateProductToFalse } from '../actions/productActions'
import BullesStats from './BullesStats'

const GestionProduits = () => {

  const [displayDetails, setDisplayDetails] = useState(false)
  const [displayAddProduct, setDisplayAddProduct] = useState(false)
  const [productId, setProductId] = useState('')
  const [categoriesList, setCategoriesList] = useState([])

  const dispatch = useDispatch()

  const {filteredProducts, allProducts} = useSelector(state => state.productsFiltered)

  useEffect(()=>{
    dispatch(getFilteredProducts())
  }, [dispatch])

  useEffect(() => {
    if(allProducts){
      setCategoriesList([...new Set(allProducts.map(product=>product.catégorie))])
    }
  }, [allProducts])

  const switchDisplayHandler = (event)=>{
    setDisplayDetails(!displayDetails)
    if(event.target.id){
      setProductId(event.target.id)
      window.scrollTo(0,180)
    }
  }

  const addProductBackHandler = ()=>{
    setDisplayAddProduct(false)
    dispatch(setSuccessCreateProductToFalse())
  }

  return (
    <ContainerDiv>
      <div className='bulle-stat'>
        <BullesStats items={"produits"} itemsArray={allProducts} icon={"fas fa-tags"} />
      </div>
      
      {
        (!displayAddProduct && !displayDetails) &&
        <button className='btn btn-success my-3 rounded' onClick={()=>setDisplayAddProduct(true)} >
          <span className='mr-2'>Ajouter un produit</span> &nbsp;<i className="far fa-plus-square icon" style={{transform : 'scale(1.7)'}}/>
        </button>
      }
     
      {
        displayDetails ? 
        <AdminProductDetails switchDisplayHandler={switchDisplayHandler} productId={productId} allProducts={allProducts}/> :
        displayAddProduct ?
        <AdminAddProduct addProductBackHandler={addProductBackHandler} categoriesList={categoriesList}/> :
        <AdminListProducts filteredProducts={filteredProducts} allProducts={allProducts} switchDisplayHandler={switchDisplayHandler}/>
      } 
    </ContainerDiv>
  )
}

const ContainerDiv = styled.div`
  width: 100%;

  .bulle-stat{
    margin-top : 20px;
    display: flex;
    justify-content: center;
  }
  `

export default GestionProduits
