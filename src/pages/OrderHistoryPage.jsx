// import React, { useState, useEffect } from "react";
// import AuthContext from "../context/AuthContext";
// import orderService from "../services/orderService";
// import { useContext } from "react";

// /**
//  * @description Renders the order history page for the authenticated user.
//  * It fetches and displays a list of past orders.
//  */
// const OrderHistoryPage = () => {
//   // State to hold the orders, loading status, and any errors.
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // We get the isAuthenticated status from our AuthContext.
//   const { currentUser } = useContext(AuthContext);
//   const token = currentUser.token;

//   /**
//    * @description Fetches all orders from the backend for the current user.
//    */
//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Call the order service to get the orders.
//       const data = await orderService.getOrders(token);
//       console.log("Fetched orders:", data);
//       setOrders(data);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       setError(err.message || "An error occurred while fetching your orders.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /**
//    * @description Handles the deletion of an order.
//    * @param {number} orderId - The ID of the order to be deleted.
//    */
//   const handleDeleteOrder = async (orderId) => {
//     if (
//       window.confirm(
//         "Are you sure you want to delete this order? This action cannot be undone."
//       )
//     ) {
//       try {
//         await orderService.deleteOrder(orderId,token);
//         // After successful deletion, re-fetch the orders to update the list.
//         fetchOrders();
//         alert("Order deleted successfully!");
//       } catch (err) {
//         console.error("Error deleting order:", err);
//         alert(err.message || "Failed to delete the order.");
//       }
//     }
//   };

//   // The useEffect hook runs when the component mounts.
//   useEffect(() => {
//     if (currentUser) {
//       fetchOrders();
//     } else {
//       // If the user is not authenticated, we don't fetch data.
//       setLoading(false);
//       setError("Please log in to view your order history.");
//     }
//   }, [currentUser]); // Rerun if the user's auth status changes.

//   // Conditional rendering based on the component's state.
//   if (loading) {
//     return <div className="text-center my-5">Loading orders...</div>;
//   }

//   if (error) {
//     return <div className="alert alert-danger text-center my-5">{error}</div>;
//   }

//   if (orders.length === 0) {
//     return <div className="text-center my-5">You have no orders yet.</div>;
//   }

//   return (
//     <div className="container my-5">
//       <h1 className="mb-4">Order History</h1>
//       <div className="list-group">
//         {orders.map((order) => (
//           <div
//             key={order.id}
//             className="list-group-item list-group-item-action d-flex justify-content-between align-items-center mb-3 rounded shadow-sm"
//           >
//             <div>
//               <h5 className="mb-1">Order #{order.id}</h5>
//               <p className="mb-1">
//                 Total Amount: ${parseFloat(order.totalAmount).toFixed(2)}
//               </p>
//               <small className="text-muted">
//                 Placed on: {new Date(order.createdAt).toLocaleDateString()}
//               </small>
//             </div>
//             <button
//               className="btn btn-outline-danger btn-sm"
//               onClick={() => handleDeleteOrder(order.id)}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrderHistoryPage;

// import React, { useState, useEffect, useContext } from "react";
// import AuthContext from "../context/AuthContext";

// import { FaHistory, FaTrashAlt } from "react-icons/fa";
// import orderService from "../services/orderService";

// /**
//  * @description Renders the order history page for the authenticated user.
//  * It fetches and displays a list of past orders.
//  */
// const OrderHistoryPage = () => {
//   // State to hold the orders, loading status, and any errors.
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // We get the isAuthenticated status from our AuthContext.
//   const { currentUser } = useContext(AuthContext);
//   const token = currentUser?.token;

//   /**
//    * @description Fetches all orders from the backend for the current user.
//    */
//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Call the order service to get the orders.
//       const data = await orderService.getOrders(token);
//       console.log("Fetched orders:", data);
//       setOrders(data);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       setError(err.message || "An error occurred while fetching your orders.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /**
//    * @description Handles the deletion of an order.
//    * @param {number} orderId - The ID of the order to be deleted.
//    */
//   const handleDeleteOrder = async (orderId) => {
//     if (
//       window.confirm(
//         "Are you sure you want to delete this order? This action cannot be undone."
//       )
//     ) {
//       try {
//         await orderService.deleteOrder(orderId, token);
//         // After successful deletion, re-fetch the orders to update the list.
//         fetchOrders();
//         window.alert("Order deleted successfully!");
//       } catch (err) {
//         console.error("Error deleting order:", err);
//         window.alert(err.message || "Failed to delete the order.");
//       }
//     }
//   };

