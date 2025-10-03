// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaShoppingCart, FaBoxes } from 'react-icons/fa';

// const ProductCard = ({ product, handleAddToCart }) => {
//   // Use a more robust check to ensure a valid image URL
//     console.log('ProductCard is rendering:', product.name); // Check if the component renders
//   // Check for invalid data before rendering
//   if (!product || !product.id || !product.name) {
//     console.error('Invalid product data received:', product);
//     return null;
//   }
//   const imageUrl = product.image_url && product.image_url.trim() !== ''
//     ? product.image_url
//     : `https://placehold.co/400x400?text=${product.name}`;

//   return (
//     <div className="card product-card h-100 shadow-sm">
//       <div className="product-card-img-container">
//         <img
//           src={imageUrl} // Use the new imageUrl variable
//           className="card-img-top"
//           alt={product.name}
//           loading="lazy"
//         />
//       </div>
//       <div className="card-body d-flex flex-column">
//         <h5 className="card-title fw-bold">{product.name}</h5>
//         <p className="card-text text-muted flex-grow-1">
//           {product.description}
//         </p>
//         <p className="card-text fs-4 fw-bold text-primary">
//           ${parseFloat(product.price).toFixed(2)}
//         </p>
//       </div>
//       <div className="product-card-footer mt-auto d-flex justify-content-between align-items-center p-4 pt-0">
//         <Link
//           to={`/products/${product.id}`}
//           className="btn btn-view-details btn-outline-secondary"
//         >
//           View Details
//         </Link>
//         {product.stock > 0 ? (
//           <button
//             className="btn btn-primary btn-add-to-cart d-flex align-items-center rounded-pill"
//             onClick={() => handleAddToCart(product.id)}
//           >
//             <FaShoppingCart className="me-2" /> Add to Cart
//           </button>
//         ) : (
//           <span className="badge bg-danger text-white p-2">
//             <FaBoxes className="me-1" /> Out of Stock
//           </span>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBoxes, FaStar, FaEye } from "react-icons/fa";

const ProductCard = ({ product, handleAddToCart, isFeatured = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const imageUrl =
    product.image_url && product.image_url.trim() !== ""
      ? product.image_url
      : `https://placehold.co/400x400?text=${product.name}`;

  const formattedPrice = !isNaN(parseFloat(product.price))
    ? `$${parseFloat(product.price).toFixed(2)}`
    : "Price not available";

  // Logic to determine the badge type
  let badgeContent = null;
  if (isFeatured && product.stock != 0) {
    if (product.stock < 5 && product.stock > 0) {
      badgeContent = { text: "Limited Stock", type: "danger" };
    } else if (product.price > 2000) {
      badgeContent = { text: "Top Seller", type: "warning" };
    } else {
      badgeContent = { text: "New", type: "primary" };
    }
  }

  return (
    <div
      className={`card product-card h-100 shadow-sm ${
        isFeatured ? "featured-card" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isFeatured && badgeContent && (
        <span className={`badge badge-interactive bg-${badgeContent.type}`}>
          {badgeContent.text}
        </span>
      )}

      {isFeatured && isHovered && (
        <Link to={`/products/${product.id}`} className="quick-look-btn">
          <FaEye className="me-1" /> Quick Look
        </Link>
      )}

      <div className="product-card-img-container">
        <img
          src={imageUrl}
          className="card-img-top"
          alt={product.name}
          loading="lazy"
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold">{product.name}</h5>
        <p className="card-text text-muted flex-grow-1">
          {product.description}
        </p>
        <div className="d-flex align-items-center mb-2">
          <div className="star-rating">
            {[...Array(5)].map((star, i) => (
              <FaStar key={i} color={i < 4 ? "#ffc107" : "#e4e5e9"} />
            ))}
          </div>
          <small className="ms-2 text-muted">(12 Reviews)</small>
        </div>
        <p className="card-text fs-4 fw-bold text-primary">{formattedPrice}</p>
      </div>
      <div className="product-card-footer mt-auto d-flex justify-content-between align-items-center p-4 pt-0">
        <Link
          to={`/products/${product.id}`}
          className="btn btn-view-details btn-outline-secondary"
        >
          View Details
        </Link>
        {product.stock > 0 ? (
          <button
            className="btn btn-primary btn-add-to-cart d-flex align-items-center rounded-pill"
            onClick={() => handleAddToCart(product.id)}
          >
            <FaShoppingCart className="me-2" /> Add to Cart
          </button>
        ) : (
          <span className="badge bg-danger text-white p-2">
            <FaBoxes className="me-1" /> Out of Stock
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
