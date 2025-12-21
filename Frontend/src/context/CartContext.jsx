import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  // 🔄 Sync user when auth changes
  useEffect(() => {
    const syncUser = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setUserId(user?.id || null);
    };

    syncUser(); // initial load

    // 👇 custom auth change listener
    window.addEventListener("auth-change", syncUser);

    return () => {
      window.removeEventListener("auth-change", syncUser);
    };
  }, []);

  // 🔑 User-specific cart key
  const CART_KEY = userId ? `cart_${userId}` : "cart_guest";

  // 🛒 Load correct cart when user changes
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_KEY);
    setCart(savedCart ? JSON.parse(savedCart) : []);
  }, [CART_KEY]);

  // 💾 Persist cart
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, CART_KEY]);

  // ➕ Add to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === product._id);

      if (exists) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ➖ Remove
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  // 🔁 Update quantity
  const updateQuantity = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