//   // The useEffect hook runs when the component mounts.
//   useEffect(() => {
//     if (currentUser) {
//       fetchOrders();
//     } else {
//       // If the user is not authenticated, we don't fetch data.
//       setLoading(false);
//       setError("Please log in to view your order history.");
//     }
//   }, [currentUser]); // Rerun if the user's auth status changes.

//   // Conditional rendering based on the component's state.
//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center my-5">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="alert alert-danger text-center my-5" role="alert">
//         {error}
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="text-center my-5">
//         <FaHistory size={80} className="text-secondary mb-3" />
//         <h2 className="mb-3">You have no orders yet.</h2>
//         <p>Looks like you haven't placed any orders.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container my-5">
//       <h1 className="mb-4 d-flex align-items-center">
//         <FaHistory className="me-3 text-primary" /> Order History
//       </h1>
//       <div className="row">
//         {orders.map((order) => (
//           <div className="col-md-6 mb-4" key={order.id}>
//             <div className="card shadow-sm h-100">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <div>
//                     <h5 className="card-title mb-1">Order #{order.id}</h5>
//                     <p className="card-text text-muted mb-0">
//                       Placed on: {new Date(order.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <h4 className="card-text fw-bold text-primary">
//                     ${parseFloat(order.totalAmount).toFixed(2)}
//                   </h4>
//                 </div>
//                 <hr />
//                 <p className="card-text">
//                   <strong>Status:</strong>{" "}
//                   <span className={`badge ${order.status === "pending" ? "bg-warning text-dark" : "bg-success"}`}>{order.status}</span>
//                 </p>
//                 <div className="d-flex flex-wrap mb-3">
//                   <h6 className="w-100">Items:</h6>
//                   <ul className="list-group w-100">
//                     {order.items && order.items.map((item) => (
//                       <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
//     {item.product?.name || "Unknown Product"}
//                         <span className="badge bg-secondary rounded-pill">{item.quantity}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="d-grid gap-2">
//                   <button
//                     className="btn btn-outline-danger btn-sm"
//                     onClick={() => handleDeleteOrder(order.id)}
//                   >
//                     <FaTrashAlt className="me-1" /> Delete Order
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrderHistoryPage;

// import React, { useState, useEffect, useContext } from "react";
// import { Link } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaHistory, FaTrashAlt, FaSpinner, FaShoppingBag, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
// import AuthContext from "../context/AuthContext";
// import orderService from "../services/orderService";
// import { format } from 'date-fns';

// /**
//  * @description Renders the order history page for the authenticated user.
//  * It fetches and displays a list of past orders.
//  */
// const OrderHistoryPage = () => {
//   // State to hold the orders, loading status, and any errors.
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Get current user and token from AuthContext.
//   const { currentUser } = useContext(AuthContext);
//   const token = currentUser?.token;

//   /**
//    * @description Fetches all orders from the backend for the current user.
//    */
//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await orderService.getOrders(token);
//       setOrders(response);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       setError(err.message || "An error occurred while fetching your orders.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /**
//    * @description Handles the deletion of an order.
//    * @param {number} orderId - The ID of the order to be deleted.
//    */
//   const handleDeleteOrder = async (orderId) => {
//     if (window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
//       try {
//         await orderService.deleteOrder(orderId, token);
//         fetchOrders();
//         window.alert("Order deleted successfully!");
//       } catch (err) {
//         console.error("Error deleting order:", err);
//         window.alert(err.message || "Failed to delete the order.");
//       }
//     }
//   };

//   // Fetch orders on component mount or when user status changes.
//   useEffect(() => {
//     if (currentUser) {
//       fetchOrders();
//     } else {
//       setLoading(false);
//       setError("Please log in to view your order history.");
//     }
//   }, [currentUser, token]);

//   // Conditional rendering for different states (loading, error, no orders).

//   if (loading) {
//     return (
//       <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
//         <FaSpinner className="text-primary mb-3" size={60} style={{ animation: 'spin 2s linear infinite' }} />
//         <p className="lead text-muted">Loading your order history...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container py-5">
//         <div className="alert alert-danger text-center shadow-sm" role="alert">
//           <h4 className="alert-heading">Oops, something went wrong!</h4>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!orders || orders.length === 0) {
//     return (
//       <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
//         <FaHistory size={80} className="text-secondary mb-4" />
//         <h2 className="fw-bold mb-2">No Orders Found</h2>
//         <p className="text-muted col-md-6 mb-4">
//           It looks like you haven't placed any orders with us yet. Let's change that!
//         </p>
//         <Link to="/products" className="btn btn-primary btn-lg rounded-pill shadow-sm">
//           <FaShoppingBag className="me-2" /> Start Shopping Now
//         </Link>
//       </div>
//     );
//   }

