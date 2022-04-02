import React, {useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { formatDate, resume } from '../fonctionsOutils'
import LoaderSpin from './LoaderSpin'

const BlogCard = ({billet, loading}) => {

  const [ratio, setRatio] = useState('')
  const [ref, setRef] = useState('') 

  useEffect(() => {
    setRatio(ref.offsetWidth/ref.offsetHeight)
  }, [ref])

  return (
    <Wrapper>
      <Link to={`/blog/${billet._id}`} style={{ textDecoration: 'none' }}><h4><span>{billet.titre}</span></h4></Link>

      <div className='card-content'>
        
        <div className='image-container'>
          <Link to={`/blog/${billet._id}`}>
          {
            loading ? <LoaderSpin/> :
            billet.photos[0] && 
            <img 
              onLoad={()=> setRatio(ref.offsetWidth/ref.offsetHeight)}
              className={ `${ratio>1 ? 'horizontal' : 'vertical' }`}
              src={billet.photos[0]}
              alt = {billet.titre}
              ref={newRef => setRef(newRef)} 
              style = {{transform : `${ratio>1 ? 'translateX(-20%)' : 'translateY(-20%)'}`}}
            /> 
          }
          </Link>
        </div>
        
        <div className='texte-container'>
          <h5>
            {billet.sousTitre}
          </h5>
          <div className='date-billet'>Ecrit le {formatDate(billet.dateBillet)}</div>
          <div 
            className='resume'
            dangerouslySetInnerHTML={{__html : resume(billet.texte, 175)}}
          >
          </div>
          <Link to={`/blog/${billet._id}`}><div className='link'>Lire la suite</div></Link>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border-right: 8px solid #e0e0e0;
  
  h4 {
    text-align: center;
    font-family: 'Indie Flower', cursive;
    
    span{
      border-bottom : 2px solid #282853;
      padding-bottom : 5px;
      
      &:hover {
      background-color :#f5f5f5;
    }
    }
  }
  
  .card-content{
    display : flex;
    padding-top : 25px;

    .image-container{
      margin: 0 auto; 
      max-width: 300px;
      max-height: 300px;
      overflow : hidden;

      img{
        text-align: center;
        object-fit : cover;
        padding: 0 auto;
        object-fit:'cover';
      }
      img.vertical{
        height : 500px;
      }
      img.horizontal{
        width:500px;
      }
    }
    .texte-container{
      width : 60%;

      h5{
        font-family: 'Indie Flower', cursive;
        padding-bottom : 5px;
      }
      .date-billet{
        margin : 10px 0;
        font-family : 'Oswald', sans-serif;
        font-weight: bold;
      }
      .resume{
        margin : 20px 0;
        font-family: 'Cabin', sans-serif;
        font-size : 1.1em;
      }
      .link{
        font-style : italic;
        font-size : 1.2em;
      }
    }
  }
  @media only screen and (max-width: 750px){
    width : 350px;

    .card-content{
      flex-direction:column;
      align-items:center;
      width : 350px;
      .image-container{
        width : 300px;
        img{
          object-fit : cover;
        }
      }
      .texte-container{
        margin-top : 15px;
        width : 320px;
      }
    }
  }
  

    
`

export default BlogCard
