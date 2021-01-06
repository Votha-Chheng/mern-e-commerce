import React from 'react'
import logo from '../images/fb.svg'
import styled from 'styled-components'


const IntegrateurFacebook = () => {
  return (
    <Wrapper>
      <div className="separateur">
      </div>
      <h4>Suivez-moi sur Facebook <span><a href="https://www.facebook.com/Luminaires-Cavallo-359755131496855/" target='_blank' rel="noreferrer"><img src={logo} width='25px' alt ='logoFacebook'/></a></span></h4>

      <div id="facebook-container">
        <div className="fb-page" 
        data-href="https://www.facebook.com/Luminaires-Cavallo-359755131496855"
        data-width="340" 
        data-hide-cover="false"
        data-show-facepile="false">
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin : 80px auto;
  width: 100%;
  text-align: center;

  .separateur{
    margin : 50px auto;
    width :50px;
    height :3px;
    background-color:#0C1B33
  }
  h4{
    text-align : center;
    width :100%;
    font-size : 1.8em;
  }
  
`

export default IntegrateurFacebook
