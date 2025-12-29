import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CheckoutLayout from "../components/checkout/CheckoutLayout";

function Checkout() {
  return (
    <>
      <Helmet>
        <title>Checkout | Raj Enterprise</title>
      </Helmet>
      <div>
        <Navbar />
      </div>
      <div>
        <CheckoutLayout />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Checkout;
