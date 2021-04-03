import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import { pageTransition } from '../fonctionsOutils'
import photo1 from "../images/IMG_20180415_0044.jpg"
import photo2 from "../images/IMG_20180415_0042.jpg"
import photo3 from "../images/IMG_20180415_0038.jpg"
import photo4 from "../images/IMG_20180415_0043.jpg"

const PresentationScreen = () => {
  return (
    <Wrapper variants={pageTransition} initial='initial' animate='animate' exit='exit' >
      <h2>Qui suis-je ?</h2><br/>
      <span className="font-weight-bold h4">Quelques mots sur moi...</span><br/><br/>
     
      <span className="h5">Bonjour,</span><br/><br/>
      <p>
        Je suis un jeune artisan, qui s'est lancé en 2018 dans la création de luminaires en bois flottés. Au gré de mes essais, découvertes et créa&shy;tions j'ai développé cer&shy;tains styles origi&shy;naux. J'ai souhaité dès le début sortir des modèles clas&shy;siques empilant simple&shy;ment des bois. Les bois flottés ne manquent pas sur les plages ou au bord des fleuves. Je recherche avant tout des bois aux formes irrégu&shy;lières, si&shy;nueuses et marqués par les élé&shy;ments afin de les mettre en scènes pour des lampes uniques. L'idée est qu'elles soient autant utile dans leur rôle de lampes qu'objet déco&shy;ratif. Cer&shy;taines res&shy;sem&shy;blent à des sculp&shy;tures, d'au&shy;tres per&shy;met&shy;tent des jeux d'ombres et lu&shy;mières, d'au&shy;tres re&shy;flètent notre imagi&shy;naire.
      </p>
      <p>Petit à petit je me suis tourné vers des maté&shy;riaux de récu&shy;pération et des bois bruts pour répondre à mes nou&shy;velles idées.</p>
      <p>
        J'avance pas à pas dans cette aventure, et après plusieurs mois à dé&shy;velopper mon activité, je lance maintenant ce site internet afin de faire découvrir mon travail et vous proposer mes cré&shy;ations. N'hésitez pas à me contacter pour des infor&shy;ma&shy;tions complémen&shy;taires sur celles-ci.
      </p>

      <p className='text-right'>Bonne visite.</p>
      <p className='text-right'>François</p>
      <div className='img-container'>
        <img src={photo1} width='450' alt='mes outils'/>
        <img src={photo2} width='450' alt='en plein travail'/>
        <img src={photo3} width='450' alt='en plein travail'/>
        <img src={photo4} width='450' alt='devant mon petit entrepôt'/>
      </div>
      
      
    </Wrapper>
  )
}

const Wrapper = styled(motion.div)`
  width: 1000px;
  margin: 50px auto;
  line-height: 2em;

  h2{
    text-align: center;
  }
  p{
    text-indent : 20px;
    font-size: 1.2em;
    text-align: justify;
    padding: 10px;
  }
  .img-container{
    margin-top : 50px;
    width: 1000px;
    display: flex;
    flex-wrap : wrap;
    justify-content: center;

    img{
      margin : 5px;
    }
  }

  @media only screen and (max-width: 1000px){
    width : 640px;

    .img-container{
      width: 640px;
    }
  }
  @media only screen and (max-width: 640px){
    width: 80%;
    .img-container{
      margin : 0 auto;
      width: 80%;
      overflow: hidden;
      flex-direction : column;
      align-items: center;

      img{
        object-fit : contain;
        width : 80%;
      }
    }
  }
`

export default PresentationScreen
