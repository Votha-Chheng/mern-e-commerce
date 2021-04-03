import React, { useEffect, useState } from 'react'
import Commandes from '../components/Commandes'
import styled from 'styled-components'
import LoaderSpin from './LoaderSpin'
import { useDispatch, useSelector } from 'react-redux'
import { getMyOrders } from '../actions/orderActions'
import { getUserDetails, sendEmailValidation, updateUserPassword, updateUserProfile } from '../actions/userActions'
import { createSecretCode } from '../actions/secretCodeActions'


const UserView = () => {

  const [oldPassword, setOldPassword] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [prénom, setPrénom] = useState('')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [modifier, setModifier] = useState(false)

  const dispatch = useDispatch()

  const {user, loadingDetails, error} = useSelector(state => state.userDetails)

  const {userInfo} = useSelector(state=>state.userLogin)

  const {success : successUpdate, error : errorUpdate} = useSelector(state=>state.userUpdateProfile)

  const {successPassword, errorPassword, loadingUpdatePassword} = useSelector(state=>state.userUpdatePassword)

  const {successValidationEmail, loadingValidation} = useSelector(state=>state.validationEmail)

  const {myOrders, loadingMyOrders, errorMyOrders} = useSelector(state => state.myOrders)

  const {loading: loadingSecret, success : successSecret, error : errorSecret} = useSelector(state=>state.secretCodeCreated)


  useEffect(() =>{
    if(userInfo){
      dispatch(getUserDetails(userInfo._id)) 
    }
    
  }, [dispatch, userInfo, successUpdate])

  useEffect(() => {
    if(user){
      setPrénom(user.prénom)
      setNom(user.nom)
      setEmail(user.email)
    }  
  }, [user])
  
  useEffect(() => {
    dispatch(getMyOrders())
  }, [dispatch])

  useEffect(() => {
    if(successSecret){
      dispatch(sendEmailValidation())
    }
  }, [successSecret, errorSecret, dispatch])


  const submitHandler = (event)=>{
    event.preventDefault()
    dispatch(updateUserProfile( {id : user._id, nom, prénom, email}))
    setModifier(false)
  }

  const submitNewPassword = (event)=>{
    event.preventDefault()
    dispatch(updateUserPassword({id:user._id, oldPassword, motDePasse}))
    setMotDePasse("")
    setOldPassword("")
  }

  const modifierHandler = ()=>{
    setModifier(!modifier)
  }

  const changeHandler = (name, value)=>{
    if(name==='prénom') setPrénom(value)
    if(name==='nom') setNom(value)
    if(name==='email') setEmail(value)
    if(name==='oldPassword') setOldPassword(value)
    if(name==='motDePasse') setMotDePasse(value)
  }

  const sendEmailButton = ()=>{
    dispatch(createSecretCode({email : user.email}))

  }
  
  return (
    <WrapperDiv >
      <h2>Mon compte</h2>
      <div className='separateur'></div>
      <div className='conteneur'>
        <form onSubmit={submitHandler}> 
          <div className='infos'>
            <h3>Mes informations</h3>
            {
              loadingDetails ? <LoaderSpin/> :
              error ? <div className='text-center h4 alert-danger'>{error}</div> :
              <div>
                <div className='name'>
                <div className='infos-item label'>Prénom : </div>
                {
                  modifier? 
                  <input value={prénom} name='prénom' onChange={(event)=>changeHandler(event.target.name, event.target.value)}/> 
                  : <div className='infos-item'>&nbsp;{prénom}</div>
                } 
              </div>
              <div className='name'>
                <div className='infos-item label'>Nom : </div> 
                {
                  modifier? <input value={nom} name='nom' onChange={(event)=>changeHandler(event.target.name, event.target.value)}/> : <div className='infos-item'>&nbsp;{nom}</div>
                } 
              </div>
              <div className='name'>
                <div className='infos-item label'>Adresse e-mail :</div>
                {
                  modifier? <input value={email} name='email' onChange={(event)=>changeHandler(event.target.name, event.target.value)}/> : <div className='infos-item'>&nbsp;{email}</div>
                }
              </div>
              <div className='name'>
                
                {
                  !user.validationEmail? 
                  <>
                    <div className='infos-item label'>E-mail confirmé :</div>
                    <div className='infos-item' style={{color:'red', fontWeight:'bold'}}> Non </div>
                  </> 
                  : ""
                }
              </div>
            </div>
            }
            
            { 
              errorUpdate ? <p className='alert-danger'>{errorUpdate}</p> :
              successUpdate && <p className='alert-success'>Informations modifiées.</p>
            }

            {
              modifier?
              <div className='btn-container'>
                <button type='submit' className='btn btn-primary w-50 btn1'>Valider mes informations</button>
                <button type='button' onClick={modifierHandler} className='btn btn-primary ml-2 w-50 btn2'>Annuler</button>
              </div> :
              <div className='btn-container'>
                <div type='button' onClick={modifierHandler} className='btn btn-primary w-50 btn1'>Modifier mes informations</div>
                <div type='button' onClick={user.validationEmail? null : sendEmailButton} className={`btn btn-primary ml-2 w-50 btn2 ${user.validationEmail ? 'unactive' : ''} ${loadingValidation ? 'unactive' : ""}`} disabled={user.validationEmail? false : true}>Recevoir un e-mail de validation.</div>
              </div>
            }
            {
              (loadingValidation || loadingSecret) && <p className='alert-warning text-center' style={{marginTop:'30px'}}>Envoi de l'e-mail en cours...</p>
            }
            {
              errorSecret ? <p className='alert-danger text-center' style={{marginTop:'30px'}}>{errorSecret}</p> :
              successValidationEmail && <p className='alert-success text-center' style={{marginTop:'30px'}}>E-mail de validation envoyé à cette adresse : {email}.</p>
            }
          </div>
        </form>
        <div className='separateur'></div>
        
        <form onSubmit={submitNewPassword}>
          <div className='change-password'>
            <h3>Modifier mon mot de passe</h3>
            <div className='current-password'>
              <label>Tapez votre mot de passe actuel</label>
              <input type='password' name='oldPassword' value={oldPassword} onChange={(event)=>changeHandler(event.target.name, event.target.value)} placeholder={'Mot de passe actuel'}/>
            </div>
            <div className='current-password'>
              <label>Tapez votre nouveau mot de passe </label>
              <input type='password' name='motDePasse' value={motDePasse} onChange={(event)=>changeHandler(event.target.name, event.target.value)} placeholder={'Nouveau mot de passe'}/>
              {
                errorPassword && <p className='alert-danger'>{errorPassword}</p>
              }
              {
                successPassword && <p className='alert-success'>Mot de passe modifié.</p>
              }
              {
                loadingUpdatePassword? <LoaderSpin/> : <button type='submit' className='btn btn-block btn-primary'>Changer mot de passe</button>
              }
              
            </div>   
          </div>
        </form>

        <div className='separateur'></div>

        <div className='commandes'>
          <h3>Mes commandes passées</h3>
          {
            loadingMyOrders ? <LoaderSpin/> : 
            errorMyOrders ? <div className='alert-danger'>{errorMyOrders}</div> :
            !myOrders ? <div>Vous n'avez commandé aucune lampe dans notre boutique.</div>:
            user.isAdmin ? myOrders.reverse().map((commande, index)=> <Commandes user={user} key={index} commande={commande}/>) :
            myOrders.filter(order=> order.isPaid).reverse().map((commande, index)=> <Commandes user={user} key={index} commande={commande}/>) 
          }
          <div></div>
        </div> 
      </div>
      

    </WrapperDiv>
  )
}

