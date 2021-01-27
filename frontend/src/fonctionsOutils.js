

const convertPrice = (price)=>{
  let priceString = (Math.floor(price*100)/100).toFixed(2)
    let priceArray = priceString.split('.')
    return priceArray.join(',')
}

const pageTransition = {
  initial : {
    opacity:0,
  },
  animate : {
    opacity : 1,
    
    transition : {
      duration : 0.5
    }
  },
  exit : {
    opacity:0,
    transition : {
      duration : 0.5
    }
  }
}

const capitalize = (mot)=>{
  if (typeof mot !== 'string') return ''
  return mot.charAt(0).toUpperCase() + mot.slice(1)
}

const diminuerLongueurString = (mot, longueur)=>{
  if(mot.length>longueur){
    return mot.slice(0,longueur)
  } else {
    return mot
  }
}


export { diminuerLongueurString, capitalize, pageTransition, convertPrice}