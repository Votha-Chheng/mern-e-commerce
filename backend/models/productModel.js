import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
  nom : { 
    type: String,
    required: true,
  },
  catégorie : {
    type: String,
    required: true,
  },
  prix : {
    type: Number,
    required: true,
  },
  stock : {
    type: Number,
    required: true,
    default : 0
  },
  description : {
    type: String,
    required: true,
  },
  couleurs : {
    type : [String]
  },
  images : {
    type: [String],
    required: true,
    default : ['../images/sample.jpg']
  },
  livraison : {
    type : Boolean,
    required : true,
  } 
}, {
  timestamps : true
})

const Product = mongoose.model('Product', productSchema)

export default Product
