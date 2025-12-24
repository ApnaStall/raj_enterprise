import { useState } from "react";
import adminApi from "../../services/adminApi";
import api from "../../services/api"; // ✅ ADD THIS

const ProductForm = ({ product, onSaved }) => {
  const [name, setName] = useState(product?.product_name || "");
  const [price, setPrice] = useState(product?.product_price || "");
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = product?.product_image || "";

      // ✅ Upload image via /api/upload
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadRes = await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        imageUrl = uploadRes.data.url;
      }

      const payload = {
        product_name: name,
        product_price: price,
        product_image: imageUrl,
      };

      if (product) {
        await adminApi.put(`/products/${product._id}`, payload);
      } else {
        await adminApi.post("/products", payload);
      }

      onSaved();
    } catch (err) {
      console.error(err);
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
        <label className="text-sm text-gray-600">Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full border rounded-lg px-3 py-2 mt-1"
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
