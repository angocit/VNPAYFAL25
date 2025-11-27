import { CartModel, products } from "../models/product.js"

class ProductController{
    constructor (){
        this.userID ="6926be463abf88afa932ee4c"
    }
    GetALLProduct = async(req,res)=>{
        try {
            const data = await products.find()
            res.send({
                status:true,
                data:data
            })
        } catch (error) {
            res.send({
                status:false,
                data:null
            })
        }
    }
    AddProduct = async(req,res)=>{
        try {
            const product = new products(req.body)
            const data = await product.save()
            res.send({
                status:true,
                data:data
            })
        } catch (error) {
            res.send({
                status:false,
                data:null
            })
        }
    }
    AddToCart = async(req,res)=>{        
        try {
            const {productId,quantity} = req.body
            const cart  = await CartModel.findOne({userId:this.userID})
            if (cart){
            const item = cart.Items.filter(item=>item.productId==productId)
            if (item.length>0){
                cart.Items = cart.Items.map(item=>(item.productId==productId)?{...item,quantity:item.quantity+quantity}:item)
            }
            else {
                cart.Items = [...cart.Items,{productId:productId,quantity:quantity}]
            }
            await CartModel.findOneAndUpdate({_id:cart._id},cart)
        }
        else {
            const newcart = {
                userId: this.userID,
                Items:[{productId:productId,quantity:quantity}]
            }
            await new CartModel(newcart).save()
        }
        res.send({message:"Thêm giỏ hàng thành công"})
        } catch (error) {
            console.log(error);
            
             res.status(error.code??500).send({message:error.mes??"Thêm không thành công",status:false})
        }
    }
    GetCartByUser = async (req,res)=>{
        try {
            const cart  = await CartModel.findOne({userId:this.userID})
            .populate({
                    path: 'Items.productId',
                    model: 'products',
                    select: "name price image"
                })
            res.status(200).send({
                status:true,
                data:cart.Items
            })
        } catch (error) {
            console.log(error);
            
            res.send({
                status:false,
                data:[]
            })
        }
    }
}
export default new ProductController()