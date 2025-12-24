import { useState } from "react";
import adminApi from "../../services/adminApi";
import api from "../../services/api";

const CATEGORY_OPTIONS = [
  "O.T. Linen",
  "Doctor Scrub",
  "Staff Uniform",
  "Patient Dress",
];

const ProductForm = ({ product, onSaved }) => {
  const [name, setName] = useState(product?.product_name || "");
  const [price, setPrice] = useState(product?.product_price || "");
  const [category, setCategory] = useState(
    product?.product_category || CATEGORY_OPTIONS[0]
  );
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = product?.product_image || "";

      // ✅ Upload image if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadRes = await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        imageUrl = uploadRes.data.url;
      }

      // ✅ FINAL PAYLOAD (matches backend schema)
      const payload = {
        product_name: name,
        product_price: Number(price), // ensure number
        product_category: category,
        product_image: imageUrl,
      };

      if (product) {
        await adminApi.put(`/products/${product._id}`, payload);
      } else {
        await adminApi.post("/products", payload);
      }

      onSaved();
    } catch (err) {
      console.error("SAVE PRODUCT ERROR:", err);
      alert("Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {/* Product Name */}
      <div>
        <label className="text-sm text-gray-600">Product Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="text-sm text-gray-600">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1"
          required
        >
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
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

      {/* Image */}
      <div>
        <label className="text-sm text-gray-600">Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full border rounded-lg px-3 py-2 mt-1"
        />
      </div>

      {/* Submit */}
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
