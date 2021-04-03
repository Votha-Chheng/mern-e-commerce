import { motion } from 'framer-motion'
import React, { useState } from 'react'
import styled from 'styled-components'
import GestionBlog from './GestionBlog'
import GestionClients from './GestionClients'
import GestionCommandes from './GestionCommandes'
import GestionProduits from './GestionProduits'


const AdminView = () => {

  const [ongletActif, setOngletActif] = useState(0)

  return (
    <>
      <h2 style={{textAlign: 'center', margin : '30px auto'}}>Dashboard Administrateur</h2>
      <Wrapper>
        <nav>
          <ul>
            <li >
              <div id='0' onClick={(event)=>setOngletActif(+event.target.id)} style={ongletActif===0 ? {backgroundColor : '#766c7f', color : '#ffffff'} : null} >
                Gestion des clients inscrits
              </div>
            </li>
            <li>
              <div id='1' onClick={(event)=>setOngletActif(+event.target.id)} style={ongletActif===1 ? {backgroundColor : '#766c7f', color : '#ffffff'} : null}>Gestion des commandes
              </div>
            </li>
            <li>
              <div id='2' onClick={(event)=>setOngletActif(+event.target.id)} style={ongletActif===2 ? {backgroundColor : '#766c7f', color : '#ffffff'} : null}>Gestion des produits
              </div>
            </li>
            <li>
              <div id='3' onClick={(event)=>setOngletActif(+event.target.id)} style={ongletActif===3 ? {backgroundColor : '#766c7f', color : '#ffffff'} : null}>Gestion du blog
              </div>
            </li>
          </ul>
        </nav>

        <main>
          {
            ongletActif === 0 ? 
              <GestionClients 
              //  usersList = {usersList}
              /> :
            ongletActif === 1 ? 
              <GestionCommandes/> :
            ongletActif === 2 ?
            <GestionProduits/> :
            <GestionBlog/>
          }
        </main>
      </Wrapper>
    </>
    
  )
}

const Wrapper = styled(motion.div)`
  display: flex;

  nav{
    margin-left : 20px;

    ul{
      padding-left : unset;
      border : 3px solid #d3d9d9;
      padding : 20px;
      border-radius : 5px;

      li{
        list-style: none;
        margin : 10px 0;
        cursor: pointer;

        div{
          background-color : #e9ecec;
          padding : 10px;
          border-radius : 5px;
          transition : background-color 0.3s;

          &:hover{
            background-color : #a3a5c3;
          }
        }
      }
    }
  }

  main{
    border : 3px solid #d3d9d9;
    border-radius : 5px;
    width : 100%;
    margin :  0 20px;
    padding : 20px;

    h4{
      text-align: center;
    }
  }
  
`

export default AdminView
