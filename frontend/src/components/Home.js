import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import rond from '../images/Group_1.svg'
import photo1 from '../images/photoeffets.com_.jpg'
import photo2 from '../images/photoeffets.com_ (2).jpg'
import photo3 from '../images/9902ADA5-15E4-4FAD-958A-1CD870D121BF_1_105_c2.jpeg'
import photo4 from '../images/couv_4.jpg'

const Home = () => {

  const rondAnim = {
    hidden: {x:-700, scale:0.7},
    show: {x:0, scale :1, transition: {ease : 'easeOut', duration : 2.2}}
  }

  const titleAnim = {
    left: { opacity : 0},
    set : { opacity : 1, transition : {ease : 'easeOut', delay:1.9, duration : 1.7}}
  }

  const photosAnim = {
    hidden: { opacity : 0},
    set : { opacity : 1, transition : {delay:2, delayChildren : 2.3, staggerChildren : 0.5}}
  }
  const photoDisplay = {
    hidden: { opacity : 0},
    set : { opacity : 1, transition : {ease : 'easeIn'}}
  }

  const carre1Anim = {
    start : { opacity : 0, y : 900},
    end: { opacity : 1, y:0, transition : {ease : 'easeOut', delay:0.7, duration : 0.7}}
  }
  const carre3Anim = {
    start : { opacity : 0, y : -900},
    end: { opacity : 1, y:0, transition : {ease : 'easeOut', delay:0.9, duration : 0.8}}
  }
  const carre2Anim = {
    start : { opacity : 0, x : -500},
    end: { opacity : 1, x:0, transition : {ease : 'easeOut', delay:1.2, duration : 0.9}}
  }
  const carre4Anim = {
    start : { opacity : 0, x : 500},
    end: { opacity : 1, x:0, transition : {ease : 'easeOut', delay:1.2, duration : 0.8}}
  }

  return (
    <Wrapper>
      <main>
        <motion.div variants={rondAnim} initial="hidden" animate='show'>
          <img className='rond' src={rond} alt="rond"  />
        </motion.div>
        
        <motion.div variants={titleAnim} initial="left" animate='set' id="conteneur-texte">
          <h2><span>Lampes en</span> <span>bois flotté</span></h2>
          <h3>Créations 100% originales<br/>Fabrication 100% artisanale</h3>
          <Link to='/produits'><button id="btn-articles">Voir les produits</button></Link>
        </motion.div>
        <motion.div id='carre-1' className="carre" variants={carre1Anim} initial='start' animate='end' >
        </motion.div>
        <motion.div id='carre-2' className="carre" variants={carre2Anim} initial='start' animate='end'>
        </motion.div>
        <motion.div id='carre-3' className="carre" variants={carre3Anim} initial='start' animate='end'>
        </motion.div>
        <motion.div id='carre-4' className="carre" variants={carre4Anim} initial='start' animate='end'>
        </motion.div>
        <Frame>
          <motion.div id="images-presentation" variants={photosAnim} initial="hidden" animate='set' >
            <motion.div variants={photoDisplay}><img id="image-front-4" className="image-front" src={photo4} width="380" alt="front-4" /></motion.div>
            <motion.div variants={photoDisplay}><img id="image-front-3" className="image-front" src={photo3} width="400" alt="front-3" /></motion.div>
            <motion.div variants={photoDisplay}><img id="image-front-1" className="image-front" src={photo1} width="375" alt="front-1" /></motion.div>
            <motion.div variants={photoDisplay}><img id="image-front-2" className="image-front" src={photo2} width="325" alt="front-2"/></motion.div>
          </motion.div>
        </Frame>
      </main>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  main{
    position: relative;
    min-height: 900px;
  }
  #conteneur-texte{
    position : absolute;
    top: 250px;
    left: 50px;
    z-index : 10;
  }
  .rond{
    width: 900px;
    transition : all 0.5s;
  }
  h2{
    text-transform: none;
    font-size: 4em;
    font-family: 'La Belle Aurore', cursive;
    padding: 10px auto 25px 10px;
  }
  h3{
    padding-top: 20px;
    text-transform: capitalize;
    line-height: 40px;
    font-size :2em;
    font-family:'Lato', sans-serif;
  }
  #carre-1{
    position: absolute;
    width: 100px;
    height: 850px;
    background-color:#C4A77D;
    top: 10px;
    right : 20px;
    border : solid 2px white;
  }  
  #carre-2{
    position: absolute;
    width: 500px;
    height: 200px;
    background-color:#c89b7b;
    top: 194px;
    right : 350px;
    border : solid 2px white;
  }
  #carre-3{
    position: absolute;
    width: 370px;
    height: 680px;
    background-color:#e4e9b2;
    top: 140px;
    right : 130px;
    border : solid 2px white;
  }
  #carre-4{
    position: absolute;
    width: 650px;
    height: 280px;
    background-color:#D0D6B5;
    top: 450px;
    right : 70px;
    border : solid 2px white;
  }
  button{
    margin: 50px auto;
    border: 2px solid grey;
    font-size: 1.4em;
    padding: 15px;
    background-color:#202C59 ;
    color: white;
    text-transform: uppercase;
    cursor: pointer;
  }
  @media only screen and (max-width: 1450px){
    #carre-2{
      right: 100px;
      width: 380px;
    }
     #carre-3{
      width: 230px;
      height: 580px;
    } 
    #carre-4{
      top:700px;
      width: 500px;
      height: 100px;
    }
  }
  @media only screen and (max-width: 1130px){
    .rond{
      width:750px;
    }
    h2{
      font-size: 3em;
    }
    h3{
      font-size: 1.5em;
      line-height: 25px;
    }
  }
  @media only screen and (max-width: 1040px){
    #carre-1{
      height: 900px;
    }
    #carre-3,#carre-2, #carre-4{
      height: 250px;
      width: 250px
    }
    #carre-2{
      right: 140px;
      top:320px;
    }
    #carre-3{
      top:300px;
      right:120px;  
    }
    #carre-4{
      top:280px;
      right:100px; 
    }
    .rond{
      margin-top:70px;
      width:700px;
    }
    #conteneur-texte{
      top:248px;
    }
  }
  @media only screen and (max-width: 825px){
    main{
      min-height: 600px;
    }
    .rond{
      width:500px;
      margin:120px auto;
    }
    #carre-1{
      height:750px;
    }
    #carre-2,#carre-3,#carre-4{
      transform:scale(0.8) translateX(65px) translateY(65px)
    }
    h2{
      font-size: 2.5em;
    }
    h3{
      font-size: 1.2em;
      line-height: 25px;
    }
    button{
      margin: 10px auto;
      font-size: 1.1em;
    }
  }
  @media only screen and (max-width: 665px){
    main{
      min-height: 780px;
    }
    .rond{
      margin-left:-20px;
      max-width:340px;
    }
    #carre-2,#carre-3,#carre-4{
      display:none;
    }
    #conteneur-texte{
      left:10px;
      text-align: center;
    }
    h2{
      font-size: 2.4em;
      font-weight: bold ;
    }
    h3{
      padding-top:0px;
      font-size: 1em;
      line-height: 20px;
    }
    button{
      margin: 10px auto;
      font-size: 1.1em;
    }
    #carre-1{
      right:10px
    }
  }
