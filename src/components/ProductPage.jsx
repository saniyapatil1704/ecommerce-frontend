// // src/pages/ProductPage.jsx
// // This component serves as the main page to display all products.
// // It fetches product data from the backend and handles loading/error states.

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import productService from '../services/productService';

// // Why we fetch data in a top-level page component:
// // This is a standard practice in React. The parent component (ProductPage) is responsible
// // for managing the data state (loading, error, data). This keeps child components
// // (like ProductCard or ProductList) "dumb" and focused on simply rendering the data
// // they receive as props.
// const ProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Why we use useEffect:
//   // The `useEffect` hook is the standard way to perform side effects in React
//   // functional components. Fetching data from an API is a side effect.
//   // The empty dependency array `[]` ensures this effect runs only once after
//   // the component mounts, preventing infinite loops.
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await productService.getAllProducts();
//         setProducts(data);
//       } catch (err) {
//         // Set an error message if the API call fails.
//         setError('Failed to fetch products. Please try again later.');
//       } finally {
//         // We set loading to false whether the request succeeds or fails.
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Conditional Rendering based on state. This is a best practice.
//   // We provide clear feedback to the user based on the application's state.
//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center mt-5">
//         <div className="spinner-border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="alert alert-danger mt-5" role="alert">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="container my-5">
//       <h1 className="text-center mb-4">Our Products</h1>
//       <div className="row">
//         {products.length > 0 ? (
//           // We will map over the products and render a ProductCard component for each one.
//           // For now, we'll just display a simple list to confirm data is fetched.
//           products.map(product => (
//             <div key={product.id} className="col-md-4 mb-4">
//               <div className="card">
//                 <img
//                   src={product.image_url || "https://via.placeholder.com/300"}
//                   className="card-img-top"
//                   alt={product.name}
//                   style={{ height: '200px', objectFit: 'cover' }}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{product.name}</h5>
//                   <p className="card-text">{product.description}</p>
//                   <p className="card-text"><strong>${product.price}</strong></p>
//                   <Link to={`/products/${product.id}`} className="btn btn-primary">
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-12">
//             <div className="alert alert-info text-center" role="alert">
//               No products found.
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaShoppingCart, FaSpinner } from "react-icons/fa";
// import productService from "../services/productService";
// import { useContext } from "react";
// import AuthContext from "../context/AuthContext";
// import cartService from "../services/cartService";

// /**
//  * @description This component serves as the main page to display all products.
//  * It fetches product data from the backend and handles loading/error states.
//  */
// const ProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState("");

//   const { currentUser } = useContext(AuthContext);
//   const token = currentUser ? currentUser.token : null;

//   const navigate = useNavigate();
//   // Why we use useEffect:
//   // The `useEffect` hook is the standard way to perform side effects in React
//   // functional components. Fetching data from an API is a side effect.
//   // The empty dependency array `[]` ensures this effect runs only once after
//   // the component mounts, preventing infinite loops.
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await productService.getAllProducts();
//         setProducts(response || []);
//       } catch (err) {
//         // Set an error message if the API call fails.
//         setError("Failed to fetch products. Please try again later.");
//       } finally {
//         // We set loading to false whether the request succeeds or fails.
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Conditional Rendering based on state. This is a best practice.
//   // We provide clear feedback to the user based on the application's state.
//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center mt-5">
//         <FaSpinner
//           className="spinner-border text-primary"
//           size={50}
//           role="status"
//         />
//         <span className="visually-hidden">Loading...</span>
//       </div>
//     );
//   }

//   /**
//    * @description Handles the "Add to Cart" button click.
//    * It calls the `cartService` to add the product and provides user feedback.
//    */
//   const handleAddToCart = async (productId) => {
//     if (!currentUser) {
//       navigate("/login");
//       return;
//     }

//     try {
//       // Why we call the service: The service handles the complex API call logic,
//       // keeping our component clean and focused on UI.
//       // await cartService.addItem({ userId: currentUser.id, productId: product.id, quantity: 1, token });
//       await cartService.addItem(productId, 1, token);

//       setMessage("Product added to cart successfully!");
//       navigate("/carts"); // Redirect to cart page after adding
//     } catch (err) {
//       setMessage("Failed to add product to cart. Please try again.");
//       console.error("Add to cart error:", err);
//     }
//   };

//   if (error) {
//     return (
//       <div className="alert alert-danger mt-5 text-center" role="alert">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="container my-5">
//       {/* Dynamic Feedback Message */}
//       {message && (
//         <div
//           className={`alert ${
//             message.includes("successfully") ? "alert-success" : "alert-danger"
//           } mt-3`}
//           role="alert"
//         >
//           {message}
//         </div>
//       )}
//       <h1 className="text-center mb-5">Our Products</h1>
//       <div className="row">
//         {products.length > 0 ? (
//           // We will map over the products and render a visually appealing card for each one.
//           products.map((product) => (
//             <div key={product.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
//               <div className="card h-100 shadow-sm border-0">
//                 <img
//                   src={
//                     product.image_url || `https://placehold.co/400x400?text=${product.name}`
//                   }
//                   className="card-img-top"
//                   alt={product.name}
//                   style={{ height: "200px", objectFit: "cover" }}
//                 />
//                 <div className="card-body d-flex flex-column">
//                   <h5 className="card-title fw-bold">{product.name}</h5>
//                   <p className="card-text text-muted flex-grow-1">
//                     {product.description}
//                   </p>
//                   <p className="card-text fs-4 fw-bold text-primary">
//                     ${parseFloat(product.price).toFixed(2)}
//                   </p>
//                   <div className="mt-auto d-flex justify-content-between">
//                     <Link
//                       to={`/products/${product.id}`}
//                       className="btn btn-outline-secondary"
//                     >
//                       View Details
//                     </Link>
//                     {/* Add to Cart Button */}
//                     {product.stock > 0 && (
//                       <button
//                         className="btn btn-primary btn-lg rounded-pill d-flex align-items-center"
//   onClick={() => handleAddToCart(product.id)}
//                         disabled={!currentUser || products.stock === 0}
//                       >
//                         <FaShoppingCart className="me-2" /> Add to Cart
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-12">
//             <div className="alert alert-info text-center" role="alert">
//               No products found.
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import {
//   FaShoppingCart,
//   FaSpinner,
//   FaBoxes,
//   FaPlusCircle,
// } from "react-icons/fa";
// import productService from "../services/productService";
// import { useContext } from "react";
// import AuthContext from "../context/AuthContext";
// import cartService from "../services/cartService";
// import "../styles/ProductPage.css";

// const ProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState("");

//   const { currentUser } = useContext(AuthContext);
//   const token = currentUser ? currentUser.token : null;
//   const navigate = useNavigate();

//   const productRefs = useRef([]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("is-visible");
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.2 }
//     );

//     productRefs.current.forEach((el) => {
//       if (el) observer.observe(el);
//     });

//     return () => {
//       productRefs.current.forEach((el) => {
//         if (el) observer.unobserve(el);
//       });
//     };
//   }, [products]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await productService.getAllProducts();
//         setProducts(response || []);
//       } catch (err) {
//         setError("Failed to fetch products. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleAddToCart = async (productId) => {
//     if (!currentUser) {
//       setMessage("Please log in to add products to your cart.");
//       setTimeout(() => navigate("/login"), 1000);
//       return;
//     }

//     try {
//       await cartService.addItem(productId, 1, token);
//       setMessage("Product added to cart successfully!");
//       setTimeout(() => navigate("/carts"), 1000);
//     } catch (err) {
//       setMessage("Failed to add product to cart. Please try again.");
//       console.error("Add to cart error:", err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//         <FaSpinner
//           className="spinner-border text-primary"
//           size={60}
//           role="status"
//           style={{ animation: "spin 1s linear infinite" }}
//         />
//         <span className="visually-hidden">Loading...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="alert alert-danger mt-5 text-center" role="alert">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="product-page-content">
//       <div className="animated-background-mesh"></div>
//       <header className="product-page-header">
//         <div className="container">
//           <h1 className="display-4 fw-bold animate-text-in">Our Products</h1>
//           <p className="lead text-muted animate-text-in animate-delay-200">
//             Explore our latest collection and find what you need.
//           </p>
//           {currentUser && (
//             <Link
//               to="/create-products"
//               className="btn btn-primary mt-3 btn-lg rounded-pill animate-text-in animate-delay-400"
//             >
//               <FaPlusCircle className="me-2" /> Add a New Product
//             </Link>
//           )}
//         </div>
//       </header>

//       {message && (
//         <div
//           className={`toast-message animate__slideInUp ${
//             message.includes("successfully") ? "success" : "danger"
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       <div className="container product-grid-container">
//         {products.length > 0 ? (
//           <div className="row g-4">
//             {products.map((product, index) => (
//               <div key={product.id} className="col-lg-4 col-md-6 col-sm-12">
//                 <div
//                   ref={(el) => (productRefs.current[index] = el)}
//                   className="card product-card h-100 shadow-sm"
//                 >
//                   <div className="card-inner-wrapper">
//                     <div
//                       className="product-card-img-container"
//                       data-speed="1.2"
//                     >
//                       <img
//                         src={
//                           product.image_url ||
//                           `https://placehold.co/400x400?text=${product.name}`
//                         }
//                         className="card-img-top"
//                         alt={product.name}
//                       />
//                     </div>
//                     <div
//                       className="card-body d-flex flex-column"
//                       data-speed="0.8"
//                     >
//                       <h5 className="card-title fw-bold">{product.name}</h5>
//                       <p className="card-text text-muted flex-grow-1">
//                         {product.description}
//                       </p>
//                       <p className="card-text fs-4 fw-bold text-primary">
//                         ${parseFloat(product.price).toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="product-card-footer mt-auto d-flex justify-content-between align-items-center p-4 pt-0">
//                     <Link
//                       to={`/products/${product.id}`}
//                       className="btn btn-view-details btn-outline-secondary"
//                     >
//                       View Details
//                     </Link>
//                     {product.stock > 0 ? (
//                       <button
//                         className="btn btn-primary btn-add-to-cart d-flex align-items-center rounded-pill"
//                         onClick={() => handleAddToCart(product.id)}
//                         // disabled={!currentUser}
//                       >
//                         <FaShoppingCart className="me-2" /> Add to Cart
//                       </button>
//                     ) : (
//                       <span className="badge bg-danger text-white p-2">
//                         <FaBoxes className="me-1" /> Out of Stock
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="col-12 text-center my-5">
//             <FaBoxes size={80} className="text-secondary mb-3" />
//             <h2 className="mb-2">No products found.</h2>
//             <p className="lead">It looks like our shelves are empty for now.</p>
//             {currentUser && (
//               <Link
//                 to="/create-products"
//                 className="btn btn-primary mt-3 btn-lg rounded-pill"
//               >
//                 <FaPlusCircle className="me-2" /> Add Your First Product
//               </Link>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

// main page

// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaPlusCircle, FaBoxes, FaSpinner } from 'react-icons/fa';
// import productService from '../services/productService';
// import AuthContext from '../context/AuthContext';
// import ProductGrid from './products/ProductGrid';
// import '../styles/ProductPage.css';

// const ProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState('');

//   const { currentUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await productService.getAllProducts();
//         console.log('Fetched products:', response);
//         setProducts(response || []);
//       } catch (err) {
//         setError('Failed to fetch products. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleMessage = (msg, type = 'success') => {
//     setMessage({ text: msg, type });
//     setTimeout(() => setMessage(null), 3000); // Hide message after 3 seconds
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//         <FaSpinner className="spinner-border text-primary" size={60} />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="alert alert-danger mt-5 text-center" role="alert">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="product-page-content">
//       <header className="product-page-header">
//         <div className="container">
//           <h1 className="display-4 fw-bold">Our Products</h1>
//           <p className="lead text-muted">
//             Explore our latest collection and find what you need.
//           </p>
//           {currentUser && (
//             <Link
//               to="/create-products"
//               className="btn btn-primary mt-3 btn-lg rounded-pill"
//             >
//               <FaPlusCircle className="me-2" /> Add a New Product
//             </Link>
//           )}
//         </div>
//       </header>

//       {message && (
//         <div className={`custom-toast-message ${message.type}`}>
//           {message.text}
//         </div>
//       )}

