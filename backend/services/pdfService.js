import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateInvoice = (paymentData) => {
  return new Promise((resolve, reject) => {
    const fileName = `invoice_${paymentData.paymentId}.pdf`;
    const filePath = path.join("storage/invoices", fileName);

    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text("INVOICE", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Name: ${paymentData.name}`);
    doc.text(`Email: ${paymentData.email}`);
    doc.text(`Plan: ${paymentData.plan}`);
    doc.text(`Payment ID: ${paymentData.paymentId}`);
    doc.text(`Amount: ${paymentData.amount}`);

    doc.end();

    doc.on("finish", () => resolve(filePath));
    doc.on("error", reject);
  });
};
