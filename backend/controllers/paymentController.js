import razorpay from "../config/razorpay.js";
import crypto from "crypto";

import { generateInvoicePDF } from "../services/pdfService.js";
import { sendPaymentEmail } from "../services/emailService.js";

// ===============================
// CREATE ORDER
// ===============================
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json({ success: true, order });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// VERIFY PAYMENT
// ===============================
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      email,
      planId,
      amount,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    const paymentData = {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      planId,
      amount,
      email,
      status: "paid",
      createdAt: new Date(),
    };

    console.log("PAYMENT SUCCESS:", paymentData);

    const pdfPath = await generateInvoicePDF(paymentData);

    await sendPaymentEmail({
      to: email,
      subject: "Payment Successful - Invoice Attached",
      pdfPath,
      paymentId: razorpay_payment_id,
    });

    return res.json({
      success: true,
      message: "Payment verified successfully",
      paymentId: razorpay_payment_id,
      invoice: pdfPath,
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);
    res.status(500).json({ error: error.message });
  }
};
