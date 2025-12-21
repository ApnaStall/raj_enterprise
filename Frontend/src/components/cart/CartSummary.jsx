import { Link } from "react-router-dom";

function CartSummary({ total }) {
  return (
    <>
    <div className="bg-white rounded-2xl shadow-lg p-6 border h-fit sticky top-24">
      <h3 className="text-2xl font-bold text-[#03519F] mb-6">
        Order Summary
      </h3>

      <div className="flex justify-between text-gray-700 mb-3">
        <span>Subtotal</span>
        <span>₹{total}</span>
      </div>

      <div className="flex justify-between text-gray-700 mb-3">
        <span>Delivery</span>
        <span className="text-green-600">Free</span>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between text-xl font-bold mb-6">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <Link
        to="/checkout"
        className="block text-center bg-[#03519F] text-white py-3 rounded-xl font-semibold
                   hover:bg-[#023d78] transition shadow-md"
      >
        Proceed to Checkout
      </Link>
    </div>
    </>
  );
}

export default CartSummary;
