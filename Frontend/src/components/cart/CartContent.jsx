import { useCart } from "../../context/CartContext";
import EmptyCart from "./EmptyCart";
import FilledCart from "./FilledCart";

function CartContent() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return <FilledCart cart={cart} />;
}

export default CartContent;
