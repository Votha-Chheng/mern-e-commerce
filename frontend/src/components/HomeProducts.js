import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import axios from 'axios'
import styled from 'styled-components'
import CardHome from './CardHome'

const HomeProducts = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () =>{
      const {data} = await axios.get('/api/products')
      const derniersProduits = [data[data.length-1], data[data.length-2],data[data.length-3],data[data.length-4]]
      setProducts(derniersProduits)
    }
    fetchProducts()
  }, [])

  

  return (
    <Wrapper>
      <section>
        <h2>
          Derniers produits
        </h2>
        <div className='separateur'></div>
        <div className='forme-1'></div>
        <div className='forme-2'></div>

        <Container id='conteneur-produits' fluid>
          <Row style={{display:'flex', flexDirection: 'row', justifyContent:'space-between'}}>
            {products.map((product, index) => (
              <CardHome product = {product} key={index}/>
            ))}
          </Row>
        </Container>  
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  
  section{
    position: relative;
    margin : 50px auto;
    background-color: #C4A77D;
    width: 100%;
    min-height : 750px;
  }
  h2{
    padding-top :30px;
    text-align: center;
  }
  .separateur{
    margin : 30px auto;
    width :50px;
    height :3px;
    background-color:#0C1B33
  }
  .forme-1{
    position: absolute;
    width: 960px;
    height : 150px;
    background-color:#605c4e;
    z-index: -0.5;
    top : 120px;
    left : 50px;
  }
  .forme-2{
    position: absolute;
    width: 760px;
    height : 280px;
    background-color:#999ba0;
    z-index: -0.5;
    top : 390px;
    right : 100px;
    margin-right:50px;
  }
  @media only screen and (max-width: 1440px){
    #conteneur-produits{
      width: 800px;
      padding-bottom: 50px;
    }
    .forme-2{
      width: 760px;
      height : 280px;
      background-color:#999ba0;
      z-index: 0;
      top : 690px;
      margin-right:50px;
    }
  }
  @media only screen and (max-width: 1060px){
    #conteneur-produits{
      width: 100%;
      padding-bottom: 50px;
    }
    .forme-2, .forme-1{
      display: none;
    }
  }  
`

export default HomeProducts
