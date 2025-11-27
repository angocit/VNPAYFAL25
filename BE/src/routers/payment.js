import express from 'express'
import payment from '../controllers/payment.js'
const router = express.Router()

router.post('/make-payment',payment.MakeAPayment)
router.get('/check-payment',payment.checkPayment)
export default router