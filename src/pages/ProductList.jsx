import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import productService from "../services/productService";

/**
 * @description The ProductList component allows a user to manage their own products.
 * It fetches the list of products associated with the logged-in user and displays them
 * with options to edit or delete each one.
 * @file This component lives at src/pages/ProductList.jsx
 */
const ProductList = () => {
  // We use useState to manage the component's state, including the products array,
  // and flags for loading and error states.
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // We use the useAuth hook to get the current user's ID, which is necessary
  // for filtering products and for authorization checks.
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // The useEffect hook is used to fetch the data when the component mounts.
  // It depends on the 'user' object, so it will refetch if the user logs in or out.
  useEffect(() => {
    // We define an async function inside useEffect to handle fetching data.
    const fetchProducts = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        // Call the service layer to fetch all products from the backend.
        const response = await productService.getAllProducts();

        // We filter the products on the client-side to only show products
        // that belong to the current user. A more scalable solution would be
        // to have a specific backend endpoint like /api/products/my-products.
        // const userProducts = response.products.filter(
        //     (product) => product.userId === currentUser.userId
        // );

        // Update the state with the fetched and filtered products.
        setProducts(response);
      } catch (err) {
        // If there's an error, we set the error state.
        setError(err.message || "Failed to fetch products.");
        console.error("Error fetching products:", err);
      } finally {
        // We always set loading to false after the request, regardless of success or failure.
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentUser]);

  /**
   * @description Handles the deletion of a product. It calls the deleteProduct service
   * and updates the local state to remove the deleted product from the list.
   * @param {number} productId The ID of the product to delete.
   */
  const handleDelete = async (productId, token) => {
    // A simple confirmation dialog for user experience.
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!isConfirmed) return;

    try {
      // Call the service to delete the product on the backend.
      token = currentUser.token;

      await productService.deleteProduct(productId, token);

      // We update the local state to instantly remove the item from the UI.
      // This is more efficient than re-fetching the entire list.
      setProducts(products.filter((product) => product.id !== productId));

      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product. Please try again.");
    }
  };

  // Conditional rendering based on the component's state.
  if (!currentUser) {
    return (
      <div className="container mt-5 text-center">
        <h2>Access Denied</h2>
        <p>Please log in to manage your products.</p>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading your products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Your Products</h2>
      <div className="text-end mb-3">
        <Link to="/add-product" className="btn btn-success">
          Add New Product
        </Link>
      </div>
      {products.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          You have not added any products yet.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{product.name}</td>
                  <td>${parseFloat(product.price).toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <div className="d-flex flex-wrap gap-2">
                      <Link
                        to={`/products/${product.id}/edit`}
                        className="btn btn-info btn-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
