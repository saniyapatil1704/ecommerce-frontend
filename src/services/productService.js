// src/services/product.service.js
// This service is responsible for all API calls related to products.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_ACTUAL_PRODUCTS_URL = `${API_BASE_URL}/products`;

// Why we use a service layer:
// We use a service layer to separate our API logic from our React components.
// This keeps our components clean and focused on rendering UI, while all
// data-fetching and business logic is centralized here.
import axios from "axios";
/**
 * Fetches all products from the backend API.
 * @returns {Promise<Array>} A promise that resolves to an array of product objects.
 */
const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_ACTUAL_PRODUCTS_URL}/all`);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 * Fetches a single product by its ID from the backend API.
 * @param {string} productId - The unique ID of the product.
 * @returns {Promise<Object>} A promise that resolves to a single product object.
 */
const getProductById = async (productId) => {
  try {
    const response = await fetch(`${API_ACTUAL_PRODUCTS_URL}/${productId}`);
    const data = await response.json();
    return data.product;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};

/**
 * @description Creates a new product on the backend.
 * @param {Object} productData - The data for the new product (e.g., name, description).
 * @param {string} token - The user's JWT for authentication.
 * @returns {Promise<Object>} A promise that resolves to the newly created product.
 */
const createProduct = async (productData, token) => {
  try {
    // Why we need a token:
    // The `create` route is protected by a middleware on the backend.
    // The `Authorization` header with the "Bearer" token is the standard way
    // to send the user's credentials to the server for authentication.
    const response = await fetch(`${API_ACTUAL_PRODUCTS_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create product.");
    }

    const data = await response.json();
    return data.product;
  } catch (error) {
    console.error("Error in createProduct:", error);
    throw error;
  }
};

/**
 * @description Updates an existing product on the backend.
 * @param {number} id - The ID of the product to update.
 * @param {object} updatedData - The data to update the product with.
 * @param {string} token - The user's JWT for authentication.
 * @returns {object} The updated product object.
 */
const updateProduct = async (id, updatedData, token) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      // We send a PUT request to the backend's update endpoint.
      const response = await axios.put(
        `${API_ACTUAL_PRODUCTS_URL}/${id}`,
        updatedData,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },
  /**
   * @description Deletes a product from the backend.
   * @param {number} id - The ID of the product to delete.
   * @param {string} token - The user's JWT for authentication.
   * @returns {object} The response from the backend.
   */
  deleteProduct = async (id, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // We send a DELETE request to the backend's remove endpoint.
      const response = await axios.delete(
        `${API_ACTUAL_PRODUCTS_URL}/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };
// We export an object containing all our product service functions.
const productService = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
