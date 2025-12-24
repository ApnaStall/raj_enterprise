import { useEffect, useState } from "react";
import adminApi from "../services/adminApi";
import ProductsTable from "../components/products/ProductsTable";
import ProductModal from "../components/products/ProductModal";
import PageTitle from "../components/ui/PageTitle";
import Loader from "../components/ui/Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("/products");
      setProducts(res.data.products);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <PageTitle>Products</PageTitle>
          <p className="text-sm text-gray-500">
            Manage your product catalog
          </p>
        </div>

        <button
          onClick={() => {
            setEditProduct(null);
            setOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <Loader text="Loading products..." />
      ) : (
        <ProductsTable
          products={products}
          onEdit={(p) => {
            setEditProduct(p);
            setOpen(true);
          }}
          onRefresh={fetchProducts}
        />
      )}

      {/* Modal */}
      {open && (
        <ProductModal
          product={editProduct}
          onClose={() => setOpen(false)}
          onSaved={fetchProducts}
        />
      )}
    </div>
  );
};

export default Products;
