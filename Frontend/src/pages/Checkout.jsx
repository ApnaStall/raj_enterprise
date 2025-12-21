import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CheckoutLayout from "../components/checkout/CheckoutLayout";

function Checkout() {
  return (
    <>
      <Navbar />
      <CheckoutLayout />
      <Footer />
    </>
  );
}

export default Checkout;
