// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import cartService from '../services/cartService';
// import { useContext } from 'react';
// import AuthContext from '../context/AuthContext';

// /**
//  * @description Renders the shopping cart page, displaying all items and providing options to manage them.
//  */
// const CartPage = () => {
//     // State to hold the cart items, loading status, and any errors.
//     const [cart, setCart] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { currentUser } = useContext(AuthContext);
//     const navigate = useNavigate();
//             const token = currentUser.token;

//     /**
//      * @description Asynchronously fetches the cart items from the backend API.
//      */
//     const fetchCartItems = async () => {
//         try {
//             // We set loading to true to show a loading state while fetching data.
//             setLoading(true);
//             setError(null);

//             // Call the service layer to get the cart data.
//             const data = await cartService.getCartItems(token);

//             // Check if the cart is empty based on the backend response.
//             if (data && data.cart && data.cart.items) {
//                  setCart(data.cart);
//             } else {
//                  setCart({ items: [] });
//             }
//         } catch (err) {
//             // Catch any errors and set the error state.
//             setError(err.message || 'An error occurred while fetching cart items.');
//         } finally {
//             // Set loading to false once the fetching is complete.
//             setLoading(false);
//         }
//     };

//     // We use a useEffect hook to fetch the cart data when the component mounts.
//     // The empty dependency array `[]` ensures this runs only once.
//     useEffect(() => {
//         if (currentUser) {
//             fetchCartItems();
//         } else {
//             setLoading(false);
//             setError('Please log in to view your cart.');
//         }
//     }, [currentUser]);

//     /**
//      * @description Handles updating the quantity of a cart item.
//      * @param {string} cartItemId - The ID of the cart item to update.
//      * @param {number} newQuantity - The new quantity.
//      */
//     const handleUpdateQuantity = async (cartItemId, newQuantity) => {
//         try {
            
//             // If the new quantity is zero or less, we'll remove the item.
//             if (newQuantity <= 0) {
//                 await cartService.removeItem(cartItemId,token);
//             } else {
//                 // Call the service to update the item's quantity.
//                 await cartService.updateItem(cartItemId, newQuantity,token);
//             }
//             // After a successful update, we re-fetch the cart to reflect the changes.
//             await fetchCartItems();
//         } catch (err) {
//             setError(err.message || 'Failed to update cart item.');
//         }
//     };

//     /**
//      * @description Handles removing an item from the cart.
//      * @param {string} cartItemId - The ID of the cart item to remove.
//      */
//     const handleRemoveItem = async (cartItemId) => {
//         try {
//             // Call the service to remove the item from the cart.
//             await cartService.removeItem(cartItemId,token);
//             // Re-fetch the cart items to show the updated cart.
//             await fetchCartItems();
//         } catch (err) {
//             setError(err.message || 'Failed to remove cart item.');
//         }
//     };

//     /**
//      * @description Handles the checkout process.
//      */
//     const handleCheckout = async () => {
//         try {
//             await cartService.checkout(token);
//             // After successful checkout, navigate to the order history page or home page.
//             navigate('/orders'); // Assuming you will have an orders page.
//         } catch (err) {
//             setError(err.message || 'Failed to checkout. Please try again.');
//         }
//     };

//     // Render the loading state.
//     if (loading) {
//         return <div className="text-center my-5">Loading your cart...</div>;
//     }

//     // Render the error state.
//     if (error) {
//         return <div className="alert alert-danger text-center my-5">{error}</div>;
//     }

//     // Render a message if the cart is empty.
//     if (!cart || cart.items.length === 0) {
//         return (
//             <div className="container my-5 text-center">
//                 <h2>Your Cart is Empty</h2>
//                 <p>Looks like you haven't added anything to your cart yet.</p>
//                 <button 
//                     onClick={() => navigate('/products')} 
//                     className="btn btn-primary"
//                 >
//                     Start Shopping
//                 </button>
//             </div>
//         );
//     }

//     // Calculate the total amount of the cart.
//     const totalAmount = cart.items.reduce((acc, item) => acc + (item.quantity * item.product.price), 0);

//     return (
//         <div className="container mt-5">
//             <h1 className="mb-4">Shopping Cart</h1>
//             <div className="row">
//                 <div className="col-lg-8">
//                     <ul className="list-group">
//                         {cart.items.map(item => (
//                             <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
//                                 <div>
//                                     <h5>{item.product.name}</h5>
//                                     <p className="mb-1">Price: ${item.product.price}</p>
//                                     <p className="mb-1">Quantity: {item.quantity}</p>
//                                     <div className="d-flex align-items-center">
//                                         <button 
//                                             onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} 
//                                             className="btn btn-sm btn-outline-secondary me-2"
//                                         >
//                                             -
//                                         </button>
//                                         <input
//                                             type="number"
//                                             value={item.quantity}
//                                             onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
//                                             className="form-control text-center me-2"
//                                             style={{ width: '60px' }}
//                                         />
//                                         <button 
//                                             onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} 
//                                             className="btn btn-sm btn-outline-secondary"
//                                         >
//                                             +
//                                         </button>
//                                         <button
//                                             onClick={() => handleRemoveItem(item.id)}
//                                             className="btn btn-sm btn-danger ms-3"
//                                         >
//                                             Remove
//                                         </button>
//                                     </div>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//                 <div className="col-lg-4 mt-4 mt-lg-0">
//                     <div className="card">
//                         <div className="card-body">
//                             <h5 className="card-title">Cart Summary</h5>
//                             <ul className="list-group list-group-flush">
//                                 <li className="list-group-item d-flex justify-content-between">
//                                     <span>Total:</span>
//                                     <strong>${totalAmount.toFixed(2)}</strong>
//                                 </li>
//                             </ul>
//                             <button onClick={handleCheckout} className="btn btn-primary w-100 mt-3">
//                                 Checkout
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CartPage;


