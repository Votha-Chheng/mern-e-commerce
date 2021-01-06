import React from 'react'
import styled from 'styled-components'

const PresentationScreen = () => {
  return (
    <Wrapper>
      <h2>Qui suis-je ?</h2><br/>
      <span className="font-weight-bold h4">Quelques mots sur moi...</span><br/><br/>
     
      <span className="h5">Bonjour,</span><br/><br/>
      <p>
        Je suis un jeune artisan, qui s'est lancé en 2018 dans la création de luminaires en bois flottés. Au gré de mes essais, découvertes et créa&shy;tions j'ai développé cer&shy;tains styles origi&shy;naux. J'ai souhaité dès le début sortir des modèles classiques empilant simplement des bois. Les bois flottés ne manquent pas sur les plages ou au bord des fleuves. Je recherche avant tout des bois aux formes irrégu&shy;lières, si&shy;nueuses et marqués par les éléments afin de les mettre en scènes pour des lampes uniques. L'idée est qu'elles soient autant utile dans leur rôle de lampes qu'objet décoratif. Cer&shy;taines ressem&shy;blent à des sculp&shy;tures, d'au&shy;tres per&shy;mettent des jeux d'ombres et lumières, d'au&shy;tres re&shy;flètent notre imagi&shy;naire.
      </p>
      <p>Petit à petit je me suis tourné vers des matériaux de récupération et des bois bruts pour répondre à mes nouvelles idées.</p>
      <p>
        J'avance pas à pas dans cette aventure, et après plusieurs mois à dé&shy;velopper mon activité, je lance maintenant ce site internet afin de faire découvrir mon travail et vous proposer mes cré&shy;ations. N'hésitez pas à me contacter pour des infor&shy;ma&shy;tions complémen&shy;taires sur celles-ci.
      </p>

      <p className='text-right'>Bonne visite.</p>
      <p className='text-right'>François</p>
      
      
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 60%;
  margin: 50px auto;
  line-height: 2em;

  h2{
    text-align: center;
  }
  p{
    text-indent : 20px;
    font-size: 1.2em;
    text-align: justify;
  }
`

export default PresentationScreen
