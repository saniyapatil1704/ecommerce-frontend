// // src/components/products/ProductCarousel.js
// import React from 'react';
// import ProductCard from './ProductCard';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../styles/ProductPage.css';

// const ProductCarousel = ({ products, handleAddToCart }) => {
//     return (
//         <div className="product-carousel-container">
//             <div className="d-flex flex-nowrap overflow-auto py-3">
//                 {products.map((product) => (
//                     <div key={product.id} className="product-carousel-item flex-shrink-0 me-3">
//                         <ProductCard
//                             product={product}
//                             handleAddToCart={handleAddToCart}
//                         />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ProductCarousel;


import React from 'react';
import ProductCard from './ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/ProductPage.css';

const ProductCarousel = ({ products, handleAddToCart }) => {
    return (
        <div className="product-carousel-container">
            <div className="d-flex flex-nowrap overflow-auto py-3">
                {products.map((product) => (
                    <div key={product.id} className="product-carousel-item flex-shrink-0 me-3">
                        <ProductCard
                            product={product}
                            handleAddToCart={handleAddToCart}
                            isFeatured={true} // Add this prop
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCarousel;