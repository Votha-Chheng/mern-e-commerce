import dotenv from 'dotenv'
import produits from './data/products.js'
import users from './data/users.js'
import billets from './data/billets.js'
import Product from './models/productModel.js'
import User from './models/userModel.js'
import Order from './models/orderModel.js'
import Billet from './models/billetModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async()=>{
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Billet.deleteMany()

    await Product.insertMany(produits)
    await User.insertMany(users)
    await Billet.insertMany(billets)

    console.log('Products imported')
    process.exit()

  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async()=>{
  try {
    await Product.deleteMany()
    await User.deleteMany()
    await Order.deleteMany()
    await Billet.deleteMany()

    console.log('Products destroyed')
    process.exit()

  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}