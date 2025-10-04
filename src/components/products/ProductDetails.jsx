// // src/pages/ProductDetailPage.jsx
// // This component displays the detailed information for a single product.

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import productService from '../../services/productService';
// import cartService from '../../services/cartService';
// import AuthContext from '../../context/AuthContext';
// import { useContext } from 'react';

// // Why this page is separate from ProductPage:
// // This page is a "detail" view, focusing on a single item. It uses a URL parameter
// // to identify which product to fetch. This separation makes the application
// // more scalable and user-friendly, as users can bookmark or share direct links
// // to products.
// const ProductDetailPage = () => {
//     // The `useParams` hook is used to get parameters from the URL.
//     // In our case, we get the 'id' from the route `/products/:id`.
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//   const { currentUser } = useContext(AuthContext);
// const token = currentUser.token;
//     // Why we use useEffect here:
//     // We fetch a single product's data based on the ID from the URL. The `id`
//     // in the dependency array `[id]` ensures that the effect re-runs whenever
//     // the product ID in the URL changes, allowing the page to load a different
//     // product without a full page refresh.
//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 // Call the service to get a single product by its ID.
//                 const data = await productService.getProductById(id);
//                 setProduct(data);
//             } catch (err) {
//                 // Set an error message if the API call fails or product not found.
//                 setError('Failed to fetch product details. The product may not exist.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProduct();
//     }, [id]); // Dependency array: re-run the effect if `id` changes.

//     /**
//      * @description Handles the click event for the "Add to Cart" button.
//      * It calls the cartService to add the product to the user's cart.
//      */
//     const handleAddToCart = async () => {
//         // We first check if the user is authenticated. If not, we redirect them to the login page.
//         if (!currentUser) {
//             navigate('/login');
//             return;
//         }

//         try {
//             // Call the cart service to add the product with a quantity of 1.
//             await cartService.addItem(product.id, 1,token);
//             alert('Product added to cart!'); // We can replace this with a more professional toast notification later.
//         } catch (err) {
//             console.error('Add to cart error:', err);
//             alert('Failed to add product to cart. Please try again.');
//         }
//     };

//     // Conditional rendering for a good user experience.
//     if (loading) {
//         return (
//             <div className="d-flex justify-content-center mt-5">
//                 <div className="spinner-border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="alert alert-danger mt-5" role="alert">
//                 {error}
//             </div>
//         );
//     }

//     if (!product) {
//         return (
//             <div className="alert alert-warning mt-5" role="alert">
//                 Product not found.
//             </div>
//         );
//     }

//     return (
//         <div className="container my-5">
//             <div className="row">
//                 <div className="col-md-6">
//                     <img
//                         src={product.image_url || "https://via.placeholder.com/600"}
//                         className="img-fluid rounded"
//                         alt={product.name}
//                     />
//                 </div>
//                 <div className="col-md-6">
//                     <h1 className="display-4">{product.name}</h1>
//                     <p className="lead">{product.description}</p>
//                     <hr />
//                     <h2 className="text-primary">${product.price}</h2>
//                     <p>
//                         <strong>Availability:</strong>{' '}
//                         {product.stock > 0 ? (
//                             <span className="badge bg-success">In Stock ({product.stock})</span>
//                         ) : (
//                             <span className="badge bg-danger">Out of Stock</span>
//                         )}
//                     </p>
//                     {/* Add to Cart button will be implemented here later */}
//                     <button className="btn btn-primary btn-lg mt-3" disabled={product.stock === 0} onClick={handleAddToCart}>
//                         Add to Cart
//                     </button>
//                     <button
//                         className="btn btn-secondary btn-lg ms-2 mt-3"
//                         onClick={() => navigate('/products')}
//                     >
//                         Back to Products
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDetailPage;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FaShoppingCart, FaSpinner } from 'react-icons/fa';
// import { useContext } from 'react';
// import AuthContext from '../../context/AuthContext';
// import productService from '../../services/productService';
// import cartService from '../../services/cartService';

// /**
//  * @description This component displays the detailed information for a single product.
//  * It fetches product data based on the URL parameter and provides an "Add to Cart" function.
//  */
// const ProductDetailPage = () => {
//     // The `useParams` hook gets the product `id` from the URL.
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { currentUser } = useContext(AuthContext);

//     // State management for product data, UI messages, and loading state.
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [message, setMessage] = useState('');
//     const token = currentUser?.token;
//     /**
//      * @description Fetches the product details from the backend.
//      * It uses the `useEffect` hook to run the fetch operation when the component mounts or the ID changes.
//      */
//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 // Why we fetch here: We need the product's full details, which aren't available in the list view.
//                 const data = await productService.getProductById(id);
//                 setProduct(data); // Note: The backend response wraps the product object in a 'product' key.
//             } catch (err) {
//                 console.error('Failed to fetch product:', err);
//                 setError(err.message || 'Failed to fetch product details.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProduct();
//     }, [id]); // Dependency array: Re-run the effect if the `id` changes.

//     /**
//      * @description Handles the "Add to Cart" button click.
//      * It calls the `cartService` to add the product and provides user feedback.
//      */
//     const handleAddToCart = async () => {
//         if (!currentUser) {
//             navigate('/login');
//             return;
//         }

