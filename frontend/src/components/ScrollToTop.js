import {useEffect} from 'react'
import {useLocation, useHistory} from 'react-router-dom'

const ScrollToTop = () => {

  const {pathname} = useLocation()
  const {action} = useHistory()

  useEffect(() => {
    if(action!=='POP'){
      window.scrollTo(0,0)
    } else if (action==='POP'){
      let positionY = sessionStorage.getItem('positionY')
      window.scrollTo(0,+positionY)
    }    
  }, [pathname, action])
 
  
  return (
    null
  )
}

export default ScrollToTop