import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FaShoppingCart, FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';
import cartService from '../services/cartService';

/**
 * @description Renders the shopping cart page, displaying all items and providing options to manage them.
 */
const CartPage = () => {
    // State to hold the cart items, loading status, and any errors.
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const token = currentUser?.token;

    /**
     * @description Asynchronously fetches the cart items from the backend API.
     */
    const fetchCartItems = async () => {
        try {
            // We set loading to true to show a loading state while fetching data.
            setLoading(true);
            setError(null);

            // Call the service layer to get the cart data.
            const data = await cartService.getCartItems(token);
            setCart(data?.cart);
        } catch (err) {
            // Catch any errors and set the error state.
            setError(err.message || 'An error occurred while fetching cart items.');
        } finally {
            // Set loading to false once the fetching is complete.
            setLoading(false);
        }
    };

    // We use a useEffect hook to fetch the cart data when the component mounts.
    // The dependency array `[currentUser]` ensures this runs when the user's auth status changes.
    useEffect(() => {
        if (currentUser) {
            fetchCartItems();
        } else {
            setLoading(false);
            setError('Please log in to view your cart.');
        }
    }, [currentUser]);

    /**
     * @description Handles updating the quantity of a cart item.
     * @param {string} cartItemId - The ID of the cart item to update.
     * @param {number} newQuantity - The new quantity.
     */
    const handleUpdateQuantity = async (cartItemId, newQuantity) => {
        try {
            // If the new quantity is zero or less, we'll remove the item.
            if (newQuantity <= 0) {
                await cartService.removeItem(cartItemId, token);
            } else {
                // Call the service to update the item's quantity.
                await cartService.updateItem(cartItemId, newQuantity, token);
            }
            // After a successful update, we re-fetch the cart to reflect the changes.
            await fetchCartItems();
        } catch (err) {
            setError(err.message || 'Failed to update cart item.');
        }
    };

    /**
     * @description Handles removing an item from the cart.
     * @param {string} cartItemId - The ID of the cart item to remove.
     */
    const handleRemoveItem = async (cartItemId) => {
        try {
            // Call the service to remove the item from the cart.
            await cartService.removeItem(cartItemId, token);
            // Re-fetch the cart items to show the updated cart.
            await fetchCartItems();
        } catch (err) {
            setError(err.message || 'Failed to remove cart item.');
        }
    };

    /**
     * @description Handles the checkout process.
     */
    const handleCheckout = async () => {
        try {
            await cartService.checkout(token);
            // After successful checkout, navigate to the order history page or home page.
            navigate('/orders'); // Assuming you will have an orders page.
        } catch (err) {
            setError(err.message || 'Failed to checkout. Please try again.');
        }
    };

    // Render the loading state.
    if (loading) {
        return (
            <div className="d-flex justify-content-center my-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // Render the error state.
    if (error) {
        return (
            <div className="alert alert-danger text-center my-5" role="alert">
                {error}
            </div>
        );
    }

    // Render a message if the cart is empty.
    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="container my-5 text-center">
                <FaShoppingCart size={80} className="text-secondary mb-3" />
                <h2 className="mb-3">Your Cart is Empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <button
                    onClick={() => navigate('/products')}
                    className="btn btn-primary mt-3"
                >
                    Start Shopping
                </button>
            </div>
        );
    }

    // Calculate the total amount of the cart.
    const totalAmount = cart.items.reduce((acc, item) => acc + (item.quantity * item.product.price), 0);

    return (
        <div className="container my-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h1 className="mb-4 d-flex align-items-center">
                        <FaShoppingCart className="me-3 text-primary" /> Shopping Cart
                    </h1>
                    <div className="row">
                        <div className="col-lg-8">
                            {cart.items.map(item => (
                                <div key={item.id} className="card mb-3 shadow-sm">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-md-3">
                                                <img
                                                    src={item.product.image_url || 'https://via.placeholder.com/150'}
                                                    alt={item.product.name}
                                                    className="img-fluid rounded"
                                                />
                                            </div>
                                            <div className="col-md-5">
                                                <h5 className="card-title mb-1">{item.product.name}</h5>
                                                <p className="text-muted mb-2">${item.product.price}</p>
                                                <div className="d-flex align-items-center">
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                        className="btn btn-sm btn-outline-secondary me-2 rounded-circle"
                                                    >
                                                        <FaMinus />
                                                    </button>
                                                    <span className="badge bg-secondary rounded-pill px-3 py-2 me-2">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                        className="btn btn-sm btn-outline-secondary rounded-circle"
                                                    >
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-md-4 text-end">
                                                <h4 className="text-primary">${(item.quantity * item.product.price).toFixed(2)}</h4>
                                                <button
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="btn btn-sm btn-danger mt-2"
                                                >
                                                    <FaTrashAlt className="me-1" /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-lg-4 mt-4 mt-lg-0">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Cart Summary</h5>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Subtotal:</span>
                                            <strong>${totalAmount.toFixed(2)}</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Shipping:</span>
                                            <span>Free</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between fw-bold">
                                            <span>Total:</span>
                                            <span>${totalAmount.toFixed(2)}</span>
                                        </li>
                                    </ul>
                                    <div className="d-grid mt-3">
                                        <button onClick={handleCheckout} className="btn btn-success btn-lg">
                                            Proceed to Checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