//         try {
//             // Why we call the service: The service handles the complex API call logic,
//             // keeping our component clean and focused on UI.
//             // await cartService.addItem({ userId: currentUser.id, productId: product.id, quantity: 1, token });
//             await cartService.addItem(product.id, 1, token);

//             setMessage('Product added to cart successfully!');
//             navigate('/carts'); // Redirect to cart page after adding
//         } catch (err) {
//             setMessage('Failed to add product to cart. Please try again.');
//             console.error('Add to cart error:', err);
//         }
//     };

//     // --- Conditional Rendering for a Professional User Experience ---
//     if (loading) {
//         return (
//             <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
//                 <FaSpinner className="spin-animation me-2" size={30} />
//                 <span className="h5">Loading product...</span>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="alert alert-danger text-center my-5">
//                 <p className="mb-0">Error: {error}</p>
//             </div>
//         );
//     }

//     if (!product) {
//         return (
//             <div className="alert alert-warning text-center my-5">
//                 <p className="mb-0">Product not found......</p>
//             </div>
//         );
//     }

//     return (
//         <div className="container my-5">
//             <div className="card border-0 shadow-lg rounded-3">
//                 <div className="card-body p-4">
//                     <div className="row g-4 align-items-center">
//                         {/* Product Image Section */}
//                         <div className="col-md-5 d-flex justify-content-center">
//                             <img
//                                 src={product.image_url || `https://placehold.co/400x400?text=${product.name}`}
//                                 className="img-fluid rounded-3"
//                                 alt={product.name}
//                                 style={{ maxHeight: '400px', objectFit: 'contain' }}
//                             />
//                         </div>

//                         {/* Product Details Section */}
//                         <div className="col-md-7">
//                             <h1 className="display-5 fw-bold text-dark">{product.name}</h1>
//                             <p className="fs-5 text-muted">{product.description}</p>
//                             <hr className="my-3" />

//                             <h2 className="text-primary fw-bold mb-3">${product.price}</h2>

//                             <p className="fw-semibold">
//                                 Stock: {product.stock > 0
//                                     ? <span className="text-success">{product.stock} in stock</span>
//                                     : <span className="text-danger">Out of Stock</span>
//                                 }
//                             </p>

//                             {/* Add to Cart Button */}
//                             {product.stock > 0 && (
//                                 <button
//                                     className="btn btn-primary btn-lg rounded-pill d-flex align-items-center"
//                                     onClick={handleAddToCart}
//                                     disabled={!currentUser || product.stock === 0}
//                                 >
//                                     <FaShoppingCart className="me-2" /> Add to Cart
//                                 </button>
//                             )}

//                             {/* Dynamic Feedback Message */}
//                             {message && (
//                                 <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
//                                     {message}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Back Button */}
//             <div className="text-center mt-4">
//                 <button
//                     className="btn btn-secondary rounded-pill"
//                     onClick={() => navigate('/products')}
//                 >
//                     Back to Products
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ProductDetailPage;

// ====================== Works correctly only not styled ===================

// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import {
//   FaShoppingCart,
//   FaSpinner,
//   FaBox,
//   FaLongArrowAltLeft,
// } from "react-icons/fa";
// import { useContext } from "react";
// import AuthContext from "../../context/AuthContext";
// import productService from "../../services/productService";
// import cartService from "../../services/cartService";
// import "../../styles/ProductDetailPage.css";

// /**
//  * @description This component displays a product using a professional,
//  * interactive, split-screen layout with parallax effects.
//  */
// const ProductDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { currentUser } = useContext(AuthContext);

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState("");
//   const token = currentUser?.token;

//   // Ref for the product image container to handle the hover effect
//   const imageContainerRef = useRef(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const data = await productService.getProductById(id);
//         setProduct(data);
//       } catch (err) {
//         console.error("Failed to fetch product:", err);
//         setError(err.message || "Failed to fetch product details.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   useEffect(() => {
//     const imageContainer = imageContainerRef.current;
//     if (!imageContainer) return;

//     const handleMouseMove = (e) => {
//       const rect = imageContainer.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;

//       const xOffset = (x / rect.width - 0.5) * 20; // -10 to 10
//       const yOffset = (y / rect.height - 0.5) * 20; // -10 to 10

//       imageContainer.style.setProperty("--x", `${-xOffset}px`);
//       imageContainer.style.setProperty("--y", `${-yOffset}px`);
//     };

//     imageContainer.addEventListener("mousemove", handleMouseMove);
//     return () => {
//       imageContainer.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, [product]); // Rerun when product loads

//   const handleAddToCart = async () => {
//     if (!currentUser) {
//       setMessage("Please log in to add products to your cart.");
//       setTimeout(() => navigate("/login"), 1000);
//       return;
//     }

