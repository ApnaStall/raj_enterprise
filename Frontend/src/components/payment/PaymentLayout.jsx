import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import OrderPaymentCard from "./OrderPaymentCard";

function PaymentLayout({ orderId, amount }) {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
        <div className="w-full max-w-xl mt-40">
          <OrderPaymentCard
            orderId={orderId}
            amount={amount}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PaymentLayout;
