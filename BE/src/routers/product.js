import express from 'express'
import product from '../controllers/product.js'
const router = express.Router()

router.get('/products',product.GetALLProduct)
router.post('/products',product.AddProduct)
router.post('/products/addtocart',product.AddToCart)
router.get('/products/getcart',product.GetCartByUser)
export default router