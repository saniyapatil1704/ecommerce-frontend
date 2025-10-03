
const API_BASE_URL = import.meta.env.VITE_API_ACTUAL_ORDERS_URL;


const API_ACTUAL_ORDERS_URL = `${API_BASE_URL}/orders`;

/**
 * @description This service handles all API calls related to user orders.
 * It encapsulates the logic for fetching and deleting orders from the backend.
 */
const orderService = {
  /**
   * @description Fetches all orders for the authenticated user from the backend.
   * @returns {Promise<Array>} A promise that resolves to an array of order objects.
   */
  getOrders: async (token) => {
    try {
      // Get the user's authentication token from local storage.
      if (!token) {
        throw new Error("No authentication token found.");
      }

      // Send a GET request to the backend with the token in the Authorization header.
      const response = await fetch(`${API_ACTUAL_ORDERS_URL}/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // If the response is not OK (e.g., 401 Unauthorized), throw an error.
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch orders.");
      }

      // Parse the JSON response and return the data.
      const data = await response.json();
      return data.orders;
    } catch (error) {
      console.error("Error in orderService.getOrders:", error);
      throw error;
    }
  },

  /**
   * @description Deletes a specific order for the authenticated user.
   * @param {number} orderId - The unique ID of the order to delete.
   * @returns {Promise<boolean>} A promise that resolves to true on successful deletion.
   */
  deleteOrder: async (orderId,token) => {
    try {
      if (!token) {
        throw new Error("No authentication token found.");
      }

      // Send a DELETE request to the backend. The orderId is a URL parameter.
      const response = await fetch(`${API_ACTUAL_ORDERS_URL}/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // If the response is not OK, throw an error. A 200/204 status is expected.
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete order.");
      }

      // Return true to indicate successful deletion.
      return true;
    } catch (error) {
      console.error("Error in orderService.deleteOrder:", error);
      throw error;
    }
  },
};

export default orderService;
