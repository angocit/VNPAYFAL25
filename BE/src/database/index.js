import dotenv from 'dotenv'
import mongoose from 'mongoose'
const DBConnect = async ()=>{
    try {
      await mongoose.connect(dotenv.config().parsed.DB_URL)
      console.log('Connect db thành công');      
    } catch (error) {
        console.log('Kết nối db thất bại');        
    }
}
export default DBConnect