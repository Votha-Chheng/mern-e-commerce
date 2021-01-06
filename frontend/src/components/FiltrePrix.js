import React from 'react'
import styled from 'styled-components'

const FiltrePrix = () => {
  return (
    <Wrapper>
      <div className='range-container'>
          <div className='prix mini'>
            Min.
            <div className='input'><input type='text' name='minimum-prix' id='minimum-prix'/> €</div>
          </div>
          <div className=' prix maxi'>
            Max.
            <div className='input'><input type='text' name='maximum-prix' id='maximum-prix'/> €</div>
          </div>
      </div>
      
    </Wrapper>
  )
}

const Wrapper = styled.div`
  #minimum-prix, #maximum-prix{
    width : 60px;
    text-align : right;
  }
  .range-container{
    display : flex;
    flex-direction : row;
  }
  .prix{
    display : flex;
    flex-direction : column;
    margin : 0 10px;
  }
`

export default FiltrePrix
