import { useState } from "react";
import adminApi from "../../services/adminApi";

const ProductForm = ({ product, onSaved }) => {
  const [name, setName] = useState(product?.product_name || "");
  const [price, setPrice] = useState(product?.product_price || "");
  const [image, setImage] = useState(product?.product_image || "");
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      product_name: name,
      product_price: price,
      product_image: image
    };

    try {
      if (product) {
        await adminApi.put(`/products/${product._id}`, payload);
      } else {
        await adminApi.post("/products", payload);
      }
      onSaved();
    } catch {
      alert("Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="text-sm text-gray-600">Product Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1"
          required
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1"
          required
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Image URL</label>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1"
          placeholder="https://..."
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
};

export default ProductForm;