//       {products.length > 0 ? (
//         <ProductGrid products={products} handleMessage={handleMessage} />
//       ) : (
//         <div className="col-12 text-center my-5 empty-state">
//           <FaBoxes size={80} className="text-secondary mb-3" />
//           <h2 className="mb-2">No products found.</h2>
//           <p className="lead">It looks like our shelves are empty for now.</p>
//           {currentUser && (
//             <Link
//               to="/create-products"
//               className="btn btn-primary mt-3 btn-lg rounded-pill"
//             >
//               <FaPlusCircle className="me-2" /> Add Your First Product
//             </Link>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductPage;

// with hero

// // src/components/ProductPage.js
// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaPlusCircle, FaBoxes, FaSpinner } from 'react-icons/fa';
// import productService from '../services/productService';
// import AuthContext from '../context/AuthContext';
// import ProductGrid from './products/ProductGrid';
// import '../styles/ProductPage.css';
// import Hero from './Hero'; // New Hero component
// import cartService from '../services/cartService'; // Add cartService import

// const ProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const { currentUser } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const token = currentUser?.token;

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await productService.getAllProducts();
//         setProducts(response || []);
//         setFilteredProducts(response || []);
//       } catch (err) {
//         setError('Failed to fetch products. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const result = products.filter(product =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.description.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredProducts(result);
//   }, [searchTerm, products]);

//   const handleMessage = (msg, type = 'success') => {
//     setMessage({ text: msg, type });
//     setTimeout(() => setMessage(null), 3000, navigate('/login'));

//   };

//   const handleAddToCart = async (productId) => {
//     if (!currentUser) {
//       handleMessage('Please log in to add products to your cart.', 'danger');
//       return;
//     }

//     try {
//       await cartService.addItem(productId, 1, token);
//       handleMessage('Product added to cart successfully!', 'success');
//     } catch (err) {
//       handleMessage('Failed to add product to cart. Please try again.', 'danger');
//       console.error('Add to cart error:', err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//         <FaSpinner className="spinner-border text-primary" size={60} />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="alert alert-danger mt-5 text-center" role="alert">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="product-page-content">
//       <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//       {message && (
//         <div className={`custom-toast-message ${message.type}`}>
//           {message.text}
//         </div>
//       )}
//       <div className="container product-grid-container">
//         {filteredProducts.length > 0 ? (
//           <ProductGrid products={filteredProducts} handleMessage={handleMessage} handleAddToCart={handleAddToCart} />
//         ) : (
//           <div className="col-12 text-center my-5 empty-state">
//             <FaBoxes size={80} className="text-secondary mb-3" />
//             <h2 className="mb-2">No products found.</h2>
//             <p className="lead">It looks like our shelves are empty for now.</p>
//             {currentUser && (
//               <Link
//                 to="/create-products"
//                 className="btn btn-primary mt-3 btn-lg rounded-pill"
//               >
//                 <FaPlusCircle className="me-2" /> Add Your First Product
//               </Link>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

// with caorousole

// // src/components/ProductPage.js
// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaPlusCircle, FaBoxes, FaSpinner } from 'react-icons/fa';
// import productService from '../services/productService';
// import AuthContext from '../context/AuthContext';
// import ProductGrid from './products/ProductGrid';
// import ProductCarousel from './products/ProductCarousel'; // New carousel component
// import Hero from './Hero';
// import cartService from '../services/cartService';
// import '../styles/ProductPage.css';

// const ProductPage = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [message, setMessage] = useState('');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [featuredProducts, setFeaturedProducts] = useState([]);

//     const { currentUser } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const token = currentUser?.token;

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await productService.getAllProducts();
//                 setProducts(response || []);
//                 setFilteredProducts(response || []);
//                 // Filter for featured products (e.g., based on a property or ID)
//                 setFeaturedProducts(response.filter(p => p.stock > 0 && p.price >= 500));
//             } catch (err) {
//                 setError('Failed to fetch products. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProducts();
//     }, []);

//     useEffect(() => {
//         const result = products.filter(product =>
//             product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             product.description.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         setFilteredProducts(result);
//     }, [searchTerm, products]);

//     const handleMessage = (msg, type = 'success') => {
//         setMessage({ text: msg, type });
//         setTimeout(() => setMessage(null), 3000);
//     };

//     const handleAddToCart = async (productId) => {
//         if (!currentUser) {
//             handleMessage('Please log in to add products to your cart.', 'danger');
//             return;
//         }

