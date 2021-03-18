

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

const resume = (texte, indexFin) =>{
  let resume = ""
  let indexEnd = texte.indexOf(" ", indexFin)
  resume = texte.substring(0, indexEnd)
  if(resume===''){
    return texte
  } else {
    resume+='...'
    return resume
  }    
}

const formatDate = (date)=>{
  let arrayDate = date.split('T')[0].split('-')
  let displayDate = `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`

  return displayDate
}

const calculerQtyDuPanier = (cart)=>{
  let totalQty = 0;
  for (let i = 0 ; i< cart.length; i++){
    totalQty += +cart[i].qty
  }
  return totalQty
}

const afficherTableau = (tableau)=>{
  let txt=''
  txt = tableau.join(', ')
  return txt
}


export { diminuerLongueurString, capitalize, pageTransition, convertPrice, formatDate, calculerQtyDuPanier, resume, afficherTableau}