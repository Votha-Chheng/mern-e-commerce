import React, { useEffect, useRef, useState } from 'react'
import { useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { getPointRelaisAddress } from '../actions/cartActions'

const MRComponent = ({refreshHandler}) => {

  const [display, setDisplay] = useState(false)
  const [pointRelais, setPointRelais ]= useState({})
  const [messageCommande, setMessageCommande] = useState('')

  const history = useHistory()
  const {action} = history

  const dispatch = useDispatch()

  const Zone_Widget = useRef(null)


  useEffect(() => {
    if(action === 'POP'){
      setDisplay(true)
    } else {
      setDisplay(false)
    }
  }, [action])

  useEffect(() => {
    if(document){
      document.addEventListener('click', ()=>{
        setPointRelais(JSON.parse(sessionStorage.getItem('pointRelais')))
      })
    }  
  }, [pointRelais])

  console.log(pointRelais)

  const clickHandler = ()=>{
    JSON.stringify(sessionStorage.setItem('orderMessage', messageCommande))
    dispatch(getPointRelaisAddress())
    history.push('/paiement')
  }

  return (
    <div>
      {display ? <button className='btn btn-success btn-block w-100' onClick={refreshHandler} >Si le choix du point relais ne s'affiche pas, cliquez ici</button> : <div></div>}
      <div ref={Zone_Widget} id="Zone_Widget" className='widget-MR' />
      <div style={{padding: '10px', overflow: "auto"}}>
        <div style={{background: '#edffb2', border: 'solid 1px #a5f913', padding: '5px', fontFamily:'verdana', fontSize:'10px'}}>
          <h5>Point Relais Selectionné :</h5>
          
          {pointRelais && 
          <RelaisStyle>
            <div className="point-relais">
              {pointRelais.nom}<br/>
              {pointRelais.adresse}<br/>
              {pointRelais.codePostal} {pointRelais.ville}<br/>
            </div>
            <div>Indicatif du point relais : {pointRelais.id}</div>
          </RelaisStyle>
          }
          
        </div>
      </div>

      <Wrapper className='form-item'>
        <div><label>Message (optionnel)</label></div>
        <textarea className='message' type='textarea' name='message' value={messageCommande} onChange={(event)=>setMessageCommande(event.target.value)} placeholder="Un message, une information à mettre à notre connaissance..." />
      </Wrapper>
      
      <button className='btn btn-block btn-primary' style={{marginTop:'20px'}} onClick={()=>clickHandler()} >Valider le point relais</button>
    </div>
  )
}

const RelaisStyle = styled.div`
  div {
    font-family : 'Lato', sans-serif;
  }
  .point-relais{
    font-size : 1.5em;
    font-weight : bold;
    margin : 10px auto
  }
`
const Wrapper = styled.div`
  margin-top : 30px;
  .form-item {
    display: flex;
    flex-direction: column;
    margin-bottom : 25px;
    position: relative;
  }
  label {
    font-size : 1.5em;
    font-weight :bold;
  }
  textarea {
    border: none;
    font-size : 1.2em;
    padding : 5px 5px;
    background-color : #f2f8f3;
    font-family:"Poppins", sans-serif;
    font-weight:bold;
    outline : 2px solid #cae2ce;
    width : 600px;
    height : 200px;
  }
  
`

export default MRComponent
