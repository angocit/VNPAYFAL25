import express from 'express'
import dotenv from 'dotenv'
import DBConnect from './database/index.js'
import ProductRoute from './routers/product.js'
import AuthRoute from './routers/auth.js'
import PaymentRoute from './routers/payment.js'
import cors from 'cors'
const app = express() 
const port=3000
app.use(express.json())
app.use(cors())
app.use('/api',ProductRoute)
app.use('/api/auth',AuthRoute)
app.use('/api/payment',PaymentRoute)
const vnpay = dotenv.config().parsed.VNPAY_ID
app.listen(port,async ()=>{
    await DBConnect()
    console.log(`Endpoint http://localhost:${port} ${vnpay}`);    
})