import { OrderModel } from "../models/product.js";
import dotenv from "dotenv";
import crypto from "crypto";
import querystring from "qs";
import moment from "moment";
function sortObject(obj) {
  const sorted = {};
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      sorted[key] = obj[key];
    });
  return sorted;
}
class Payment {
  constructor() {
    this.userID = "6926be463abf88afa932ee4c";
  }
  MakeAPayment = async (req, res) => {
    // console.log(req.body);
    const { data, amount } = req.body;
    //Tạo order
    const Items = data.map((item) => {
      return {
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
      };
    });
    const newOrder = {
      userId: this.userID,
      Items: Items,
      paymentStatus: "pending",
    };
    console.log(newOrder);

    const order = new OrderModel(newOrder);
    const result = await order.save();
    // res.send(result)
    // Tạo thanh toán
    var ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    var tmnCode = dotenv.config().parsed.VNPAY_ID;
    var secretKey = dotenv.config().parsed.VNPAY_SECRET;
    var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    var returnUrl = dotenv.config().parsed.vnp_ReturnUrl;

    var createDate = moment().format("YYYYMMDDHHmmss");
    var orderId = result._id.toString();
    var bankCode = req.body.bankCode;

    var orderInfo = "Thanh_toan_don_hang";
    var orderType = "billpayment";
    var locale = "vn";
    var currCode = "VND";
    var vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    if (bankCode !== null && bankCode !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);
    var signData = querystring.stringify(vnp_Params, { encode: true });
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(Buffer(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
    res.send(vnpUrl);
  };
  checkPayment = async (req, res) => {
    var vnp_Params = req.query;
    var secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    const secretKey = process.env.VNPAY_SECRET;
    const signData = querystring.stringify(vnp_Params, { encode: true });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    // Validate checksum
    if (secureHash !== signed) {
      return res.status(200).json({
        RspCode: "97",
        Message: "Fail checksum",
      });
    }

    const orderId = vnp_Params["vnp_TxnRef"];
    const responseCode = vnp_Params["vnp_ResponseCode"]; // Quan trọng!!

    // ❗ Nếu khách hủy, hoặc trả về lỗi -> KHÔNG cập nhật đơn hàng
    if (responseCode !== "00") {
      return res.status(200).json({
        RspCode: "01",
        Message: "Payment failed or canceled",
        Order: orderId,
      });
    }

    // ✅ Chỉ update đơn hàng khi thanh toán thành công
    await OrderModel.findOneAndUpdate(
      { _id: orderId },
      { paymentStatus: "complete" }
    );

    return res.status(200).json({
      RspCode: "00",
      Message: "Success",
      Order: orderId,
    });
  };
}
export default new Payment();
