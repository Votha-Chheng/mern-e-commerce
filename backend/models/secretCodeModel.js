import mongoose from 'mongoose'

const secretCodeSchema = new mongoose.Schema({
  emailCode: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true,
  },
  numberEmailSent : {
    type : Number,
    required: false,
    default : 0,
  },
  dateCreated: {
    type: Date,
    required: true,
    expires: 600,
  }
},
{
  timestamps : true
}
);


const SecretCode = mongoose.model('SecretCode', secretCodeSchema)

export default SecretCode