//         try {
//             await cartService.addItem(productId, 1, token);
//             handleMessage('Product added to cart successfully!', 'success');
//         } catch (err) {
//             handleMessage('Failed to add product to cart. Please try again.', 'danger');
//             console.error('Add to cart error:', err);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//                 <FaSpinner className="spinner-border text-primary" size={60} />
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="alert alert-danger mt-5 text-center" role="alert">
//                 {error}
//             </div>
//         );
//     }

//     return (
//         <div className="product-page-content">
//             <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

//             {message && (
//                 <div className={`custom-toast-message ${message.type}`}>
//                     {message.text}
//                 </div>
//             )}

//             {/* Featured Products Section */}
//             {featuredProducts.length > 0 && (
//                 <section className="featured-section py-5">
//                     <div className="container">
//                         <h2 className="section-title text-center mb-4">Featured Products</h2>
//                         <ProductCarousel products={featuredProducts} handleAddToCart={handleAddToCart} />
//                     </div>
//                 </section>
//             )}

//             {/* All Products Section */}
//             <section className="all-products-section py-5">
//                 <div className="container">
//                     <h2 className="section-title text-center mb-4">All Products</h2>
//                     {filteredProducts.length > 0 ? (
//                         <ProductGrid products={filteredProducts} handleMessage={handleMessage} handleAddToCart={handleAddToCart} />
//                     ) : (
//                         <div className="col-12 text-center my-5 empty-state">
//                             <FaBoxes size={80} className="text-secondary mb-3" />
//                             <h2 className="mb-2">No products found.</h2>
//                             <p className="lead">It looks like our shelves are empty for now.</p>
//                             {currentUser && (
//                                 <Link
//                                     to="/create-products"
//                                     className="btn btn-primary mt-3 btn-lg rounded-pill"
//                                 >
//                                     <FaPlusCircle className="me-2" /> Add Your First Product
//                                 </Link>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default ProductPage;

import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlusCircle, FaBoxes, FaSpinner } from "react-icons/fa";
import productService from "../services/productService";
import AuthContext from "../context/AuthContext";
import ProductGrid from "./products/ProductGrid";
import ProductCarousel from "./products/ProductCarousel";
import Hero from "./Hero";
import cartService from "../services/cartService";
import "../styles/ProductPage.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = currentUser?.token;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAllProducts();
        setProducts(response || []);
        setFilteredProducts(response || []);
        // Simple logic for featured products: products with a price over $1000 &  stock is not 0
        setFeaturedProducts(response.filter((p) => p.price > 1000 && p.stock !=0));
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const result = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(result);
  }, [searchTerm, products]);

  const handleMessage = (msg, type = "success") => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddToCart = async (productId) => {
    if (!currentUser) {
      handleMessage("Please log in to add products to your cart.", "danger");
      return;
    }

    try {
      await cartService.addItem(productId, 1, token);
      handleMessage("Product added to cart successfully!", "success");
    } catch (err) {
      handleMessage(
        "Failed to add product to cart. Please try again.",
        "danger"
      );
      console.error("Add to cart error:", err);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <FaSpinner className="spinner-border text-primary" size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-5 text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="product-page-content">
      {message && (
        <div className={`custom-toast-message ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* 1. Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="featured-section py-5 bg-white">
          <div className="container">
            <h2 className="section-title text-center mb-4">
              Featured Products
            </h2>
            <ProductCarousel
              products={featuredProducts}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </section>
      )}

      {/* 2. Hero Section with Search Bar */}
      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* 3. All Products Section */}
      <section className="all-products-section py-5">
        <div className="container">
          <h2 className="section-title text-center mb-4">All Products</h2>
          {filteredProducts.length > 0 ? (
            <ProductGrid
              products={filteredProducts}
              handleMessage={handleMessage}
              handleAddToCart={handleAddToCart}
            />
          ) : (
            <div className="col-12 text-center my-5 empty-state">
              <FaBoxes size={80} className="text-secondary mb-3" />
              <h2 className="mb-2">No products found.</h2>
              <p className="lead">
                It looks like our shelves are empty for now.
              </p>
              {currentUser && (
                <Link
                  to="/create-products"
                  className="btn btn-primary mt-3 btn-lg rounded-pill"
                >
                  <FaPlusCircle className="me-2" /> Add Your First Product
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
