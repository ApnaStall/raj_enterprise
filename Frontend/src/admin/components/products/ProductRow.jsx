import adminApi from "../../services/adminApi";

const ProductRow = ({ product, onEdit, onRefresh }) => {
  const deleteProduct = async () => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await adminApi.delete(`/products/${product._id}`);
      onRefresh();
    } catch {
      alert("Failed to delete product");
    }
  };

  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="px-5 py-4 flex items-center gap-4">
        <img
          src={product.product_image || "/placeholder.png"}
          alt={product.product_name}
          className="w-12 h-12 rounded-lg object-cover border"
        />

        <div>
          <p className="font-medium">{product.product_name}</p>
          <p className="text-xs text-gray-500">ID: {product._id.slice(-6)}</p>
        </div>
      </td>

      <td className="px-5 py-4 font-medium">
        ₹{product.product_price}
      </td>

      <td className="px-5 py-4 text-right space-x-3">
        <button
          onClick={() => onEdit(product)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>

        <button
          onClick={deleteProduct}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
