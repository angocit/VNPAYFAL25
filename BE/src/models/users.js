import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,  // Giá trị là duy nhất,
    },
    password:{
        required:true,
        type:String
    }
},{
    timestamps:true
})
export const UserModel = mongoose.model('users',UserSchema)