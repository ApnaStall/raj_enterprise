const express = require("express");
const PDFDocument = require("pdfkit");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");
const { log, error } = require("../utils/logger");

const router = express.Router();

router.get("/:orderId", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      user_id: req.user.id
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.payment_status !== "paid") {
      return res.status(400).json({ message: "Invoice only for paid orders" });
    }

    const doc = new PDFDocument({ size: "A4", margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order._id}.pdf`
    );

    doc.pipe(res);

    /* ================= HEADER ================= */

    doc.font("Helvetica-Bold").fontSize(20);
    doc.text("Raj Enterprise", 50, 50);

    doc.font("Helvetica").fontSize(10);
    doc.text(
      "Vikroli Park Site, Ghatkopar\nMumbai Maharashtra - 400079 (MH.)",
      50,
      80
    );

    doc.fontSize(10);
    doc.text(`Invoice No: INV-${order._id.toString().slice(-6)}`, 350, 50);
    doc.text(`Order ID: ${order._id}`, 350, 65);
    doc.text(
      `Invoice Date: ${order.createdAt?.toDateString() || "N/A"}`,
      350,
      80
    );

    doc.moveTo(50, 115).lineTo(550, 115).stroke();

    /* ================= BILL TO ================= */

    doc.font("Helvetica-Bold").fontSize(12);
    doc.text("Bill To:", 50, 135);

    doc.font("Helvetica").fontSize(10);
    doc.text(order.customer_name || "N/A", 50, 155);
    doc.text(order.customer_email || "N/A", 50, 170);
    doc.text(order.customer_phone || "N/A", 50, 185);
    doc.text(order.customer_address || "N/A", 50, 200, { width: 250 });

    /* ================= PAID STAMP ================= */

    doc
      .font("Helvetica-Bold")
      .fontSize(32)
      .fillColor("green")
      .text("PAID", 420, 150, { rotate: -15 });

    doc.fillColor("black");

    /* ================= TABLE ================= */

    const tableTop = 260;
    const rowHeight = 22;

    doc.font("Helvetica-Bold").fontSize(11);
    doc.text("Item", 50, tableTop);
    doc.text("Qty", 300, tableTop);
    doc.text("Price", 360, tableTop, { width: 80, align: "right" });
    doc.text("Total", 460, tableTop, { width: 80, align: "right" });

    doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

    let y = tableTop + rowHeight;
    doc.font("Helvetica").fontSize(10);

    order.items.forEach((item) => {
      const price = Number(item.price || 0);
      const qty = Number(item.quantity || 0);
      const total = price * qty;

      doc.text(item.name || "Item", 50, y, { width: 220 });
      doc.text(qty.toString(), 300, y);
      doc.text(`Rs. ${price}`, 360, y, { width: 80, align: "right" });
      doc.text(`Rs. ${total}`, 460, y, { width: 80, align: "right" });

      y += rowHeight;
    });

    /* ================= TOTAL ================= */

    doc.moveTo(350, y + 5).lineTo(550, y + 5).stroke();

    doc.font("Helvetica-Bold").fontSize(12);
    doc.text("Total Amount:", 350, y + 20);
    doc.text(`Rs. ${order.total_amount}`, 460, y + 20, {
      width: 80,
      align: "right"
    });

    /* ================= FOOTER ================= */

    doc.font("Helvetica").fontSize(9).fillColor("gray");
    doc.text(
      "Thank you for shopping with Raj Enterprise.\nThis is a system generated invoice.",
      50,
      760,
      { width: 500, align: "center" }
    );

    doc.end();
  } catch (err) {
    error("❌ INVOICE ERROR:", err);
    res.status(500).json({ message: "Invoice generation failed" });
  }
});

module.exports = router;
