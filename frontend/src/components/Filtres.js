import React  from 'react'
import styled from 'styled-components'


const Filtres = ({categories, category, clic, handleMinPriceChange, handleMaxPriceChange, handleSortChange, minPrice, maxPrice, sort, filteredProducts}) => {

  return (
    <Wrapper>
      <div className='conteneur-filtres'>
        <div className='filtre-prix'>
          <div className='range-container'>
            <div className='prix-mini'>
              Min.
              <div className='input'><input type='text' name='minPrice' id='minimum-prix' onChange={handleMinPriceChange} value={minPrice===0? '' : minPrice}/> €</div>
            </div>
            <div className=' prix-maxi'>
              Max.
              <div className='input'><input type='text' name='maxPrice' id='maximum-prix' onChange={handleMaxPriceChange} value={maxPrice===0? '' : maxPrice}/> €</div>
            </div>
          </div>
        </div>
        <div className='trait'></div>
        <div className='nombre-objets'>
          <p>{filteredProducts.length===1 ? "1 seul produit trouvé.": `${filteredProducts.length} produits trouvés.`} </p>
        </div>
        <div className='trait'></div>
        <div className='sort'>
          <select name='sort' onChange={handleSortChange} value={sort} >
            <option value='newer'>Nouveautés d'abord</option>
            <option value='older'>Date de création</option>
            <option value='higher'>Prix croissants</option>
            <option value='lower'>Prix décroissants</option>
          </select>
        </div>
      </div>
      <div className='nombre-objets-2'>
        <p>{filteredProducts.length===1 ? "1 seul produit trouvé.": `${filteredProducts.length} produits trouvés.`} </p>
      </div>
      

      <div className='conteneur-onglets'>
          {categories.map((cat, index) =>(
            <button key={index} type='submit' name='category' onClick={clic} id={cat} className={category===cat? "active onglet" : 'onglet'} >{cat}</button>
          ))}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width : 100%;
  .nombre-objets-2{
    display : none;
  }
  .conteneur-filtres{
    display: flex;
    flex-direction : row;
    align-items : flex-end;
    justify-content: space-between;
    margin-bottom : 20px;
    .nombre-objets{
      padding-top : 10px;
      p{
        margin-bottom : 0
      }
    }
    .trait{
      background-color : #c2c2c2;
      height : 1px;
      width : 24%;
      margin-bottom:10px;
    }
  }
  select{
    font-family : 'Lato', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
  }
  button {
    overflow: hidden;
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

  @media only screen and (max-width: 1250px){
    .conteneur-filtres{
      .trait{
        max-width:12%
      }
    }
    .onglet{
      line-height : 15px;
      padding-top : 15px ;
      padding-bottom : 15px ;
    }
  }
  @media only screen and (max-width: 924px){
    .onglet{
      line-height : 10px;
      font-size : 10px;
      padding-top : 15px ;
      padding-bottom : 15px ;
    }
  }
  @media only screen and (max-width: 680px){
    .nombre-objets-2{
      display : block;
      text-align : center;
    }
    .conteneur-filtres{
      padding-right: 0;
      justify-content : space-between;
      align-items : bottom;
      .range-container{
        .prix-maxi, .prix-mini{
          margin : 0;
        }
      }
      .trait, .nombre-objets{
        display: none;
      }
      .sort{
        margin-right : 20px;
      }
    }
    .conteneur-onglets{
      width : 350px;
      margin : 0;
    }
    .onglet{
      line-height : 10px;
      font-size : 10px;
      padding-top : 10px ;
      padding-bottom : 10px ;
    }
  }
 
`

export default Filtres
