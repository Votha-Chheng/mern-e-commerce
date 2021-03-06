import React, { useEffect, useState } from 'react'
import LoaderSpin from '../components/LoaderSpin'
import {Container, ListGroup} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getFilteredProducts, updateProductsPagination } from '../actions/filterActions'
import { deleteProduct } from '../actions/productActions'

const AdminListProducts = ({switchDisplayHandler}) => {

  const [modalDisplay, setModalDisplay] = useState(false)
  const [idProductToDelete, setIdProductToDelete] = useState('')
  const [pages, setPages] = useState([])

  const dispatch = useDispatch()

  const {filteredProducts, loading, productPagination, allProducts, unpaginateProducts} = useSelector(state => state.productsFiltered)
  const {messageDeleteProduct, successDeleteProduct, loadingDeleteProduct } = useSelector(state => state.productDeleted)

  useEffect(()=>{
    dispatch(getFilteredProducts())
  }, [dispatch, successDeleteProduct, productPagination])


  useEffect(() => {
    if(unpaginateProducts){
      const totalPages = Math.floor(unpaginateProducts.length/productPagination.numberOfItemsToDisplay)+1
      let totalPagesArray=[]
      for(let i=0 ; i<totalPages ; i++){
        totalPagesArray.push(i+1)
      }
      setPages(totalPagesArray)
    }
  }, [allProducts, productPagination, unpaginateProducts])

  const deleteHandler = (event)=>{
    setIdProductToDelete(event.target.id)
    setModalDisplay(true)
  }

  const confirmDeleteHandler = (productId)=>{   
    dispatch(deleteProduct(productId))     
    window.scrollTo(0, 0)
    setModalDisplay(false)
  }

  const changeProductPagination = (name, value)=>{
    dispatch(updateProductsPagination(productPagination, name, value))
  }

  return (
    <div>
      {
        modalDisplay ? 
        <ModalContainer>
          <div className='modal-card'>
            <div className='message-alert'>
              Êtes-vous sûr de vouloir supprimer ce produit ?
            </div>
            <div className='button-container'>
              <button className='btn btn-inline btn-warning' onClick={()=>setModalDisplay(false)}>Annuler</button>
              <button className='btn btn-inline btn-danger' onClick={()=>confirmDeleteHandler(idProductToDelete)}>Supprimer</button>
            </div>   
          </div>
        </ModalContainer> :
        <div></div>
      }
      {
        successDeleteProduct && <div className='alert-danger text-center h4 my-4'>{messageDeleteProduct.message}</div>
      }

      <Filters className='filters-container'>
        <div className='tri'>Trier par : </div>
        
        <div className='filter'>
          <div>Nombre</div>
          <select
            name='numberOfItemsToDisplay' 
            id='numberOfItemsToDisplay' 
            value={productPagination.numberOfItemsToDisplay} 
            onChange={(event)=>changeProductPagination(event.target.name, +event.target.value)}
          >
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='50'>50</option>
          </select>
        </div>
      </Filters>

      <Pagination>
        {
          pages.map((page, index) => 
            <div 
              className='page' 
              key={index}
              id={index+1}
              style={index === productPagination.currentPage-1 ? { backgroundColor : "#dde3e3", color : 'grey' } : null}
              data-name ='currentPage'
              onClick={(event) => changeProductPagination(event.target.dataset.name, (event.target.id))}
            >
              {page}
            </div>
          )
        }
      </Pagination>

      <Container>
      {
        loadingDeleteProduct || loading ? <LoaderSpin/> :
        filteredProducts.map((product, index)=>
          <ListGroup key={index} className='my-5'>
            <ListGroup.Item variant='secondary'>
              <div className='d-inline mr-3'>ID du produit : {product._id}</div>
              <div className='d-inline'>
                <button id={product._id} className='btn btn-dark rounded' onClick={(event)=>switchDisplayHandler(event)} >
                  Voir en détails / Modifier le produit
                </button>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <Table>
                <div className='colonne'>
                  <div className='label'>
                    Image
                  </div> 
                  <div className='value'>
                    {
                      product.images && product.images.length === 0 ?
                      <img src="../images/sample.jpg" alt='sample' width='50'/>
                      :
                      <img src={product.images[0]} alt={`mini-${product.nom}`} width='50'/>
                    }
                    
                  </div> 
                </div>

                <div className='colonne'>
                  <div className='label'>
                    Nom
                  </div> 
                  <div className='value item'>
                    {product.nom}
                  </div> 
                </div>

                <div className='colonne'>
                  <div className='label'>
                    Catégorie
                  </div> 
                  <div className='value item'>
                    {product.catégorie}
                  </div> 
                </div>

                <div className='colonne'>
                  <div className='label'>
                    Prix
                  </div> 
                  <div className='value item'>
                    {product.prix} €
                  </div> 
                </div>

                <div className='colonne'>
                  <div className='label'>
                    Stock
                  </div> 
                  <div className='value item'>
                    {product.stock===0? <span className='alert-danger p-2'>Aucun</span> : <span className='alert-success p-2'>{product.stock}</span>}
                  </div> 
                </div>

                <div className='colonne'>
                  <div className='label'>
                    Livraison
                  </div> 
                  <div className='value item'>
                  {product.livraison?<div className='alert-success'>Livrable</div> : <div className='alert-warning'>Non-livrable</div>}
                  </div> 
                </div>

                <div className='colonne'>
                  <div className='label'>
                    Couleurs
                  </div> 
                  <div className='value item'>
                    {product.couleurs.length!==0? product.couleurs.map((couleur, index)=><div key={index}>{couleur}</div>):'Aucune'}
                  </div> 
                </div>

                <div className='icon-sup'>
                  <IconeDiv>
                    <i className="fas fa-trash-alt" id={product._id} onClick={(event) => deleteHandler(event)}/>
                  </IconeDiv>
                </div>
              </Table>
            </ListGroup.Item>
          </ListGroup>
        )
      }
      </Container>
    </div>
  )
}