//     try {
//       await cartService.addItem(product.id, 1, token);
//       setMessage("Product added to cart successfully!");
//       setTimeout(() => navigate("/carts"), 1500);
//     } catch (err) {
//       setMessage("Failed to add product to cart. Please try again.");
//       console.error("Add to cart error:", err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="loading-state">
//         <FaSpinner className="spin-animation" size={60} />
//         <span className="h5 mt-3">Loading product...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="error-state">
//         <FaBox size={60} />
//         <p className="mt-3 mb-0">Error: {error}</p>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="not-found-state">
//         <FaBox size={60} />
//         <p className="mt-3 mb-0">Product not found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="product-page-container">
//       <button className="back-button-pro" onClick={() => navigate(-1)}>
//         <FaLongArrowAltLeft className="me-2" /> Back to Products
//       </button>
//       <div className="product-split-container">
//         <div ref={imageContainerRef} className="product-image-section">
//           <img
//             src={
//               product.image_url ||
//               `https://placehold.co/800x800?text=${product.name}`
//             }
//             alt={product.name}
//             className="product-hero-image"
//           />
//         </div>
//         <div className="product-details-section">
//           <div className="product-details-content">
//             <h1 className="product-title-pro animate__text-in animate__delay-1">
//               {product.name}
//             </h1>
//             <p className="product-description-pro animate__text-in animate__delay-2">
//               {product.description}
//             </p>
//             <hr className="my-4 animate__text-in animate__delay-3" />
//             <h2 className="product-price-pro animate__text-in animate__delay-4">
//               ${product.price}
//             </h2>
//             <p className="product-stock-status-pro animate__text-in animate__delay-5">
//               Stock:{" "}
//               {product.stock > 0 ? (
//                 <span className="text-success">{product.stock} in stock</span>
//               ) : (
//                 <span className="text-danger">Out of Stock</span>
//               )}
//             </p>
//             {product.stock > 0 && (
//               <button
//                 className="add-to-cart-btn-pro animate__text-in animate__delay-6"
//                 onClick={handleAddToCart}
//                 disabled={!currentUser || product.stock === 0}
//               >
//                 <FaShoppingCart className="me-2" /> Add to Cart
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       {message && (
//         <div
//           className={`toast-message ${
//             message.includes("successfully") ? "success" : "danger"
//           }`}
//         >
//           {message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetailPage;



// ======================New for styled ====================

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShoppingCart, FaSpinner, FaBox, FaLongArrowAltLeft } from 'react-icons/fa';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import productService from '../../services/productService';
import cartService from '../../services/cartService';
import '../../styles/ProductDetailPage.css';

/**
 * @description This component displays a product using a professional,
 * Bootstrap-native layout with animated elements.
 */
const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const token = currentUser?.token;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productService.getProductById(id);
                setProduct(data);
            } catch (err) {
                console.error('Failed to fetch product:', err);
                setError(err.message || 'Failed to fetch product details.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        if (!currentUser) {
            setMessage('Please log in to add products to your cart.');
            setTimeout(() => navigate('/login'), 1000);
            return;
        }

        try {
            await cartService.addItem(product.id, 1, token);
            setMessage('Product added to cart successfully!');
            setTimeout(() => navigate('/carts'), 1500);
        } catch (err) {
            setMessage('Failed to add product to cart. Please try again.');
            console.error('Add to cart error:', err);
        }
    };

    if (loading) {
        return (
            <div className="loading-state">
                <FaSpinner className="spin-animation" size={60} />
                <span className="h5 mt-3">Loading product...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-state">
                <FaBox size={60} />
                <p className="mt-3 mb-0">Error: {error}</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="not-found-state">
                <FaBox size={60} />
                <p className="mt-3 mb-0">Product not found.</p>
            </div>
        );
    }

    return (
        <div className="product-page-container-pro container my-5">
            <button className="back-button-pro" onClick={() => navigate(-1)}>
                <FaLongArrowAltLeft className="me-2" /> Back to Products
            </button>
            <div className="product-card-pro row g-4 p-4 shadow-lg rounded-4 animate__fadeInUp">
                <div className="col-lg-6 d-flex align-items-center justify-content-center animate__fadeInUp animate__delay-1">
                    <div className="product-image-container-pro">
                        <img
                            src={product.image_url || `https://placehold.co/800x800?text=${product.name}`}
                            alt={product.name}
                            className="img-fluid product-hero-image-pro"
                        />
                    </div>
                </div>
                <div className="col-lg-6 animate__fadeInUp animate__delay-2">
                    <div className="product-details-content-pro">
                        <h1 className="product-title-pro">{product.name}</h1>
                        <p className="product-description-pro">{product.description}</p>
                        <hr className="my-4" />
                        <h2 className="product-price-pro">${product.price}</h2>
                        <p className="product-stock-status-pro">
                            Stock: {product.stock > 0
                                ? <span className="text-success">{product.stock} in stock</span>
                                : <span className="text-danger">Out of Stock</span>
                            }
                        </p>
                        {product.stock > 0 && (
                            <button
                                className="add-to-cart-btn-pro"
                                onClick={handleAddToCart}
                                disabled={!currentUser || product.stock === 0}
                            >
                                <FaShoppingCart className="me-2" /> Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {message && (
                <div className={`toast-message ${message.includes('successfully') ? 'success' : 'danger'}`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default ProductDetailPage;