//   // Main render for the order history list.
//   return (
//     <div className="container py-5">
//       {/* Page Header */}
//       <div className="mb-4 text-center">
//         <h1 className="fw-bold mb-2 text-primary">Your Order History</h1>
//         <p className="lead text-muted">Review your past purchases and track your deliveries.</p>
//       </div>

//       {/* Orders Grid */}
//       <div className="row g-4 justify-content-center">
//         {orders.map((order) => (
//           <div className="col-12 col-md-10 col-lg-8" key={order.id}>
//             <div className="card shadow-lg border-0 h-100 rounded-4 overflow-hidden" style={{ transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}>
//               <div className="card-body p-4">
//                 {/* Order Header & Summary */}
//                 <div className="d-flex justify-content-between align-items-start mb-3">
//                   <div>
//                     <h5 className="fw-bold text-uppercase text-secondary mb-1">Order #{order.id}</h5>
//                     <div className="d-flex align-items-center">
//                       <FaCalendarAlt className="me-2 text-muted" />
//                       <small className="text-muted">
//                         {format(new Date(order.createdAt), 'MMMM d, yyyy')}
//                       </small>
//                     </div>
//                   </div>
//                   <div className="text-end">
//                     <h4 className="fw-bold text-success mb-0 d-flex align-items-center">
//                       <FaDollarSign size={20} className="me-1" />
//                       {parseFloat(order.totalAmount).toFixed(2)}
//                     </h4>
//                     <span className={`badge rounded-pill text-uppercase mt-1 ${order.status === "pending" ? "bg-warning text-dark" : "bg-success"}`}>
//                       {order.status}
//                     </span>
//                   </div>
//                 </div>

//                 <hr className="my-4" />

//                 {/* Order Items List */}
//                 <h6 className="fw-bold text-secondary mb-3">Order Details:</h6>
//                 <ul className="list-group list-group-flush border rounded-3 p-2">
//                   {order.items && order.items.map((item) => (
//                     <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0 px-2">
//                       <div className="d-flex align-items-center">
//                         <img
//                           src={item.product?.image_url || `https://placehold.co/400x400?text=${item.product.name}`}
//                           alt={item.product?.name || "Product image"}
//                           className="img-fluid rounded-3 me-3"
//                           style={{ width: '60px', height: '60px', objectFit: 'cover' }}
//                         />
//                         <span className="fw-medium">{item.product?.name || "Unknown Product"}</span>
//                       </div>
//                       <span className="badge bg-light text-dark rounded-pill border py-2 px-3">
//                         Qty: {item.quantity}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>

//                 <div className="d-grid mt-4">
//                   <button
//                     className="btn btn-outline-danger btn-lg rounded-pill"
//                     onClick={() => handleDeleteOrder(order.id)}
//                   >
//                     <FaTrashAlt className="me-2" /> Cancel Order
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrderHistoryPage;

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaHistory,
  FaTrashAlt,
  FaSpinner,
  FaShoppingBag,
  FaCalendarAlt,
  FaDollarSign,
  FaExclamationCircle,
} from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import orderService from "../services/orderService";
import { format } from "date-fns";
import "../styles/OrderHistoryPage.css";

/**
 * @description Renders the order history page for the authenticated user.
 * It features a professional UI with an animated confirmation modal.
 */
