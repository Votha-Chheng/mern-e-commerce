import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Photo from './Photo'
import {Link} from 'react-router-dom'
import rond from '../images/Group_1.svg'
import photo1 from '../images/photoeffets.com_.jpg'
import photo2 from '../images/photoeffets.com_ (2).jpg'
import photo3 from '../images/9902ADA5-15E4-4FAD-958A-1CD870D121BF_1_105_c2.jpeg'
import photo4 from '../images/couv_4.jpg'

const Home = () => {
  const [invisible, setInvisible] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setInvisible(false)
    },800)
    
  }, [])

  return (
    <Wrapper>
      <main>
        <img className='rond' src={rond} alt="rond"/>
        <div id="conteneur-texte">
          <h2><span>Lampes en</span> <span>bois flotté</span></h2>
          <h3>Créations 100% originales<br/>Fabrication 100% artisanale</h3>
          <Link to='/boutique'><button id="btn-articles">Voir les produits</button></Link>
        </div>
        <div id='carre-1' className="carre">
        </div>
        <div id='carre-2' className="carre">
        </div>
        <div id='carre-3' className="carre">
        </div>
        <div id='carre-4' className="carre">
        </div>
        <Frame>
          <div id="images-presentation">
            <Photo id="image-front-1" classStyle={`image-front ${invisible ? 'invisible':''}`} src={photo1} width="375" alt="image-front-1" />
            <Photo id="image-front-2" classStyle={`image-front ${invisible ? 'invisible':''}`} src={photo2} width="325" alt="image-front-2"/>
            <Photo id="image-front-3" classStyle={`image-front ${invisible ? 'invisible':''}`} src={photo3} width="400" alt="image-front-3" />
            <Photo id="image-front-4" classStyle={`image-front ${invisible ? 'invisible':''}`} src={photo4} width="400" alt="image-front-4" />
          </div>
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
    width: 350px;
    height: 680px;
    background-color:#e4e9b2;
    top: 150px;
    right : 120px;
    border : solid 2px white;
  }
  #carre-4{
    position: absolute;
    width: 650px;
    height: 280px;
    background-color:#D0D6B5;
    top: 450px;
    right : 100px;
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
    z-index: 2;
    transition: all 1.5s ease-in-out;
  }
  #image-front-2{
  top: 400px;
  right : 100px;
  z-index: 3;
  transition: all 1.5s ease-out;
  width: 325px;
  overflow: hidden;
  }
  #image-front-3{
    top: 250px;
    right : 420px;
    z-index: 1;
    transition: all 1.5s ease-in-out;
    width: 400px;
    overflow: hidden;
  }
  #image-front-4{
    top: 550px;
    right : 370px;
    z-index: 1;
    transition: all 1.5s ease-out;
    width: 400px;
    overflow: hidden;
    z-index:53;
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
