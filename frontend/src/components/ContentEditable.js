import React, { useRef } from 'react'

const ContentEditable = ({value, onChange}) => {


  const defaultValue = useRef(value)

  const inputHandler = (event)=>{
    if(onChange) {
      onChange(event.target.innerHTML)
    }
  }

  return (
    <div 
      contentEditable='true' 
      onInput={(event)=>inputHandler(event)} 
      dangerouslySetInnerHTML={{__html : defaultValue.current}}
      style={{border : '1px solid grey', width : '100%', height : 'auto', padding : '10px'}}
    />
  )
}

export default ContentEditable
