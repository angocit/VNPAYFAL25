import mongoose from "mongoose";
const pschema = mongoose.Schema({
    name:String,
    image:String,
    price:Number
},
{
    timestamps:true
});
export const products = mongoose.model('products', pschema);
const CartSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"users"
    },
    Items:[{
        productId:{
            type:mongoose.Schema.ObjectId,
            required:true,
            ref:"products"
        },
        quantity:{
            type:Number,
            default:1
        }
    }]
})
export const CartModel = mongoose.model("carts",CartSchema)
const OrderSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"users"
    },
    paymentStatus:{
        type:String,
        enum: ['pending','failed','complete'],
        default: 'pending'
    },
    Items:[{
        productId:{
            type:mongoose.Schema.ObjectId,
            required:true,
            ref:"products"
        },
        name:String,
        price:Number,
        quantity:{
            type:Number,
            default:1
        }
    }]
})
export const OrderModel = mongoose.model("orders",OrderSchema)