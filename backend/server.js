import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import fileUpload from 'express-fileupload'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadFilesRoutes from './routes/uploadFilesRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import secretCodeRoutes from './routes/secretCodeRoutes.js'
import cors from 'cors'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'


dotenv.config()

connectDB()

const app = express()

app.use(
  cors(
    {
      origin: ["https://luminaires-cavallo-frontend.vercel.app"],
      methods: ["POST", "GET", "DELETE", "PUT"],
      credentials: true
    }
  )
);

app.use(express.json())
app.use(fileUpload())


app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/uploads', uploadFilesRoutes)
app.use('/api/billets', blogRoutes)
app.use('/api/secretCode', secretCodeRoutes)

app.get(`/api/config/paypal`, (req, res)=> res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get("*", (req, res)=> res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))

} else {
  app.get('/', (req, res)=>{
    res.send('API is running...')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`) )