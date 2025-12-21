require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/DB");
const serveIndex = require("serve-index");
const adminRoute = require("./routes/AdminRoute.js");
const checkoutRoute = require("./routes/CheckoutRoute");
const contactRoute = require("./routes/ContactRoute");
const invoiceRoute = require("./routes/InvoiceRoute");
const orderRoute = require("./routes/OrderRoute");
const paymentRoute = require("./routes/PaymentRoute");
const productRoute = require("./routes/ProductRoute");
const serviceRoute = require("./routes/ServiceRoute");
const userRoute = require("./routes/UserRoute");
const { log, error } = require("./utils/logger");

connectDB();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/uploads",
  express.static("uploads"),
  serveIndex("uploads", { icons: true })
);

app.use("/api/admin", adminRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/contact", contactRoute);
app.use("/api/invoice", invoiceRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payment", paymentRoute);
app.use("/product", productRoute);
app.use("/api/service", serviceRoute);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send(`Backend Running!`);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

