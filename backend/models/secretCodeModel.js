import mongoose from 'mongoose'

const secretCodeSchema = new mongoose.Schema({
  email: {
      type: String,
      required: true,
  },
  code: {
      type: String,
      required: true,
  },
  dateCreated: {
      type: Date,
      default: Date.now(),
      expires: 600,
  },
});


const SecretCode = mongoose.model('SecretCode', secretCodeSchema)

export default SecretCode