const Filters = styled.div`
  display:flex;
  justify-content: center;

  .tri{
    margin-top : 15px;
    margin-right : 15px;
  }
  .filter{
    margin-right : 15px;
    text-align : center;
  }
`

const Pagination = styled.div`
  display:flex;
  justify-content : center;
  margin : 20px auto 0px auto ;

  .page{
    text-align: center;
    color : white;
    background-color : grey;
    width : 20px;
    height : 20px;
    cursor : pointer;
    margin : 2px;
    border : 1px double #dde3e3;
  }
`

const Table = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .colonne{
    display: flex;
    flex-direction: column;
    align-items: center;
    border : 1px solid black;
    width: 100%;

    .label, .value{
      width: 100%;
      text-align: center;
    }

    .label{
      height : 25px;
      font-weight: bold;
      border-bottom : 1px solid black;
      background-color: #536565;
      color : white;
    }
    .value{
      padding-top : 5px;
      font-family : 'Roboto', sans-serif;
    }

    .value.item{
      padding-top: 20px;
    }
  }
  .icon-sup{
    display: flex;
    flex-direction: column;
    width: 30%;
    justify-content: center;
    padding-left:2%;
  }

`

const IconeDiv = styled.div`
  width : 30px;
  height : 30px;
  background-color : red;
  border-radius : 5px;
  margin : 5px auto;
  cursor: pointer;

  i{
    color: white;
    margin : 9px;
  }
`

const ModalContainer = styled.div`
  position : fixed;
  width : 100%;
  height : 100%;
  background-color : rgba(0,0,0, 0.8);
  z-index: 10000000000000;
  top : 0;
  left : 0;

  .modal-card {
    width : 400px;
    height : 200px;
    background : white;
    margin : 100px auto;
    border-radius : 5px;

    .message-alert{
      text-align: center;
      font-weight : bold;
      font-size : 1.3em;
      padding : 40px;
    }
    .button-container{
      display : flex;
      justify-content: center;

      button {
        margin : 0 10px;
      }
    }

  }
`

export default AdminListProducts
