function DeliveryAddressCard({ address, setAddress }) {
  return (
    <div className="border rounded-xl p-4 bg-white">
      <h2 className="text-xl font-semibold text-[#03519F] mb-4">Delivery Address</h2>
      <textarea
        rows="3"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter delivery address"
        className="w-full p-3 border rounded-lg"
      />
    </div>
  );
}

export default DeliveryAddressCard;
