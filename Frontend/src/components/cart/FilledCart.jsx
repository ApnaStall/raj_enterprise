import CartList from "./CartList";
import CartSummary from "./CartSummary";

function FilledCart({ cart }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="mt-20 max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-[#03519F] mb-10">
        Shopping Cart
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartList cart={cart} />
        </div>

        <CartSummary total={total} />
      </div>
    </div>
  );
}

export default FilledCart;
