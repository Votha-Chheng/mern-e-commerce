import mongoose from 'mongoose'
import dotenv from 'dotenv'
import produits from './data/products.js'
import users from './data/users.js'
import Product from './models/productModel.js'
import User from './models/userModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async()=>{
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    await Product.insertMany(produits)
    await User.insertMany(users)

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