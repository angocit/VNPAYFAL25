import { UserModel } from "../models/users.js"
import bcrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken'
export const Register = async(req,res)=>{
    try {
        const body = req.body
        //Destructuring
        const {email,password} = body 
        // Ktra tồn tại email
        const check = await UserModel.findOne({email:email})
        if (check) throw {mes:"Tài khoản đã tồn tại",code:400}
        // Mã hóa mật khẩu
        body.password = await bcrypt.hash(password,11)
        const user = await new UserModel(body).save()
        user.password = undefined
        res.status(201).send({message:"Đăng ký thành công",status:true,data:user})
    } catch (error) {
        res.status(error.code??500).send({message:error.mes??"Đăng ký thất bại",status:false})
    }
}
export const Login = async (req,res)=>{
 try {
    // lấy thông tin login
    const {email,password} = req.body 
    // Ktra tài khoản tồn tại
    const user = await UserModel.findOne({email:email})
    if (!user) throw {mes:"Tài khoản không tồn tại",code:404}
    // Ktra mật khẩu có khớp không
    const compare = await bcrypt.compare(password,user.password)
    if (!compare) throw {mes:"Sai mật khẩu",code:400}
    // Tạo token
    const token = Jwt.sign({id:user._id,name:user.name},'123456',{expiresIn:'1h'})
    user.password = undefined
    res.status(200).send({message:"Đăng nhập thành công",status:true,data:user,token:token})
 } catch (error) {
    res.status(error.code??500).send({message:error.mes??"Đăng nhập thất bại",status:false})
 }
}