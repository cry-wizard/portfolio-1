const razorpay = require("../config/razorpay");
const crypto = require("crypto");

// services (you will create these)
const { generateInvoicePDF } = require("../services/pdfService");
const { sendPaymentEmail } = require("../services/emailService");
// const { updateUserPlan } = require("../services/userService");

// ===============================
// CREATE ORDER
// ===============================
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // INR paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// VERIFY PAYMENT + FULL FLOW
// ===============================
exports.verifyPayment = async (req, res) => {
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

    // 1. VERIFY SIGNATURE (MOST IMPORTANT SECURITY STEP)
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

    // ===============================
    // 2. PAYMENT VERIFIED SUCCESS
    // ===============================

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

    // ===============================
    // 3. SAVE TO DATABASE (FIREBASE / MONGO)
    // ===============================
    // Example:
    // await savePayment(paymentData);

    // ===============================
    // 4. GENERATE PDF INVOICE
    // ===============================
    const pdfPath = await generateInvoicePDF(paymentData);

    // ===============================
    // 5. SEND EMAIL WITH PDF
    // ===============================
    await sendPaymentEmail({
      to: email,
      subject: "Payment Successful - Invoice Attached",
      pdfPath,
      paymentId: razorpay_payment_id,
    });

    // ===============================
    // 6. UPGRADE USER PLAN (REMOVE WATERMARK / TRIAL)
    // ===============================
    // await updateUserPlan(userId, "premium");

    // ===============================
    // 7. RESPONSE TO FRONTEND
    // ===============================
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
