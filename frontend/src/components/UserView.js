import React from 'react'
import Commandes from '../components/Commandes'
import styled from 'styled-components'

const UserView = ({submitHandler, changeHandler, prénom, email, nom, oldPassword, motDePasse, success, modifier, modifierHandler, validationEmail, commandes, submitNewPassword, successPassword, errorPassword, sendEmailValidation, successValidationEmail, message, errorValidationEmail, loadingValidation}) => {
  
  return (
    <WrapperDiv >
      <h2>Mon compte</h2>
      <div className='separateur'></div>
      <div className='conteneur'>
        <form onSubmit={submitHandler}> 
          <div className='infos'>
            <h3>Mes informations</h3>
            <div className='name'>
              <div className='infos-item label'>Prénom : </div>
              {
                modifier? <input value={prénom} name='prénom' onChange={changeHandler}/> : <div className='infos-item'>&nbsp;{prénom}</div>
              } 
            </div>
            <div className='name'>
              <div className='infos-item label'>Nom : </div> 
              {
                modifier? <input value={nom} name='nom' onChange={changeHandler}/> : <div className='infos-item'>&nbsp;{nom}</div>
              } 
            </div>
            <div className='name'>
              <div className='infos-item label'>Adresse e-mail :</div>
              {
                modifier? <input value={email} name='email' onChange={changeHandler}/> : <div className='infos-item'>&nbsp;{email}</div>
              }
            </div>
            <div className='name'>
              
              {
                !validationEmail? 
                <>
                  <div className='infos-item label'>E-mail confirmé :</div>
                  <div className='infos-item' style={{color:'red', fontWeight:'bold'}}> Non </div>
                </> 
                : ""
              }
            </div>
            { success && <p className='alert-success'>Informations modifiées.</p>}
            {
              modifier?
              <div className='btn-container'>
                <button type='submit' className='btn btn-block btn-primary'>Valider mes informations</button>
                <button type='button' onClick={modifierHandler} className='btn btn-primary w-100 ml-2'>Annuler</button>
              </div> :
              <div className='btn-container'>
                <div type='button' onClick={modifierHandler} className='btn btn-primary w-50'>Modifier mes informations</div>
                <div type='button' onClick={validationEmail? null : sendEmailValidation} className={`btn btn-primary ml-2 w-50 ${validationEmail ? 'unactive' : ''} ${loadingValidation ? 'unactive' : ""}`} disabled={validationEmail? false : true}>Recevoir un e-mail de validation.</div>
              </div>
            }
            {
              loadingValidation && <p className='alert-warning text-center' style={{marginTop:'30px'}}>Envoi de l'e-mail en cours...</p>
            }
            {
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
              <input type='password' name='oldPassword' value={oldPassword} onChange={changeHandler} placeholder={'Mot de passe actuel'}/>
            </div>
            <div className='current-password'>
              <label>Tapez votre nouveau mot de passe </label>
              <input type='password' name='motDePasse' value={motDePasse} onChange={changeHandler} placeholder={'Nouveau mot de passe'}/>
              {
                errorPassword && <p className='alert-danger'>{errorPassword}</p>
              }
              {
                successPassword && <p className='alert-success'>Mot de passe modifié.</p>
              }
              <button type='submit' className='btn btn-block btn-primary'>Changer mot de passe</button>
            </div>   
          </div>
        </form>

        <div className='separateur'></div>

        <div className='commandes'>
          <h3>Mes commandes passés</h3>
          {
            commandes? <Commandes /> : <div>Vous n'avez commandé aucune lampe dans notre boutique.</div>
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
 

  

`
export default UserView


