import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
    ref : 'User'
  },
  produitsCommande : [
    {
      nom : {type:String, required: true},
      qty : {type:Number, required:true},
      image : {type:String, required: true},
      prix : {type:Number, required:true},
      couleur : {type : String, required: false},
      product : {type:mongoose.Schema.Types.ObjectID, required : true, ref: 'Product'}
    }
  ],
  adresseLivraison : {
    adresse : { type : String, required: true },
    ville : { type : String, required: true },
    codePostal : { type : String, required: true },
    pays : { type : String, required: false },
  },
  méthodePaiement : {
    type : String,
    required : true
  },
  résultatPaiement : {
    id : {type : String},
    status : {type : String},
    update_time : {type : String},
    email_address : {type : String}
  },
  fraisDePort : {
    type : Number,
    required : true,
    default : 0.0
  },
  prixTotal : {
    type : Number,
    required : true,
    default : 0.0
  },
  isPaid : {
    type : Boolean,
    required : true,
    default : false,
  },
  datePaiement : {
    type : Date
  },
  isDelivered : {
    type : Boolean,
    required : true,
    default : false,
  },
  deliveredAt : {
    type : Date
  }
}, {
  timestamps : true
})

const Order = mongoose.model('Order', orderSchema)

export default Order