import React from 'react'
import styled from 'styled-components'

const Filtres = ({categories, indexOnglet, clic}) => {

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(e)
  }
  const handleClick = ()=>{

  }

  return (
    <Wrapper>
      <div className='filtre-prix'>
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
      </div>
      <div className='conteneur-onglets'>
          {categories.map((category, index) =>(
            <button key={index} name='category' type='submit' name='category' id={index} onClick={clic} className={indexOnglet===index? 'onglet active' : 'onglet'} >{category}</button>
          ))}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
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
    transform:translateX(0);
    transition : all 0.3s;
  }
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

export default Filtres
