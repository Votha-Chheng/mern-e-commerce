import React from 'react'
import styled from 'styled-components'

const Modal = ({children}) => {
  return (
    <ModalDiv>
      <div>
        {children}
      </div>     
    </ModalDiv>
  )
}

const ModalDiv = styled.div`

  div{
    max-width :800px;
    max-height :800px;
    background-color : white;
    display :flex;
    justify-content:center;
    align-items:center;
    padding :30px;
    overflow :hidden;
    padding :20px;
    border-right:10px solid white;
    border-left:10px solid white;
  }
`

export default Modal
