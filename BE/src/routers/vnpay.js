import express from 'express'
import payment from '../controllers/vnpay.js'
const router = express.Router()

router.post('/make-a-payment',payment.makePayment) // Tạo đường dẫn thanh toán
router.get('/check-payment',payment.checkPayment) // Checksum
export default router