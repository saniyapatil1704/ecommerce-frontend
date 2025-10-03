// // import React from 'react'
// // import LoginPage from './pages/LoginPage'
// // import RegisterPage from './pages/RegisterPage'

// // const App = () => {
// //   return (
// //     <div>
// //       {/* <LoginPage /> */}
// //       <RegisterPage />
// //     </div>
// //   )
// // }

// // export default App

// import React, { useState } from 'react';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import HomePage from './pages/HomePage';
// // import './assets/styles/main.css';

// // This is the main application component that manages the overall state and view.
// const App = () => {
//   // We use the `useState` hook to keep track of the current page being displayed.
//   // The default view is the 'login' page.
//   const [view, setView] = useState('home');

//   return (
//     <div>
//       {/*
//         This is a simple router logic using a conditional rendering.
//         If the view is 'login', render the LoginPage.
//         If the view is 'register', render the RegisterPage.
//         We also pass the `setView` function to each page so they can change the view.
//       */}
//       {view === 'login' && <LoginPage setView={setView} />}
//       {view === 'register' && <RegisterPage setView={setView} />}
//       {view === 'home' && <HomePage />}
//     </div>
//   );
// };

// export default App;

// src/App.jsx
// This is the main application component. It sets up the routing
// and provides the authentication context to the entire application.

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import Footer from './components/common/Footer';

// Importing the pages we will create next.
// We'll follow the folder structure we established.
// import HomePage from './pages/HomePage';
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
// import ProductPage from './pages/ProductPage';
import ProductDetailPage from "./components/products/ProductDetails";
import AddProductPage from "./components/products/AddProduct";
import EditProduct from "./components/products/EditProduct";
import ProductList from "./pages/ProductList";
import CartPage from "./pages/CartPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./components/ProductPage";
import PrivateRoute from "./components/common/PrivateRoute";
// import RegisterPage from './pages/RegisterPage';

import "./App.css";
// Why we use BrowserRouter and Routes:
// BrowserRouter enables client-side routing, which allows us to create
// single-page applications. The Routes component is a container for all
// our individual Route components. Each Route defines a path and the
// component that should be rendered when the URL matches that path.
const App = () => {
  return (
    // Why we wrap everything in AuthProvider:
    // This makes the authentication state (like `currentUser`, `login`, etc.)
    // available to every component within the application's component tree
    // without having to pass props manually.
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              {/* Home Page Route */}
              <Route path="/" element={<HomePage />} />

              <Route path="/home" element={<HomePage />} />
              {/* Login Page Route */}
              <Route path="/login" element={<LoginPage />} />
              {/* Register Page Route */}
              <Route path="/register" element={<RegisterPage />} />
              {/* Add other routes here as we build them */}
              <Route path="/products" element={<ProductPage />} />

              <Route
                path="/products-manage"
                element={
                  <PrivateRoute>
                    <ProductList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/order-history"
                element={
                  <PrivateRoute>
                    <OrderHistoryPage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/create-products"
                element={
                  <PrivateRoute>
                    <AddProductPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/products/:id"
                element={
                  <PrivateRoute>
                    <ProductDetailPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/products/:id/edit"
                element={
                  <PrivateRoute>
                    <EditProduct />
                  </PrivateRoute>
                }
              />

              <Route
                path="/carts"
                element={
                  <PrivateRoute>
                    <CartPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
