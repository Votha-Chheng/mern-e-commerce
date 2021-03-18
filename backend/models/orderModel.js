import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
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
      product : {type:mongoose.Schema.Types.ObjectId, required : true, ref: 'Product'}
    }
  ],
  pointRelais : {
    type: {String},
    required: true,
    message : { type : String, required: false}
  },
  méthodePaiement : {
    type : String,
    default : 'Paypal'
  },
  paymentResult : {
    id : {type : String},
    status : {type : String},
    update_time : {type : String},
    email_address : {type : String}
  },
  prixProduits : {
    type : Number,
    required : true,
    default : 0.0
  },
  fraisDePort : {
    type : Number,
    required : true,
    default : 10
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
  },
  messageOrder : {
    type : String,
    required : false
  }
}, 
{
  timestamps : true
})

const Order = mongoose.model('Order', orderSchema)

export default Order