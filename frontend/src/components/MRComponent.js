import React, { useEffect, useRef, useState } from 'react'
import { useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { getPointRelaisAddress } from '../actions/cartActions'

const MRComponent = ({refreshHandler, pointRelais}) => {

  const [display, setDisplay] = useState(false)
  const [message, setMessage ]= useState('')
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
    if(pointRelais){
      setMessage('')
    }
  }, [pointRelais])


  const clickHandler = ()=>{
    if(pointRelais){
      setMessage('')
      JSON.stringify(sessionStorage.setItem('orderMessage', messageCommande))
      dispatch(getPointRelaisAddress())
      history.push('/paiement')
    } else {
      setMessage('Veuillez sélectionner un point relais.')
    }
  }

  console.log(pointRelais)

  return (
    <div className='conteneur'>
      {display ? <Refresh><button className='btn btn-success btn-block' onClick={refreshHandler} >Si le choix du point relais ne s'affiche pas, cliquez ici</button></Refresh> : <div></div>}
      <div ref={Zone_Widget} id="Zone_Widget" className='widget-MR' />
      <div style={{padding: '10px', overflow: "auto", width:"100%"}}>
        <SelectPR>
          <div className='selectPR'>
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

        </SelectPR>
      </div>

      <Wrapper>
        <div><label>Message (optionnel)</label></div>
        <textarea className='message' type='textarea' name='message' value={messageCommande} onChange={(event)=>setMessageCommande(event.target.value)} placeholder="Un message, une information à mettre à notre connaissance..." />
        <button className={`btn btn-block btn-primary`} style={{marginTop:'20px'}} onClick={()=>clickHandler()} >Valider le point relais</button>
      </Wrapper>
      
      
      <div className='text-center h4 my-2 alert-danger'>{message && message}</div>
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
  @media (max-width:650px){

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
  .unactive{
    cursor : not-allowed;
    background-color : #dde3e3;
    color : grey;
  }
  @media (max-width:650px){
    width : 360px;
    margin : 0 auto;
    textarea{
      width : 350px;
    }
  }
  
`
const SelectPR = styled.div`
  background-color: '#edffb2';
  border: 'solid 1px #a5f913';
  padding: '5px';
  font-family:'verdana';
  font-size:'10px';
  margin : 10px auto;
  

  @media (max-width:650px){
    width : 360px;
  }
    

`

const Refresh = styled.div`
  width : 100%;
  @media (max-width:650px){
    width : 360px;
    margin : 10px auto;
  }
`

export default MRComponent
