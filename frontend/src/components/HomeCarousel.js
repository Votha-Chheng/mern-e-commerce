import React, {useState, useRef, useEffect} from 'react'
import articles from '../data/articles'
import styled from 'styled-components'


const HomeCarousel = () => {

  const [index, setIndex] = useState(0)
  const [ratioFrame, setRatioFrame] = useState(0)
  const [ratioImg, setRatioImg] = useState(0)
  const [imgWidth, setImgWidth] = useState(0)
  const imgFrame = useRef([]);
  const imgFormat = useRef([]);



  useEffect(()=>{
    
    setTimeout(()=>{
      setRatioFrame(imgFrame.current[index].offsetWidth/imgFrame.current[index].offsetHeight)
      setRatioImg(imgFormat.current[index].naturalWidth/imgFormat.current[index].naturalHeight)
      setImgWidth(imgFrame.current[index].offsetWidth)
    }, 100)
    
    window.onresize= ()=>{
      if(imgFrame.current[index]){
        setRatioFrame(imgFrame.current[index].offsetWidth/imgFrame.current[index].offsetHeight)
        setRatioImg(imgFormat.current[index].naturalWidth/imgFormat.current[index].naturalHeight)
        setImgWidth(imgFormat.current[index].offsetWidth)
      }
      
    }
     
  }, [ratioFrame, ratioImg, index, imgWidth])


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

  const resume = (texte, indexFin) =>{
    let resume = ""
    let indexEnd = texte.indexOf(" ", indexFin)
    resume = texte.substring(0, indexEnd)
    if(resume===''){
      return texte
    } else {
      resume+='...'
      return resume
    }    
  }

  return (
    <Div>
      <h2>
        Actualités du blog
      </h2>
      <div className='separateur'></div>
      <div className="widget-carousel">
        <div className="main-actu">
          <div className="prev" onClick={handlePrevious} ><i className="fas fa-caret-square-left"></i></div>
          <div className="next" onClick={handleNext}><i className="fas fa-caret-square-right"></i></div>

          {articles.map((item, indexItem)=> (
            <div className={defineClassName(indexItem, 'actu right', 'actu active', 'actu left')} key={item.id} >
              <div ref={item => imgFrame.current[indexItem] = item} className="actu-img-frame">
                <img ref={item => imgFormat.current[indexItem] = item} src={item.images[0]} alt='illustration' width = {imgWidth} style={{transform :`translateY(-${ratioFrame>2*ratioImg?(imgFrame.current[index].offsetHeight)*0.08 : 0}%)`}}/>

              </div>
              <h3 className="titre-carousel">{item.titre}</h3>
              <p className="date-carousel">{item.date}</p>
              <div className="texte-carousel">
                <p dangerouslySetInnerHTML={{__html : resume(item.texte, 150)}}></p><br/>
                <p>Lire la suite...</p>
              </div>
            </div>
            )
          )} 
        </div>

        <div className="colonne">
          {articles.map((item, indexItem)=>(  
            <div className={defineClassName(indexItem, 'actu-colonne up', 'actu-colonne active-right', 'actu-colonne down')} key={item.id}>
              <h3 className="titre-colonne">{item.titre}</h3>
              <p className="text-colonne" dangerouslySetInnerHTML={{__html : resume(item.texte, 250)}}></p>
              <p>Lire la suite...</p>
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
  .separateur{
    margin : 30px auto;
    width :50px;
    height :3px;
    background-color:#0C1B33
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
  max-width: 75%;
  max-height: 300px;
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
/* img{
  width : 700px;
} */

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
