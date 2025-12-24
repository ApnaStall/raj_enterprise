require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const serveIndex = require("serve-index");

const connectDB = require("./config/DB");
const adminRoute = require("./routes/AdminRoute");
const checkoutRoute = require("./routes/CheckoutRoute");
const contactRoute = require("./routes/ContactRoute");
const invoiceRoute = require("./routes/InvoiceRoute");
const orderRoute = require("./routes/OrderRoute");
const paymentRoute = require("./routes/PaymentRoute");
const productRoute = require("./routes/ProductRoute");
const serviceRoute = require("./routes/ServiceRoute");
const uploadRoute = require("./routes/UploadRoute");
const userRoute = require("./routes/UserRoute");
const { log, error } = require("./utils/logger");

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(
  cors({
    origin: process.env.VITE_FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------- STATIC UPLOADS -------------------- */
/* IMPORTANT: this is required for product images */
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads")),
  serveIndex("uploads", { icons: true })
);

/* -------------------- ROUTES -------------------- */
app.use("/api/admin", adminRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/contact", contactRoute);
app.use("/api/invoice", invoiceRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payment", paymentRoute);
app.use("/product", productRoute);
app.use("/api/service", serviceRoute);
app.use("/api", uploadRoute);
app.use("/api/user", userRoute);

/* -------------------- ROOT -------------------- */
app.get("/", (req, res) => {
  res.send("Backend Running!");
});

/* -------------------- START SERVER (AFTER DB) -------------------- */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // ⬅️ wait for MongoDB

    app.listen(PORT, () => {
      log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
