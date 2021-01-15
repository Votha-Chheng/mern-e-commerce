import mongoose from 'mongoose'
import dotenv from 'dotenv'
import produits from './data/products.js'
import Product from './models/productModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async()=>{
  try {
    await Product.deleteMany()

    await Product.insertMany(produits)

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