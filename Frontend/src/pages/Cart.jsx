import React from "react";
import Navbar from "../components/layout/Navbar";
import CartContent from "../components/cart/CartContent";
import Footer from "../components/layout/Footer";

function Cart() {
  return (
    <>
      <Helmet>
        <title>Cart | Raj Enterprise</title>
      </Helmet>
      <div>
        <Navbar />
      </div>

      <div>
        <CartContent />
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default Cart;
