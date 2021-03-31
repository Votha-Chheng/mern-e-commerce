import React, {useState, useEffect} from 'react'
import {formatDate, resume} from '../fonctionsOutils'
import styled from 'styled-components'
import Separateur from './Separateur'
import { useDispatch, useSelector } from 'react-redux'
import { getAllArticles } from '../actions/blogActions'
import LoaderSpin from './LoaderSpin'
import ContainerImg from './ContainerImg'
import { Link } from 'react-router-dom'


const HomeCarousel = () => {

  const [index, setIndex] = useState(0)

  const dispatch = useDispatch()

  const {articles, loadingAllarticles, errorAllArticles} = useSelector(state => state.allArticles)


  useEffect(() => {
    dispatch(getAllArticles())
  }, [dispatch])

  const handlePrevious = ()=>{
    setIndex(index-1)
    if(index<=0){
      setIndex(articles.length-1)
    }    
  }

  const handleNext = ()=>{
    setIndex(index+1)
    if (index===articles.length-1){
      setIndex(0)
    }    
  }

  const defineClassName = (indexObjet, className1, classActive, className3)=>{
    let position = ""
    if(index===articles.length-1){
      if(indexObjet===0){
        position = className1
      } else if(indexObjet===articles.length-1){
        position = classActive
      }
       else{
        position = className3
      } 
    } else if(index=== indexObjet){
      position = classActive
    } else if (index === indexObjet-1){
      position = className1
    } else {
      position = className3
    }
    return position
  }

  return (
    <Div>
      <h2>
        Actualités du blog
      </h2>
      <Separateur/>
      <div className="widget-carousel">
        <div className="main-actu">
          <div className="prev" onClick={handlePrevious} ><i className="fas fa-caret-square-left"></i></div>
          <div className="next" onClick={handleNext}><i className="fas fa-caret-square-right"></i></div>

          { 
            loadingAllarticles ? <LoaderSpin/> :
            errorAllArticles ? <div className='alert-danger h4 text-center'></div> :
            articles && articles.reverse().map((item, indexItem)=> (
            <div className={defineClassName(indexItem, 'actu right', 'actu active', 'actu left')} key={indexItem} >
              <div 
                className="actu-img-frame"
              >
                <ContainerImg
                  imageUrl={item.photos[0].url}
                  frameWidth = '420px'
                  frameHeight = '320'
                />
              </div>
              <h3 className="titre-carousel"><Link to={`/blog/${item._id}`}>{item.titre}</Link></h3>
              <p className="date-carousel">Publié le {formatDate(item.dateBillet)}</p>
              <div className="texte-carousel">
                <p dangerouslySetInnerHTML={{__html : resume(item.texte, 150)}}></p><br/>
                <Link to={`/blog/${item._id}`}>Lire la suite...</Link>
              </div>
            </div>
            )
          )} 
        </div>

        <div className="colonne">
          {articles && articles.reverse().map((item, indexItem)=>(  
            <div className={defineClassName(indexItem, 'actu-colonne up', 'actu-colonne active-right', 'actu-colonne down')} key={indexItem}>
              <h3 className="titre-colonne"><Link to={`/blog/${item._id}`}>{item.sousTitre ? item.sousTitre : item.titre}</Link></h3>
              <p className="text-colonne" dangerouslySetInnerHTML={{__html : resume(item.texte, 220)}}></p>
              <Link to={`/blog/${item._id}`}>Lire la suite...</Link>
            </div>
            )
          )} 
        </div>
      </div>
    </Div>
  )
}

const Div = styled.div`
  h2{
    text-align: center;
  }
  .texte-carousel {
  display : none;
  }

article{
  width: 100%;
  height : 100%;
}
.widget-carousel{
  display : flex;
  flex-direction: row;
  width: 60%;
  height : 400px;
  margin: 50px auto;

}
.main-actu{
  position: relative;
  display : flex;
  flex-direction: row;
  flex-wrap: nowrap;
  /* overflow: hidden; */
  width : 70%;
}
.colonne{
  position: relative;
  display : flex;
  flex-direction: column;
  width : 30%;
  height : 400px;
}
.prev{
  position: absolute;
  transform: scale(4);
  top: 180px;
  left : 3% ;
  opacity: 0.2;
  transition: all 0.1s;
  cursor: pointer;
  z-index: 10;
}
.next{
  position: absolute;
  transform: scale(4);
  top: 180px;
  right : 3% ;
  opacity: 0.2;
  transition: all 0.1s;
  cursor: pointer;
  z-index: 10;
}
.prev:hover, .next:hover{
  opacity: 1;
}

.actu{
  position: absolute;
  overflow : hidden;
  height : 400px;
  transition: all 0.5s ease-out;
  /* transform: translateY(-10px); */
  
}
.actu-colonne{
  position: absolute;
  padding: 15px;
  min-height: 200px;
  max-height: 200px;
  transition: all 0.5s ease-out;
  z-index: 10;
}
.actu-img-frame{
  overflow: hidden;
  max-width: 420px;
  max-height: 320px;
  margin: 0 auto;
  border: 5px solid black;
}
.titre-carousel{
  padding-top: 20px;
  text-align : center;
}
.date-carousel{
  padding-top: 0px;
  text-align : center;
}

.right{
  overflow : hidden;
  transform:translateX(20%) scale(0) translateX(300%);
  opacity: 0;
  max-width :10%;
}
.left{
  overflow : hidden;
  transform:  translateX(-50%) scale(0) translateX(-200%) ;
  opacity: 0;
  max-width :10%;
}
.active{
  transform: translateX(0) scale(1);
  
  opacity: 1;
  max-width :100%;
  min-width:100%;
}
.up{
  transform: translateY(-100%);
  opacity:0;
  z-index: -20;
}
.down{
  transform: translateY(100%);
  max-height: 0;
  opacity:0;
  z-index: -20;
}
.active-right{
  transform: translateY(0);
  z-index: 10;
}


@media only screen and (max-width: 950px){
  .colonne, .actu-colonne{
    display: none;
    /* opacity: 0; */
    z-index: -100;
  }
  .main-actu{
    min-width: 100%;
  }
  .actu{
    min-height: 550px;
  }
  .texte-carousel {
    display: contents;
  }
  .widget-carousel{
    min-height : 550px;
  }
  img{
    width : 400px
  }
}
@media only screen and (max-width: 750px){
  .actu-img-frame{
    width : 100%
  }
}
@media only screen and (max-width: 550px){
  .actu-img-frame{
    max-width : 250px;
    max-height : 200px;
  }
  .actu-img-frame img{
    width : 350px
  }
}
`

export default HomeCarousel
