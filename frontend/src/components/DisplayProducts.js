import React from 'react'
import styled from 'styled-components'
import CardHome from './CardHome'

const DisplayProducts = ({filteredProducts}) => {
  return (
    <Wrapper>
      <div className="products-container">
        {filteredProducts.map(product =>(
          <div 
            className='card-container' 
            key={product._id}
          >
            <CardHome product={product}/>
          </div>
        ))}
      </div>
    </Wrapper>
  )
}

const Wrapper  = styled.div`
  width : 100%;
  .card-container{
    border: solid 1px #eaf0ce;
    margin-bottom : 25px;
    height:510px;
    overflow: hidden;
  }
  .products-container{
    width : 100%;
    display: flex;
    flex-wrap :wrap;
    justify-content:space-evenly;
  }

  @media only screen and (max-width: 1490px){
    .card-container{
      height : 460px;
    }
  }

`


export default DisplayProducts
