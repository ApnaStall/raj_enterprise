import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import OrdersList from "../components/profile/orders/OrdersList";

function Orders() {
  return (
    <>
      <Navbar />

      <div className="mt-20 min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
        <div className="w-full max-w-3xl space-y-6">
          <h1 className="text-2xl font-semibold">
            My Orders
          </h1>

          <OrdersList />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Orders;
