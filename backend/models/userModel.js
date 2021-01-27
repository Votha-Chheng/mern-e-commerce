import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  nom : {
    type: String,
    required: true,
  },
  prénom : {
    type: String,
    required: true,
  },
  email : {
    type: String,
    required: true,
    unique: true
  },
  validationEmail : {
    type : Boolean,
    required: true,
    default: false,
  },
  motDePasse : {
    type: String,
    required: true,
  },
  isAdmin : {
    type: Boolean,
    required: true,
    default: false,
  }, 
  commandes : {
    type : mongoose.Schema.Types.ObjectId,
    required: false,
    ref : 'Order'
  }

}, {
  timestamps: true
}) 



userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.motDePasse)
}

userSchema.pre('save', function(){
  if(this.isModified('email')){
    this.validationEmail = false
  }
  return  
})

userSchema.pre('save', async function(next){
  if(!this.isModified('motDePasse')){
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.motDePasse = await bcrypt.hash(this.motDePasse, salt)
})

const User = mongoose.model('User', userSchema)

export default User