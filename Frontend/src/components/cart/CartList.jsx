import CartItem from "./CartItem";

function CartList({ cart }) {
  return (
    <>
    <div className="space-y-6">
      {cart.map(item => (
        <CartItem key={item._id} item={item} />
      ))}
    </div>
    </>
  );
}

export default CartList;