const OrderHistoryPage = () => {
  // State to hold the orders, loading status, and any errors.
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the custom confirmation modal
  const [showModal, setShowModal] = useState(false);
  const [orderIdToDelete, setOrderIdToDelete] = useState(null);
  const [message, setMessage] = useState("");

  // Get current user and token from AuthContext.
  const { currentUser } = useContext(AuthContext);
  const token = currentUser?.token;

  /**
   * @description Fetches all orders from the backend for the current user.
   */
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getOrders(token);
      setOrders(response);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.message || "An error occurred while fetching your orders.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * @description Handles the initial click to open the confirmation modal.
   * @param {number} orderId - The ID of the order to be deleted.
   */
  const handleOpenModal = (orderId) => {
    setOrderIdToDelete(orderId);
    setShowModal(true);
  };

  /**
   * @description Handles the confirmation of the order deletion.
   */
  const confirmDelete = async () => {
    setShowModal(false);
    if (!orderIdToDelete) return;

    try {
      await orderService.deleteOrder(orderIdToDelete, token);
      fetchOrders();
      setMessage("Order deleted successfully!");
    } catch (err) {
      console.error("Error deleting order:", err);
      setMessage(err.message || "Failed to delete the order.");
    } finally {
      setOrderIdToDelete(null);
    }
  };

  /**
   * @description Closes the confirmation modal without deleting the order.
   */
  const cancelDelete = () => {
    setShowModal(false);
    setOrderIdToDelete(null);
  };

  // Fetch orders on component mount or when user status changes.
  useEffect(() => {
    if (currentUser) {
      fetchOrders();
    } else {
      setLoading(false);
      setError("Please log in to view your order history.");
    }
  }, [currentUser, token]);

  // Helper function to map status to Bootstrap badge classes
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-warning text-dark";
      case "canceled":
        return "bg-danger";
      case "success":
        return "bg-success";
      default:
        return "bg-secondary"; // fallback
    }
  };

  // Conditional rendering for different states (loading, error, no orders).

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
        <FaSpinner
          className="text-primary mb-3"
          size={60}
          style={{ animation: "spin 2s linear infinite" }}
        />
        <p className="lead text-muted">Loading your order history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center shadow-sm" role="alert">
          <h4 className="alert-heading">Oops, something went wrong!</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
        <FaHistory size={80} className="text-secondary mb-4" />
        <h2 className="fw-bold mb-2">No Orders Found</h2>
        <p className="text-muted col-md-6 mb-4">
          It looks like you haven't placed any orders with us yet. Let's change
          that!
        </p>
        <Link
          to="/products"
          className="btn btn-primary btn-lg rounded-pill shadow-sm"
        >
          <FaShoppingBag className="me-2" /> Start Shopping Now
        </Link>
      </div>
    );
  }

  return (
    <>
      

      {/* Main content of the page */}
      <div className="container py-5">
        {message && (
          <div
            className={`toast-message ${
              message.includes("successfully") ? "success" : "danger"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mb-4 text-center">
          <h1 className="fw-bold mb-2 text-primary">Your Order History</h1>
          <p className="lead text-muted">
            Review your past purchases and track your deliveries.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {orders.map((order) => (
            <div className="col-12 col-md-10 col-lg-8" key={order.id}>
              <div
                className="card shadow-lg border-0 h-100 rounded-4 overflow-hidden"
                style={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="fw-bold text-uppercase text-secondary mb-1">
                        Order #{order.id}
                      </h5>
                      <div className="d-flex align-items-center">
                        <FaCalendarAlt className="me-2 text-muted" />
                        <small className="text-muted">
                          {format(new Date(order.createdAt), "MMMM d, yyyy")}
                        </small>
                      </div>
                    </div>
                    <div className="text-end">
                      <h4 className="fw-bold text-success mb-0 d-flex align-items-center">
                        <FaDollarSign size={20} className="me-1" />
                        {parseFloat(order.totalAmount).toFixed(2)}
                      </h4>
                      <span
                        className={`badge rounded-pill text-uppercase mt-1 ${getStatusBadgeClass(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <h6 className="fw-bold text-secondary mb-3">
                    Order Details:
                  </h6>
                  <ul className="list-group list-group-flush border rounded-3 p-2">
                    {order.items &&
                      order.items.map((item) => (
                        <li
                          key={item.id}
                          className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0 px-2"
                        >
                          <div className="d-flex align-items-center">
                            <img
                              src={
                                item.product?.image_url ||
                                `https://placehold.co/400x400?text=${item.product.name}`
                              }
                              alt={item.product?.name || "Product image"}
                              className="img-fluid rounded-3 me-3"
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                              }}
                            />
                            <span className="fw-medium">
                              {item.product?.name || "Unknown Product"}
                            </span>
                          </div>
                          <span className="badge bg-light text-dark rounded-pill border py-2 px-3">
                            Qty: {item.quantity}
                          </span>
                        </li>
                      ))}
                  </ul>
                  <div className="d-grid mt-4">
                    <button
                      className="btn btn-outline-danger btn-lg rounded-pill"
                      onClick={() => handleOpenModal(order.id)}
                    >
                      <FaTrashAlt className="me-2" /> Cancel Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The new professional modal component */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content-pro">
            <FaExclamationCircle className="modal-icon" />
            <h4 className="fw-bold">Confirm Deletion</h4>
            <p className="text-muted">
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>
            <div className="modal-buttons">
              <button
                className="btn btn-outline-secondary rounded-pill"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger rounded-pill"
                onClick={confirmDelete}
              >
                <FaTrashAlt className="me-2" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderHistoryPage;