const WrapperDiv = styled.div`
  h2{
    text-align: center;
    margin : 50px auto;
  }
  h3{
    margin-bottom : 20px;
  }
  button{
    margin-top:15px;
  }
  .separateur{
    margin : 30px auto;
    width :50px;
    height :3px;
    background-color:#0C1B33
  }
  .conteneur{
    margin : 20px auto;
    width : 520px;
    display : flex;
    flex-direction : column;
    align-items : start;

    .infos{
      width : 520px;
      margin-bottom : 50px;

      .name{
        display : flex;
        justify-content : flex-start;
        width : 100%;
        margin-bottom : 10px;
      }

      .infos-item{
        font-size : 1.3em;
      }
      .label{
        width : 175px;
        font-weight:bold;
        font-family : 'Lato', sans-serif;
      }
      .btn-container{
        display : flex;

        div{
          font-size : 0.75em;
          padding : 10px 5px;
        }
        .unactive{
          background-color: grey;
          cursor : not-allowed ;
        }
      }
    }
    .change-password{
      width : 520px;
      .current-password{
        display : flex;
        flex-direction:column;
      }
      input{
        padding: 5px 8px;
        width: 100%;
        font-size : 1.2em;
        margin-bottom : 20px;
      }
    }
    .commandes{
      margin-top : 50px;
    }
  }
 
@media (max-width: 580px){
  width : 100%;
  .conteneur{
    width : 350px;
    margin : 5px auto;
    .infos{
      width : 360px;
      font-size : 0.8em;
      .btn-container{
        flex-direction : column;
        width : 100%;
        .btn1{
          margin-bottom : 3px;
          width : 100% !important;
        }
        .btn2{
          margin-left : 0px !important;
          width : 100% !important;

        }
      }
    }

    .change-password{
      width : 350px;
    }

    .commandes{
      width : 350px;
    }

  }

}

  

`
export default UserView


