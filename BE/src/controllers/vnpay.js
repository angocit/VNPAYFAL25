import moment from 'moment'
import {OrderModel} from '../models/product.js'
import dotenv from 'dotenv'
import querystring from 'qs'
import crypto from 'crypto'
const sortObject =(obj)=>{
    const newobj = {}
    Object.keys(obj).sort().forEach(key=>{
        newobj[key] =obj[key]
    })
    return newobj
}
class VNPAY {
    makePayment = async (req,res)=>{
        //Kiểm tra dữ liệu người dùng gửi lên
        // Người dùng gửi lên những sản phẩm đc chọn và tổng số
        // tiền (Không tin tưởng tuyệt đối vào tổng số tiền
        // mà người dùng gửi lên=> Dựa vào những sản phẩm gửi lên
        // và số lượng để tính tổng số tiền và mã giảm giá nếu có )
        // Vì demo nên sẽ lấy luôn tổng số tiền và snar phảm mà người dùng gửi 
        const {data,amount} = req.body
        // Tạo đơn hàng
        const Items = data.map(item=>{
            return {
                productId:item.productId._id,
                name:item.productId.name,
                price:item.productId.price,
                quantity:item.quantity
            }
        })
        const neworder = {
            userId: '6926be463abf88afa932ee4c', // hardcode . Thực tế cần verify token người dùng để lấy id
            Items: Items
        }
        // Lưu đơn hàng
        const ordermodel = new OrderModel(neworder)
        const order = await ordermodel.save()
        // Tạo link thanh toán vnpay
        var ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;    
        
        var tmnCode = dotenv.config().parsed.VNPAY_ID
        var secretKey =  dotenv.config().parsed.VNPAY_SECRET
        console.log(tmnCode);
        
        var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'
        var returnUrl = dotenv.config().parsed.vnp_ReturnUrl    
        // var createDate = dateFormat(date, 'yyyymmddHHmmss');
         var createDate = moment().format("YYYYMMDDHHmmss");
        var orderId = order._id.toString(); // ID đơn hàng
        // console.log(orderId);
        
        var bankCode = req.body.bankCode;
        
        var orderInfo = 'Thanh_toan_online';
        var orderType = 'other';
        var locale = 'vn'
        var currCode = 'VND';
        var vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if(bankCode !== null && bankCode !== ''){
            vnp_Params['vnp_BankCode'] = bankCode;
        }    
        vnp_Params = sortObject(vnp_Params);
        // console.log(vnp_Params);
        
        var signData = querystring.stringify(vnp_Params, { encode: true });    
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(Buffer(signData, 'utf-8')).digest("hex"); 
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
        res.send(vnpUrl)
    }
    checkPayment = async (req,res)=>{
        // Lấy queryParams từ phía người dùng để check
        var vnp_Params = req.query;
        var secureHash = vnp_Params['vnp_SecureHash'];
    
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];
    
        vnp_Params = sortObject(vnp_Params);
        var secretKey = dotenv.config().parsed.VNPAY_SECRET
        var signData = querystring.stringify(vnp_Params, { encode: false });   
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
        if(secureHash === signed){
            var orderId = vnp_Params['vnp_TxnRef'];
            var rspCode = vnp_Params['vnp_ResponseCode'];
            // rspCode là 00 mới cập nhật lại đơn hàng
            if (rspCode=='00'){
                await OrderModel.findOneAndUpdate({_id:orderId},{paymentStatus:'complete'})
                res.status(200).json({RspCode: '00', Message: 'success',Order:orderId})
            }
            else {
                res.status(200).json({RspCode: rspCode, Message: 'Fail payment',Order:orderId})
            }
            //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
           
        }
        else {
            res.status(200).json({RspCode: '97', Message: 'Fail checksum'})
        }    
        // res.send("checkpayment")
    }

}
export default new VNPAY()