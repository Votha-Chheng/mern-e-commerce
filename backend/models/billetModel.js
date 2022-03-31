import mongoose from 'mongoose'

const billetSchema = mongoose.Schema({
  titre : { 
    type: String,
    required: true,
  },
  sousTitre : {
    type: String,
    required: false,
  },
  texte : {
    type: String,
    required: true,
  },
  photos : [{ type : String, required : true}],
  displayPhotos : {
    type: String,
    required: true,
    default: 'normal'
  },
  dateBillet : {
    type: Date,
    default: Date.now()
  }
}, 
{
  timestamps : true
})

const Billet = mongoose.model('Billet', billetSchema)

export default Billet
