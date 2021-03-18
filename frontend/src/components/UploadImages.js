import React, { useRef, useState } from 'react'
import styled from 'styled-components'

const UploadImages = ({imageUploadHandler, deletePhotos, alertMessage, selectedImages, withLegende, legende, validateLegend, getLegendIndex, setGetLegendToTrue, registeredPhotos
}) => {

  const [tempLegende, setTempLegende] = useState('')

  const imageUploader = useRef(null)

  return (
    <Wrapper>
      <h4>Télécharger des photos</h4>
      <div>Attention, les noms des images ne doivent pas contenir d'espace!</div>
      <div className='upload-icon' onClick={()=>imageUploader.current.click()} >
        <i className="far fa-plus-square"/>
        <i className="fas fa-camera"/>
      </div>
      <input type='file' hidden ref={imageUploader} multiple onChange={imageUploadHandler}/>
      {
        alertMessage && <div className='my-4 text-center'><span style={{lineHeight: '50px'}} className='alert-danger p-2 h3 rounded'><i className="fas fa-exclamation-triangle"/>&nbsp;&nbsp;{alertMessage}</span></div>
      }
      {
        selectedImages.length!==0 && 
        <>
          <h5 className='text-center my-4'>Prévisualiser les photos</h5>
          <div className='preview-container'>
            {
              selectedImages.map((image, index)=> 
                <div key={index} className='image-uploaded'>
                  <div className='img'><img src={image.url} alt={`lampe-${index}`} width="250"/></div>
                  <div className='image-delete' id={image.name} onClick={deletePhotos} >
                    <i className="far fa-trash-alt"/>
                  </div>
                  {
                    withLegende ? 
                    getLegendIndex === String(index) ? 
                    <>
                      <input value = {tempLegende} onChange={(event)=>setTempLegende(event.target.value)}  className='my-2 legende-tag'/>
                      <i 
                        className="fas fa-check-square" 
                        style={{transform:'scale(2.1)', color :'green', marginLeft:'10px', cursor:'pointer'}} 
                        onClick={()=>{
                          validateLegend(index, tempLegende)
                          setTempLegende('')
                        }}/>
                    </>:
                    <>
                      {legende && <div>{legende[registeredPhotos ? registeredPhotos+index : index]}</div>}
                      <button id={index} className='btn-block btn btn-info' onClick={(event)=>setGetLegendToTrue(event)}>Ajouter une légende à la photo</button>
                    </> :
                    null
                  } 
                </div>
              )
            }
          </div> 
        </>  
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin : 50px auto;

  .image-to-delete{
    position: relative;
    width: 250px;
  }
  i.fa-times-circle{
    position : absolute;
    top : 50%;
    left : 50%;
    color: white;
    transform : scale(5);
    cursor: pointer;
    z-index: 3;
    opacity: 0.3;
    transition : all 0.5s;
  }
  i.fa-times-circle:hover{
    opacity: 1;
    transform : scale(7);
  }

  .image-to-delete::after{
    content :'';
    width: 250px;
    height: 100%;
    transition : all 0.5s;
    background-color : rgba(0, 0, 0, 0);
  }
  .image-to-delete:hover::after{
    content :'';
    width: 250px;
    height: 100%;
    background-color : rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    
  }

  .upload-icon{
    width : 120px;
    height : 50px;
    display : flex;
    justify-content: center;
    border-radius : 5px;
    background-color : #3678bf ;
    padding : 20px;
    position: relative;
    margin : 0 auto;
    cursor: pointer;

    i{
      color : white;
    }

    i.far{
      transform : scale(1.7);
      position : absolute;
      top : 12px;
      left : 38px;
    }
    i.fas{
      transform : scale(2.1);
      position : absolute;
      top : 18px;
      left : 62px;
    }
  }
  
  .preview-container{
    display : flex;
    align-items : center;

    .image-uploaded{
      margin-right : 5px;
      position : relative;
      width : 250px;

      button{
        z-index : 5;
      }
      .img{
        width : 100%;
      }
      /* .img::after{
        content : '';
        position : absolute;
        width : 100%;
        background-color : rgba(0, 0, 0, 0);
        top : 0;
        left : 0;
        transition:all .3s
      } */

      .image-delete{
        cursor: pointer;
        position : absolute; 
        width : 50px;
        height : 50px;
        border-radius : 50%;
        background-color : #c10b11;
        top : -20px;
        left : 100px;
        border : 2px white;

        &::after{
        content : '';
        position : absolute;
        border-radius : 50%;
        width : 100%;
        height : 100%;
        background-color : rgba(255, 255, 255, 0.7);
        top : 0;
        left : 0;
        transition:all .3s;
        z-index : 2;
      }

        i{
          position: absolute;
          color : white;
          top : 18px;
          left : 18px;
          transform : scale(1.7);
        }
      }
    }

    .legende-tag{
      width : 220px;
    }
    .img:hover::after{
      background-color : rgba(0, 0, 0, 0.5);
    }
    .image-delete:hover::after{
      background-color : rgba(255, 255, 255, 0);
    }

  }
  
`
export default UploadImages