`

/*************/

const Frame = styled.section`
  .invisible{
    opacity: 0;
    transform:translateY(50%)
  }
  #images-presentation{
    opacity: 1;
    
  }
  .image-front {
    border : solid 5px white;
    position: absolute;
    transition: all 2s ease-out;
  }
  #image-front-1{
    top: 40px;
    right : 70px;
  }
  #image-front-2{
  top: 380px;
  right : 100px;
  overflow: hidden;
  }
  #image-front-3{
    top: 180px;
    right : 360px;
    overflow: hidden;

  }
  #image-front-4{
    top: 480px;
    right : 410px;
    overflow: hidden;
  }
  @media only screen and (max-width: 1450px){
    #image-front-2{
      top:328px;
      right : 40px;
      transform:scale(1)
    }
    #image-front-1{
      transform:scale(0.78);
      right : 15px
    }
    #image-front-3{
      transform:scale(0.8);
      right : 270px;
      top:270px;
    }
    #image-front-4{
      transform:scale(0.8);
      top:510px;
      right : 230px;
    }
  }
  @media only screen and (max-width: 1040px){
    #image-front-1{
      transform:scale(0.65);
      top:-40px;
      right : 15px
    }
    #image-front-2{
      top:216px;
      right : 40px;
      transform:scale(0.75)
    }
    #image-front-3{
      transform:scale(0.61);
      right : 3px;
      top:435px;
    }
    #image-front-4{
      transform:scale(0.61);
      top:635px;
      right : 3px;
    }
  }
  @media only screen and (max-width: 825px){
    #image-front-1{
      transform:scale(0.5);
      top:40px;
      right : -50px;
    }
    #image-front-2{
      top:216px;
      right : 0px;
      transform:scale(0.57);
      z-index:0;
    }
    #image-front-3{
      transform:scale(0.48);
      right : -60px;
      top:365px;
      z-index:0;
    }
    #image-front-4{
      transform:scale(0.48);
      top:510px;
      right : -38px;
    }
  }
  @media only screen and (max-width: 665px){
    
    #image-front-1{
      top:-40px;
      right : -50px;
    }
    #image-front-2{
      display:none;
    }
    #image-front-3{
      transform:scale(0.58);
      right : 150px;
      top:375px;
    }
    #image-front-4{
      transform:scale(0.58);
      top:555px;
      right : -38px;
    }
  }
  @media only screen and (max-width: 500px){
    #image-front-1{
      right:auto;
    }
    #image-front-3{
      right : auto;
      top:405px;
    }
    #image-front-4{
      top:580px;
      right : 0px;
      z-index:0 ;
    }
  }
`
export default Home
