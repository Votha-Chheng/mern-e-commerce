import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import { pageTransition } from '../fonctionsOutils'

const LegalScreen = () => {
  return (
    <Wrapper variants={pageTransition} initial='initial' animate='animate' exit='exit' >
      <h2>
        Mentions Légales
      </h2>
        <ul>
          <li><em className='font-weight-bold'>Les Luminaires Cavallo</em> par François Cavallo Micro-entrepreneur</li>
          <li>N°SIRET : 82812114500019</li>
          <li>Siège social : Grand Mas d'Avignon, Le Sambuc 13200 Arles</li>
          <li>Email : <a href="mailto:contact@luminaires-cavallo.fr">contact@luminaires-cavallo.fr</a></li>
          <li>TVA non applicable, art. 293B du CGI</li>
        </ul>
      <br/>
        <ul>
          <li>
            <span className="font-weight-bold">Photographies:</span> <br/>
            <p>Tous les contenus, images, photographies, vidéos, dessins, logos sont la propriété de François Cavallo.</p>
          </li>
          <li>
            <span className="font-weight-bold">Propriété intellectuelle :</span> <br/>
            <p>Le site internet, les photos, le texte, sont la propriété exclusive de François Cavallo. Toute représentation partielle ou totale du site est strictement interdite.</p>
          </li>
          <li>
          <span className="font-weight-bold">Droit applicable :</span> <br/>
            <p>Le présent site est soumis au droit français.</p>
          </li>
          <li>
          <span className="font-weight-bold">Conception du site :</span><br/>
            <p>Votha Chheng</p>
          </li>
          <li>
            <p>Hébergé par OVH</p>
          </li>
        </ul>
      <br/>
        
    </Wrapper>
  )
}

const Wrapper = styled(motion.div)`
  width: 60%;
  margin : 0 auto;
  
  h2{
    text-align: center;
    margin : 50px auto;
  }
  ul{
    list-style: none;
  }
  ul li{
    font-size:1.4em;
    margin : 20px auto;
  }
  li p, li span {
    font-size: 1.1em;
  }
`

export default LegalScreen
