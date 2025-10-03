// import ProductCard from './ProductCard'; // Ensure this path is correct
// // ...
// const ProductGrid = ({ products, handleMessage }) => {
//   console.log('ProductGrid received products:', products); // Log the received products
//   if (!products || products.length === 0) {
//     console.log('No products to map.');
//     return null; // or an empty div
//   }
//    const handleAddToCart = async (productId) => {
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

//   return (
//     <div className="container product-grid-container">
//       <div className="row g-4">
//         {products.map((product) => {
//           console.log('Rendering product:', product.id); // Check each product
//           return (
//             <div key={product.id} className="col-lg-4 col-md-6 col-sm-12">
//               <ProductCard
//                 product={product}
//                 handleAddToCart={handleAddToCart}
//               />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };
// export default ProductGrid;


import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, handleMessage, handleAddToCart }) => {
  console.log('ProductGrid received products:', products);

  if (!products || products.length === 0) {
    console.log('No products to map.');
    return null; // Or a placeholder message if desired
  }

  return (
    <div className="container product-grid-container">
      <div className="row g-4">
        {products.map((product) => {
          console.log('Rendering product:', product.id);
          return (
            <div key={product.id} className="col-lg-4 col-md-6 col-sm-12">
              <ProductCard
                product={product}
                handleAddToCart={handleAddToCart}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;