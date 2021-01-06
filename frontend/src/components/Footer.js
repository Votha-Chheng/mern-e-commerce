import React from 'react'
import styled from 'styled-components'
import logo from '../images/logoCavallo.svg'
import Photo from './Photo'
import {Container, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Footer = () => {

  const handleClick = ()=>{
    window.scrollTo(0,0)
  }

  return (
    
    <Wrapper>
      <footer>
        <Container id="container-elements" fluid>
          <Row>
            <Col md={12} lg={4} className='py-auto'>
            <div id='logo-footer'>
              <div>
                <Photo src={logo} alt="luminaires Cavallo" height='100%' width="280px"/>
              </div>
              <h3>Luminaires Cavallo</h3>
            </div>
            </Col>

            <Col md={12} lg={4}>
              <div id='infos'>
                <h4>Informations</h4>
                <Link to='/mentionslegales' onClick={handleClick}><p>Mentions légales</p></Link>
                <Link to='/confidentialite' onClick={handleClick}><p>Politique de confidentialité</p></Link>
                <Link to='/cgv' onClick={handleClick}><p id="conditions">Conditions générales de vente</p></Link>
              </div>
            </Col>
            
            <Col md={12} lg={4}>
              <div>
                <div id='atelier'>
                  <h4>Mon atelier</h4>
                  <p><i className="fas fa-map-marker-alt"></i>  Grand Mas d'Avignon, Le Sambuc 13200 Arles</p>
                  <p><i className="fas fa-phone-alt"></i>  04 90 87 88 74</p>
                  <p id='email'><i className="fas fa-at"></i> Me contacter par e-mail.</p>
                </div>            
              </div> 
            </Col>
            
          </Row>
        </Container>
        <div id='copyright'>
          <p>&copy; Votha Chheng</p> 
        </div>
      </footer>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  footer{
    background-color: #0C1B33;
    color: #C4A77D;
    height: 100%;
    padding-top: 0px ;
  }
  #container-elements{
    padding-bottom:25px;
  }
  #logo-footer{
    text-align: center;
    margin-top : 30px;
  }
  h3{
    color: #C4A77D;
    width: 13.6em;
    border-top: 1px solid #C4A77D;
    margin-top : 5px;
    margin-left:auto;
    margin-right:auto;
    font-size : 1.5em
  }
  #infos, #atelier{
    border-left: 2px solid #C4A77D;
    padding-bottom: 0px;
    padding-left:15px;
    margin-top : 20px;
  }
  #infos p{
    cursor: pointer;
    color : #C4A77D;
  }
  h4{
    color: #C4A77D;
    padding-bottom: 15px;
  }
  #email{
    margin-bottom: 0px;
    color: #C4A77D;
  }
  #conditions{
    margin-bottom: 0px;
  }
  #copyright{
    margin : 0 auto;
    text-align: center;
    width: 90%;
  }
  #copyright p{
    margin-top: 10px;
    margin-bottom:2px;
    padding : 10px;
    border-top: 1px solid #C4A77D;
  }
  #email{
    cursor: pointer;
  }
  @media only screen and (max-width: 991px){
    #infos, #atelier{
      margin-left: 55px;
      margin-bottom : 30px;
    }
    #logo-footer{
      margin-bottom:50px;
    }
  }
  @media only screen and (max-width: 660px){
    #infos, #atelier{
      margin-left: 0px;
    } 
  }
`

export default Footer
