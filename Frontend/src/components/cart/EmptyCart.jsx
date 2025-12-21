import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-[#03519F] mb-4">
        Your Cart is Empty
      </h2>
      <p className="text-gray-600 mb-6">
        Looks like you haven’t added anything yet.
      </p>
      <Link
        to="/shop"
        className="bg-[#03519F] text-white px-6 py-3 rounded-lg hover:bg-[#023d78] transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default EmptyCart;
