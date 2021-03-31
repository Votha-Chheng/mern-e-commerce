import React from 'react'
import styled from 'styled-components'

const BullesStats = ({items, itemsArray, icon}) => {
  return (

    <Wrapper className='bulle'>
      <i className={icon}></i>
      <div>Nombre total de {items} enregistrés :</div>
      {
        itemsArray && <span>{itemsArray.length}</span>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align : center;
  width : 200px;
  height : 200px;
  background-color : #005fb8;
  color : #ffffff;
  padding : 10px;
  border-radius : 10px;

  div{
    font-family : 'Roboto', sans-serif;
    font-weight : bold;
    font-size : 1.2em;
  }
  span{
    font-size : 1.5em;
  }
  i{
    margin : 10px auto 20px auto; 
    transform : scale(2)
  }
`

export default BullesStats
