import ProductRow from "./ProductRow";

const ProductsTable = ({ products, onEdit, onRefresh }) => {
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-5 py-3">Product</th>
            <th className="px-5 py-3">Price</th>
            <th className="px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="3" className="px-5 py-6 text-center text-gray-500">
                No products found
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <ProductRow
                key={product._id}
                product={product}
                onEdit={onEdit}
                onRefresh={onRefresh}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
