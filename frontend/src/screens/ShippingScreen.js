import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import styled from 'styled-components'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
// import { saveShippingAddress } from '../actions/cartActions'
import { useHistory } from 'react-router-dom'
import {pageTransition} from '../fonctionsOutils'
import axios from 'axios'
import { getUserDetails, sendEmailValidation, updateUserAddress } from '../actions/userActions'

const ShippingScreen = () => {

  const [adresseValidate, setAdresseValidate] = useState( '')
  const [villeValidate, setVilleValidate] = useState('')
  const [CPValidate, setCPValidate] = useState('')
  const [paysForm] = useState('France métropolitaine')
  const [suggestions, setSuggestions] = useState([])
  const [displaySuggestions, setDisplaySuggestions] = useState(false)
  const [nom, setNom] = useState('')
  const [prénom, setPrénom] = useState('')
  const [email, setEmail] = useState('')

  const [modal, setModal] = useState(false)

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin
  
  const userUpdateAddress = useSelector(state=>state.userUpdateAddress)
  const {errorAddress} = userUpdateAddress

  const validationEmail = useSelector(state=>state.validationEmail)
  const {successValidationEmail, errorValidationEmail, loadingValidation} = validationEmail

  const userEmailValidate = useSelector(state => state.userEmailValidate)
  const {successValidateUserEmail} = userEmailValidate

  const {user} = useSelector(state=>state.userDetails)


  const dispatch = useDispatch()
  const history = useHistory()

  const getLocalisation = async(adresse)=>{
    try{
      if(adresse){
      let query = adresse.split(' ').join('+')
      const result = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${query}&limit=5`).then((response) => setSuggestions(response.data.features))
      return result
      } else {
        return ""
      }
    } catch (err){
      console.log(err)
    }
  }

  useEffect(()=>{
    dispatch(getUserDetails(userInfo._id))
    
  }, [dispatch, userInfo, successValidationEmail, successValidateUserEmail])

  useEffect(() => {
    if(!userInfo){
      history.push('/')
    }   
  }, [history, userInfo])

  useEffect(() =>{
    if(user){
      setNom(user.nom)
      setPrénom(user.prénom)
      setEmail(user.email)
    }
  }, [user])

  useEffect(() => {
    if(user.adresse){
      setAdresseValidate(user.adresse.adresse||'')
      setVilleValidate(user.adresse.ville||'')
      setCPValidate(user.adresse.codePostal||'')
    }
  }, [user.adresse])


  useEffect(() => {
    if(adresseValidate!=='' && suggestions.length !== 0){
      setDisplaySuggestions(true)
    } else {
      setDisplaySuggestions(false)
    }
  },[suggestions, adresseValidate])


  const submitAddressHandler = (event)=>{
    event.preventDefault()
    if(!userInfo.validationEmail || !user.validationEmail){
      setModal(true)
    } else {    
      dispatch(updateUserAddress({adresse : adresseValidate, ville : villeValidate, codePostal : CPValidate}))
      history.push('/choixpointrelais')
      setTimeout(()=>{
        window.location.reload()
      }, 800) 
    }
  }

  const getAddressSuggestion = (objet) => {
    setAdresseValidate(objet.properties.name)
    setCPValidate(objet.properties.postcode)
    setVilleValidate(objet.properties.city)
    setDisplaySuggestions(false)
    setSuggestions([])

  }

  const inputChangeHandler = (name, value)=>{
    if(name==='adresse'){
      setAdresseValidate(value)
      if(value===''){
        setDisplaySuggestions(false)
      }
    }
    if(name==='ville'){
      setVilleValidate(value)
    }
    if(name==='codePostal'){
      setCPValidate(value)
    }
    getLocalisation(adresseValidate)
  }

  const sendEmailButton = ()=>{
    dispatch(sendEmailValidation())
  }
 
  return (
    <Wrapper variants={pageTransition} initial='initial' animate='animate' exit='exit'>
      {
        modal && 
        <ModalContainer>
          <div className='modal-card'>
            <div className='message-alert'>
              Votre adresse e-mail n'a pas été validée !<br/>Cliquez sur le bouton "Recevoir un e-mail de validation" pour valider complètement votre inscription.
            </div>
            <div className='button-container'>
              <button className='btn btn-inline btn-warning' onClick={()=>setModal(false)}>Retour</button>
            </div>   
          </div>
        </ModalContainer>
      }

      <CheckoutSteps step1={true}/>
      <h2>Mes coordonnées</h2>
      <div className='separateur'/>
      {
        errorAddress && <p className='alert-danger text-center w-25 mx-auto my-5'>{errorAddress}</p>
      }
      
      <div className='form-container1'>
        <form onSubmit={(event)=>submitAddressHandler(event)}>
          <h4 className='text-center mb-5'>Mes informations</h4>
          <div className='infos'>
            <div className='name'>
              <div className='infos-item label'>Prénom : </div>
                {prénom ? <div className='infos-item'>&nbsp;{userInfo.prénom}</div> : <div></div>}
            </div>
            <div className='name'>
              <div className='infos-item label'>Nom : </div> 
              {nom ? <div className='infos-item'>&nbsp;{userInfo.nom}</div> : <div></div>}
            </div>
            <div className='name'>
              <div className='infos-item label'>Adresse e-mail :</div>
                {email ? <div className='infos-item'>&nbsp;{userInfo.email}</div>: <div></div>}   
            </div>
            {
              !user.validationEmail && 
              <>
                <div className='h4 text-center mt-3 alert-danger'>E-mail non validé.</div>
                {errorValidationEmail && <div className='h5 text-center mt-3 alert-danger'>Veuillez attendre 10 minutes après le dernier envoi avant de réessayer.</div>}
                <div className='btn-group'>
                  <div 
                    type='button' 
                    onClick={sendEmailButton} 
                    className={`btn btn-primary ml-2 btn-inline-block ${loadingValidation || successValidationEmail ? 'unactive' : ""}`} 
                    disabled={loadingValidation? false : true}
                  >
                    Recevoir un e-mail de validation.
                  </div>
                  <div
                    type='button' 
                    onClick={()=>window.location.reload()} 
                    className={`btn btn-primary ml-2 btn-inline-block  ${loadingValidation ? 'unactive' : ""}`} 
                    disabled={loadingValidation? false : true}
                  >
                    Rafraîchir la page
                  </div>
                </div>
                
                {
                  successValidationEmail &&  
                  <div className='h4 text-center mt-3 alert-warning'>
                    E-mail envoyé à cette adresse : {userInfo.email}<br/>
                    <span className='h5 alert-warning'>Si vous avez cliqué sur le lien contenu dans le-mail que vous avez reçu, mettez à jour votre profil en rafraîchissant la page.</span>
                  </div>
                }
               
              </>
              
            }
          </div>

          <h4 className='text-center mb-5'>Adresse personnelle</h4>
          <div className='form-item'>
            <label>Adresse complète*</label>
            <input className='voie' type = 'text' name='adresse' value = {adresseValidate} onChange={(event)=>inputChangeHandler(event.target.name, event.target.value)} required/>  
            <div className='suggestion' style={displaySuggestions ? {display : "block", height:`${suggestions.length*20}px`} : {display : "none"}}>
              {
                suggestions && suggestions.map((suggestion, index)=> <p key={index} onClick={()=>getAddressSuggestion(suggestion)} >{suggestion.properties.label}</p>)
              }
            </div>   
          </div>
         
          <div className='double-item'>
            <div className='form-item'>
              <label>Ville*</label><input className='ville' type='text' name='ville' value = {villeValidate} onChange={(event)=>inputChangeHandler(event.target.name, event.target.value)} required/>
            </div>
            <div className='form-item'>
              <label>Code postal*</label><input className='code-postal' type='text' name='codePostal' value={CPValidate} onChange={(event)=>inputChangeHandler(event.target.name, event.target.value)} required/>
            </div>
          </div>
          <div className='form-item'>
            <label>Pays</label><input type = 'text' name='pays' value={paysForm} readOnly />
          </div>
          <button className='btn btn-primary btn-block mt-5'>Etape suivante</button>
        </form>
      </div>
    </Wrapper>
  )
}

const ModalContainer = styled.div`
  position : fixed;
  width : 100%;
  height : 100%;
  background-color : rgba(0,0,0, 0.8);
  z-index: 10000000000000;
  top : 0;
  left : 0;

  .modal-card {
    width : 400px;
    height : 200px;
    background : white;
    margin : 100px auto;
    border-radius : 5px;

    .message-alert{
      text-align: center;
      font-weight : bold;
      font-size : 1.3em;
      padding : 40px;
    }
    .button-container{
      display : flex;
      justify-content: center;

      button {
        margin : 0 10px;
      }
    }
  }
  @media screen and(max-width : 400px){
    .modal-card {
      width : 360px;
      height : auto;
      background : white;
      margin : 20px auto;
      border-radius : 5px;

      .message-alert{
        font-size : 1em;
        padding : 5px;
      }
      .button-container{
        button {
          margin : 0px;
        }
      }
    }
  }
`

const Wrapper = styled(motion.div)`
display : flex;
flex-direction: column;

  .btn-group{
    display : flex;
  }
  .unactive{
    background-color: grey;
    cursor : not-allowed ;
  }

  .numero{
    width: 90px;
    margin-right:20px;
  }
  .voie,.suggestion{
    width: 100%;
  }
  .suggestion{
    border: 1px solid #dee3e3;
    position: absolute;
    top: 70px;
    z-index: 1;
    background-color: #ffffff;
    overflow: hidden;

    p{
      cursor: pointer;
      &:hover{
        background-color : #dee3e3;
      }
    }
  }

  .separateur{
    margin : 0px auto 60px auto;
    width :50px;
    height :3px;
    background-color:#0C1B33
  }

  label {
    font-family : "Lato", sans-serif;
    font-weight :bold;
    font-size : 1.3em;
  }
  input, textarea {
    border: none;
    font-size : 1.2em;
    padding : 5px 5px;
    background-color : #f2f8f3;
    font-family:"Poppins", sans-serif;
    font-weight:bold;
    outline : 2px solid #cae2ce;
  }
  .message {
    height : 150px
  }
  .ville{
    width: 400px;
    margin-right : 20px;
  }
  .code-postal{
    width : 180px;
  }
  h2 {
    text-align: center;
    margin : 50px auto;
  }
  .form-container1 {
    display: flex;
    flex-direction : column;
    justify-content: flex-start;
    max-width : 600px;
    margin : 0 auto;

    .infos{
      border : 1px solid grey;
      padding : 15px;
      margin-bottom:50px;
      
      .name{
        display : flex;
        flex-direction : row;
        justify-content: space-between;
        font-family : 'Yanone Kaffeesatz', sans-serif;
        line-height: 35px;
      }
      .infos-item{
        font-size : 1.8em;
        width : 50%;
      }
      .infos-item.label{
        font-family : 'Lato', sans-serif;;
        font-weight : bold;
        font-size : 1.2em;
        width : 50%;
      } 
    }

    .form-item {
      display: flex;
      flex-direction: column;
      margin-bottom : 25px;
      position: relative;
    }
  
    .double-item{
      display : flex;
    }
  }
  @media (max-width : 650px){


    .form-container1{
      width : 80%;
      form{
        max-width : 360px;
        .infos{
          .infos-item{
            font-size : 1.3em ;
          }
          .infos-item.label{
            font-size : 0.9em;
          }
        }
        .double-item{
          flex-direction : column;
          input{
            width : 100%;
          }
        }
      }
    }   
  }
  
`

export default ShippingScreen
