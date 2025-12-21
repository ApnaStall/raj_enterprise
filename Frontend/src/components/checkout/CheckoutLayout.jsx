import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import { useCart } from "../../context/CartContext";
import CartItemsCard from "./CartItemsCard";
import DeliveryAddressCard from "./DeliveryAddressCard";
import UserInfoCard from "./UserInfoCard";
import OrderSummary from "./OrderSummary";
import { log, error } from "../../utils/logger";

function CheckoutLayout() {
  const { cart } = useCart();
  const [address, setAddress] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/user/profile");
        setUser(res.data.user); // ✅ THIS IS CRITICAL
      } catch (err) {
        error("Failed to fetch user profile", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold text-[#03519F] mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <DeliveryAddressCard
            address={address}
            setAddress={setAddress}
          />
          <UserInfoCard user={user} /> {/* ✅ PASS USER */}
          <CartItemsCard items={cart} readonly />
        </div>

        {/* RIGHT */}
        <OrderSummary address={address} />
      </div>
    </div>
  );
}

export default CheckoutLayout;
