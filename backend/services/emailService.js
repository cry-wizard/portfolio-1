import nodemailer from "nodemailer";

export const sendInvoiceEmail = async (to, filePath) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Your Payment Invoice",
    text: "Thanks for your purchase. Invoice attached.",
    attachments: [
      {
        filename: "invoice.pdf",
        path: filePath,
      },
    ],
  });
};
