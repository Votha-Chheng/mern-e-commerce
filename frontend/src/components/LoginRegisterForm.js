import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import LoaderSpin from './LoaderSpin'


const LoginRegisterForm = (
  {
    onChangeFormHandler, 
    submitHandler, 
    submitRegisterHandler,
    email, 
    motDePasse, 
    errorLogin,
    errorRegister,
    successRegister,
    loadingLogin,
    loadingRegister,
    message, 
    userInfoRegister,
    emailRegister,
    motDePasseRegister,
    motDePasseConfirmRegister,
    messageMatchPassword,
    nomRegister,
    prénomRegister,
  }) => {
  const [ongletActive, setOngletActive] = useState('connexion')

  useEffect(()=>{

  }, [successRegister])
  
  return (
    <WrapperDiv>
      <div className='conteneur-onglet'>
        <div className="conteneur-block">
          <div className={`onglet ${ongletActive==='connexion' && 'active'}`} id='connexion' onClick={successRegister? null : (event)=>setOngletActive(event.target.id)}>
            <h3>Connexion</h3>
          </div>
          <div className={`onglet ${ongletActive==='inscription' && 'active'}`} id='inscription' onClick={successRegister? null : (event)=>setOngletActive(event.target.id)}>
            <h3>Inscription</h3>
          </div>
        </div>
        
      </div>
      <div className='login-container'>
        {
          ongletActive==='connexion' && loadingLogin ? <LoaderSpin/> :
          <div className='connexion' style={ongletActive==='connexion' ? {transform : "translateY(0)", display:'block'} : {transform : "translateY(-100%)",display : 'none'}} >
            <form  onSubmit={submitHandler} >
              <div className='input-form'>
                <label>Adresse e-mail </label><input type='email' name='email' value={email} autoComplete="current-password" onChange={onChangeFormHandler} />
              </div>
              <div className='input-form'>
                <label>Mot de passe </label><input type='password' name='motDePasse' value={motDePasse} onChange={onChangeFormHandler} />
              </div>
              <button type='submit' className="btn btn-primary btn-block">Connexion</button>
            </form>
            {errorLogin && <p className='alert-danger text-center h5'>{errorLogin}</p>}
            {
              message ? <p>{message}</p> : 
              <>
                <p>Nouveau client ?</p>
                <div className='p-inscription' onClick={()=>setOngletActive('inscription')} >Créer votre compte ici.</div>
              </>
              
            }
            
          </div>

        }
        
        {
          ongletActive==='inscription' && loadingRegister ? <LoaderSpin/> :
          successRegister ? (<p className='alert-success text-center h4'>{`Un e-mail d'activation a été envoyé à cette adresse : ${userInfoRegister.email}. Veuillez cliquer sur le lien présent dans l'e-mail pour activer votre compte.`}</p>)  :
          (
          <div className='inscription' style={ongletActive==='inscription' ? {transform : "translateY(0%)", display:'block' } : {transform : "translateY(100%)", display : 'none'}} >
            <form onSubmit={submitRegisterHandler}>
              <div className='input-form double-input'>
                <div className='double'>
                  <label>Prénom</label><input type='text' name='prénomRegister' value={prénomRegister} onChange={onChangeFormHandler} />
                </div>
                <div className='double'>
                  <label>Nom </label><input type='text' name='nomRegister' value={nomRegister} onChange={onChangeFormHandler} />
                </div>
              </div>
              <div className='input-form'>
                <label>E-mail </label><input type='text' name='emailRegister' value={emailRegister} onChange={onChangeFormHandler}/>
              </div>
              <div className='input-form double-input'>
                <div className='double'>
                  <label>Mot de passe :</label><input type='password' autoComplete="current-password" name='motDePasseRegister' value={motDePasseRegister} onChange={onChangeFormHandler} />
                </div>
                <div className='double'>
                  <label>Confirmez le mot de passe</label><input type='password' name='motDePasseConfirmRegister' value={motDePasseConfirmRegister} onChange={onChangeFormHandler}/>
                </div>
              </div>
              <div><button type='submit' className="btn btn-primary btn-block">Valider</button></div>
            </form>
            {messageMatchPassword && <p className='alert-danger text-center h5'>{messageMatchPassword}</p>}
            {errorRegister && <p className='alert-danger h5 text-center'>{errorRegister}</p>}
          </div>
          )
        }
        
      </div>
      
    </WrapperDiv>
  )
}

const WrapperDiv = styled.div`
  border: 4px solid #bec6c6;
  border-radius : 2px;
  padding: 20px;
  margin : 0 auto;
  background-color: white;

  .conteneur-onglet{
    display: flex;
    width: 434px;
    padding: 0 auto;
    margin : 0 auto 30px auto;
    .conteneur-block{
      width: 100%;
      display: flex;
      margin : 0 auto;
    }
    .onglet.active::before{
      background-color : rgba(255,255,255, 0);
      cursor:default;
    }
    .onglet.active::after{
      transform : translateX(0)
    }

    .onglet::before{
      content:'';
      position : absolute;
      background-color : rgba(200,200,200, 0.9);
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      cursor: pointer;
      transition : all ease-out 0.3s;
    }
    .onglet::after{
      content:'';
      position : absolute;
      background-color : #0C1B33;
      width: 100%;
      height: 10px;
      top: 0;
      left: 0;
      transform : translateX(101%);
      transition : transform 0.4s ease-out;
    }
    .onglet{
      position: relative;
      padding: 20px;
      border : 1px solid #0C1B33;
      overflow: hidden;
      

      h3{
        text-align: center;
        padding-top : 10px;
      }
    }
  }
  input {
    width: 98%;
    margin-bottom : 10px;
  }

  .login-container{
    display: flex;
    width: 100%;
    overflow: hidden;

    .connexion, .inscription {
    display: flex;
    flex-direction : column;
    min-width : 500px;
    padding: 0 20px;
    transition : all ease-out 0.5s;

    p {
      margin-top : 20px;
    }
    p, .p-inscription{
      
      font-family : "Lato", sans-serif;
      font-weight: bold;
    }
    .p-inscription:hover{
      cursor: pointer;
      text-decoration: underline;
      color: blue;
    }
    label{
      font-family : "Lato", sans-serif;
      font-size : 1.1em;
      font-weight: bold;
    }

    .input-form{
      margin-bottom : 15px;
      width: 100%;
    }
    .input-form.double-input{
      display:flex;
      justify-content: space-around;
      width: 100%;
      
      .double{
        display: flex;
        flex-direction : column;
        width:100%;

        input {
          width:100%
        }    
      } 
    }  
  }
  }

  @media only screen and (max-width: 600px){
    width:340px;

    .inscription .double input{
      width:300px !important;
    }
    button, p, .p-inscription{
      width:300px;
    }
    .conteneur-onglet{
      width:100%;
      
      .onglet{
        width:50%;
        padding:10px;
        h3{
        font-size : 0.9em;
        }
      } 
    }

    .login-container{

      width:300px;
      padding : 0px;

      .connexion, .inscription{
        padding : 0px;
        label{
          width:300px;
          text-align: center;
        }
        input {
          width:300px; 
        }
        .input-form{
          display:flex;
          flex-direction:column;
          width :100%;
        }
      }
    }
  }
  
`

export default LoginRegisterForm
