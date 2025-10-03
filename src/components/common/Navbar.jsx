// // src/components/common/Navbar.jsx
// // This component renders the main navigation bar for the application.
// // It dynamically shows links based on the user's authentication status.

// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import AuthContext from "../../context/AuthContext";

// // Why we use `useContext`:
// // The `useContext` hook allows us to access the global authentication state
// // provided by the `AuthContext.Provider`. This lets
// //  us check if a user is logged in
// // and access the `logout` function.
// const Navbar = () => {
//   const { currentUser, logout } = useContext(AuthContext);

//   // Why we use `Link`:
//   // `Link` is a component from `react-router-dom` that prevents a full page
//   // reload when navigating, making the user experience faster and more fluid.
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">
//           E-commerce
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <Link className="nav-link" to="/products">
//                 Products
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/cart">
//                 Cart
//               </Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/create-products">
//                 Create Product
//               </Link>
//             </li>
//           </ul>
//           <ul className="navbar-nav">
//             {/* Why we use conditional rendering:
//                 We check if the `user` object exists. If it does, the user is authenticated,
//                 and we show their profile and a logout button. Otherwise, we show
//                 the login and register links. */}
//             {currentUser ? (
//               <>
//                 <li className="nav-item">
//                   <span className="nav-link">Hello, {currentUser.email}</span>
//                 </li>
//                 <li className="nav-item">
//                   {/* The `onClick` handler calls the `logout` function from the context. */}
//                   <button className="btn btn-danger" onClick={logout}>
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <Link className="btn btn-outline-primary me-2" to="/login">
//                     Login
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="btn btn-primary" to="/register">
//                     Register
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React from "react";
// import { Link } from "react-router-dom";
// import AuthContext from "../../context/AuthContext";
// // Why we need both CSS and JS:
// // The CSS file provides the styling for Bootstrap components.
// // The JS bundle provides the interactive functionality, like toggling the hamburger menu.
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { FaShoppingCart, FaUser, FaHistory, FaSignOutAlt, FaPlusSquare } from "react-icons/fa";
// import { useContext } from "react";

// /**
//  * @description: This component renders the main navigation bar for the application.
//  * It dynamically shows links based on the user's authentication status, ensuring a
//  * consistent and professional user experience across all pages.
//  */
// const Navbar = () => {
//     // We use the `useAuth` hook to access the global authentication state.
//     // This allows us to check if a user is logged in and access the `logout` function.
//     const { currentUser, logout } = useContext(AuthContext);

//     return (
//         <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
//             <div className="container-fluid">
//                 {/* Brand link that always leads to the home page */}
//                 <Link className="navbar-brand fw-bold" to="/Home">
//                     E-commerce
//                 </Link>
//                 {/*
//                  * Why we move the toggler button here:
//                  * Placing the toggler button after the navbar-brand and using flexbox
//                  * utilities will explicitly align the brand to the left and the button
//                  * to the right on all screen sizes, which is a standard mobile UI pattern.
//                  */}
//                 <button
//                     className="navbar-toggler"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#navbarNav"
//                     aria-controls="navbarNav"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation"
//                 >
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/products">
//                                 Products
//                             </Link>
//                         </li>
//                         {/* Conditional rendering for logged-in users */}
//                         {currentUser ? (
//                             <>
//                                 {/* Link to add new products */}
//                                 <li className="nav-item">
//                                     <Link className="nav-link d-flex align-items-center" to="/create-products">
//                                         <FaPlusSquare className="me-2" /> Add Product
//                                     </Link>
//                                 </li>
//                                 {/* Link to the user's cart */}
//                                 <li className="nav-item">
//                                     <Link className="nav-link d-flex align-items-center" to="/carts">
//                                         <FaShoppingCart className="me-2" /> Cart
//                                     </Link>
//                                 </li>
//                                 {/* Link to the user's order history */}
//                                 <li className="nav-item">
//                                     <Link className="nav-link d-flex align-items-center" to="/order-history">
//                                         <FaHistory className="me-2" /> Orders
//                                     </Link>
//                                 </li>
//                                 {/* Link to the user's profile */}
//                                 <li className="nav-item dropdown">
//                                     <a
//                                         className="nav-link dropdown-toggle d-flex align-items-center"
//                                         href="#"
//                                         id="navbarDropdown"
//                                         role="button"
//                                         data-bs-toggle="dropdown"
//                                         aria-expanded="false"
//                                     >
//                                         <FaUser className="me-2" /> Hello, {currentUser.email}
//                                     </a>
//                                     <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
//                                         <li>
//                                             <Link className="dropdown-item" to="/profile">
//                                                 Profile
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <hr className="dropdown-divider" />
//                                         </li>
//                                         <li>
//                                             <button className="dropdown-item text-danger" onClick={logout}>
//                                                 <FaSignOutAlt className="me-2" /> Logout
//                                             </button>
//                                         </li>
//                                     </ul>
//                                 </li>
//                             </>
//                         ) : (
//                             // Conditional rendering for logged-out users
//                             <>
//                                 <li className="nav-item">
//                                     <Link className="btn btn-outline-light me-2" to="/login">
//                                         Login
//                                     </Link>
//                                 </li>
//                                 <li className="nav-item">
//                                     <Link className="btn btn-primary" to="/register">
//                                         Register
//                                     </Link>
//                                 </li>
//                             </>
//                         )}
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

// import React, { useContext, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import AuthContext from "../../context/AuthContext";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import {
//   FaShoppingCart,
//   FaUser,
//   FaHistory,
//   FaSignOutAlt,
//   FaPlusSquare,
// } from "react-icons/fa";
// import "./Navbar.css";

// /**
//  * @description: This component renders a professional and animated navigation bar.
//  * It features interactive hover effects, animated icons, and a modern design
//  * with an interactive glowing effect.
//  */
// const Navbar = () => {
//   const { currentUser, logout } = useContext(AuthContext);
//   const navRef = useRef(null);

//   useEffect(() => {
//     const navElement = navRef.current;
//     if (!navElement) return;

//     const handleMouseMove = (e) => {
//       const rect = navElement.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       navElement.style.setProperty("--x", `${x}px`);
//     };

//     navElement.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       navElement.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   return (
//     <nav
//       ref={navRef}
//       className="navbar navbar-expand-lg navbar-dark-pro shadow-sm animate__fadeInDown fixed-top" // Replaced sticky-top with fixed-top
//     >
//       <div className="navbar-glow"></div>
//       <div className="container-fluid">
//         <Link className="navbar-brand fw-bold brand-link text-font" to="/Home">
//           E-Commerce
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <Link className="nav-link nav-link-pro text-font" to="/products">
//                 Products
//               </Link>
//             </li>
//             {currentUser ? (
//               <>
//                 {currentUser.email === "sanu@gmail.com" && (
//                   <li className="nav-item">
//                     <Link
//                       className="nav-link nav-link-pro d-flex align-items-center text-font"
//                       to="/create-products"
//                     >
//                       <FaPlusSquare className="me-2 icon-pro" /> Add Product
//                     </Link>
//                   </li>
//                 )}
//                 <li className="nav-item">
//                   <Link
//                     className="nav-link nav-link-pro d-flex align-items-center text-font"
//                     to="/carts"
//                   >
//                     <FaShoppingCart className="me-2 icon-pro" /> Cart
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link
//                     className="nav-link nav-link-pro d-flex align-items-center text-font"
//                     to="/order-history"
//                   >
//                     <FaHistory className="me-2 icon-pro" /> Orders
//                   </Link>
//                 </li>
//                 <li className="nav-item dropdown">
//                   <a
//                     className="nav-link nav-link-pro dropdown-toggle d-flex align-items-center text-font"
//                     href="#"
//                     id="navbarDropdown"
//                     role="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                   >
//                     <FaUser className="me-2 icon-pro" /> Hello,{" "}
//                     {currentUser.email}
//                   </a>
//                   <ul
//                     className="dropdown-menu dropdown-menu-end dropdown-menu-pro"
//                     aria-labelledby="navbarDropdown"
//                   >
//                     <li>
//                       <Link
//                         className="dropdown-item dropdown-item-pro text-font"
//                         to="/profile"
//                       >
//                         Profile
//                       </Link>
//                     </li>
//                     <li>
//                       <hr className="dropdown-divider" />
//                     </li>
//                     <li>
//                       <button
//                         className="dropdown-item dropdown-item-pro text-danger text-font"
//                         onClick={logout}
//                       >
//                         <FaSignOutAlt className="me-2 icon-pro" /> Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <Link
//                     className="btn btn-outline-light nav-btn-pro me-2 text-font"
//                     to="/login"
//                   >
//                     Login
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link
//                     className="btn btn-primary nav-btn-pro text-font"
//                     to="/register"
//                   >
//                     Register
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// // This component renders a professional and animated navigation bar.
// // It features interactive hover effects, animated icons, and a modern design
// // with an interactive glowing effect.

// // This line imports React, along with the `useContext`, `useEffect`, and `useRef` hooks.
// // `useContext`: Accesses values from a React Context.
// // `useEffect`: Performs side effects, like adding event listeners, after a component renders.
// // `useRef`: Creates a mutable object that persists for the lifetime of the component, often used to get a reference to a DOM element.
// import React, { useContext, useEffect, useRef } from "react";
// // `Link` is a component from `react-router-dom` used for internal navigation without a full page reload.
// import { Link } from "react-router-dom";
// // Imports the `AuthContext` to access global authentication state.
// import AuthContext from "../../context/AuthContext";
// // These lines import Bootstrap CSS and JavaScript, which provide pre-built styles and functionality for the navbar (like the collapsible menu).
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// // Imports specific icons from the `react-icons` library for use in the navigation links.
// import {
//   FaShoppingCart,
//   FaUser,
//   FaHistory,
//   FaSignOutAlt,
//   FaPlusSquare,
// } from "react-icons/fa";
// // Imports a custom CSS file for specific styling and animations.
// import "./Navbar.css";

// /**
//  * @description: This component renders a professional and animated navigation bar.
//  * It features interactive hover effects, animated icons, and a modern design
//  * with an interactive glowing effect.
//  */
// // This defines the `Navbar` functional component.
// const Navbar = () => {
//   // `useContext` is used to access the `currentUser` object and the `logout` function from the `AuthContext`.
//   const { currentUser, logout } = useContext(AuthContext);
//   // `useRef` is used to create a reference to the `nav` element in the JSX.
//   const navRef = useRef(null);

//   // `useEffect` is used here to add and remove a mousemove event listener.
//   // The empty dependency array `[]` ensures this effect runs only once when the component mounts.
//   useEffect(() => {
//     // Get the current DOM element from the ref.
//     const navElement = navRef.current;
//     // If the element doesn't exist (e.g., during initial render), exit the effect.
//     if (!navElement) return;

//     // This function calculates the mouse position relative to the navbar and sets a CSS variable.
//     // This variable is used in the CSS file to create the glowing effect that follows the cursor.
//     const handleMouseMove = (e) => {
//       // Get the size and position of the navbar element.
//       const rect = navElement.getBoundingClientRect();
//       // Calculate the x-coordinate of the mouse relative to the element.
//       const x = e.clientX - rect.left;
//       // Set the CSS variable `--x` on the navbar element.
//       navElement.style.setProperty("--x", `${x}px`);
//     };

//     // Add the `mousemove` event listener to the navbar element.
//     navElement.addEventListener("mousemove", handleMouseMove);

//     // The return function of `useEffect` is a cleanup function.
//     // It runs when the component unmounts to remove the event listener and prevent memory leaks.
//     return () => {
//       navElement.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   // The `return` statement renders the component's JSX.
//   return (
//     // The main `nav` element. The `ref={navRef}` links this DOM element to the `navRef` created by `useRef`.
//     <nav
//       ref={navRef}
//       // Bootstrap classes for the navbar, plus custom classes for styling and animations.
//       // `fixed-top` positions the navbar at the top of the viewport, so it remains visible when the user scrolls.
//       className="navbar navbar-expand-lg navbar-dark-pro shadow-sm animate__fadeInDown fixed-top"
//     >
//       {/* A `div` for the glowing effect, which is styled using the CSS variable from the `useEffect` hook. */}
//       <div className="navbar-glow"></div>
//       {/* The main container for the navbar content. */}
//       <div className="container-fluid">
//         {/* The brand logo, which is a `Link` that navigates to the home page. */}
//         <Link className="navbar-brand fw-bold brand-link text-font" to="/Home">
//           E-Commerce
//         </Link>
//         {/* The mobile-friendly "toggler" button that collapses the navbar. */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse" // Bootstrap attribute to enable the collapse functionality.
//           data-bs-target="#navbarNav" // Specifies which element to collapse.
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         {/* The collapsible part of the navbar, containing the navigation links. */}
//         <div className="collapse navbar-collapse" id="navbarNav">
//           {/* The list of navigation items. `ms-auto` pushes the items to the right. */}
//           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <Link className="nav-link nav-link-pro text-font" to="/products">
//                 Products
//               </Link>
//             </li>
//             {/* Conditional Rendering: This block checks if a user is logged in (`currentUser`). */}
//             {currentUser ? (
//               // This is a React Fragment `<>` which allows us to group elements without adding an extra node to the DOM.
//               <>
//                 {/* Conditional Rendering for Admin Access: This checks if the logged-in user's email is "sanu@gmail.com". */}
//                 {/* This is a simple form of role-based access control (RBAC). */}
//                 {currentUser.email === "sanu@gmail.com" && (
//                   <li className="nav-item">
//                     <Link
//                       className="nav-link nav-link-pro d-flex align-items-center text-font"
//                       to="/create-products"
//                     >
//                       <FaPlusSquare className="me-2 icon-pro" /> Add Product
//                     </Link>
//                   </li>
//                 )}
//                 {/* Cart link */}
//                 <li className="nav-item">
//                   <Link
//                     className="nav-link nav-link-pro d-flex align-items-center text-font"
//                     to="/carts"
//                   >
//                     <FaShoppingCart className="me-2 icon-pro" /> Cart
//                   </Link>
//                 </li>
//                 {/* Order History link */}
//                 <li className="nav-item">
//                   <Link
//                     className="nav-link nav-link-pro d-flex align-items-center text-font"
//                     to="/order-history"
//                   >
//                     <FaHistory className="me-2 icon-pro" /> Orders
//                   </Link>
//                 </li>
//                 {/* User Dropdown */}
//                 <li className="nav-item dropdown">
//                   {/* The dropdown toggle link. */}
//                   <a
//                     className="nav-link nav-link-pro dropdown-toggle d-flex align-items-center text-font"
//                     href="#"
//                     id="navbarDropdown"
//                     role="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                   >
//                     <FaUser className="me-2 icon-pro" /> Hello,{" "}
//                     {currentUser.email}
//                   </a>
//                   {/* The dropdown menu. */}
//                   <ul
//                     className="dropdown-menu dropdown-menu-end dropdown-menu-pro"
//                     aria-labelledby="navbarDropdown"
//                   >
//                     <li>
//                       <Link
//                         className="dropdown-item dropdown-item-pro text-font"
//                         to="/profile"
//                       >
//                         Profile
//                       </Link>
//                     </li>
//                     <li>
//                       {/* A horizontal divider in the dropdown. */}
//                       <hr className="dropdown-divider" />
//                     </li>
//                     <li>
//                       {/* The Logout button. When clicked, it calls the `logout` function from the `AuthContext`. */}
//                       <button
//                         className="dropdown-item dropdown-item-pro text-danger text-font"
//                         onClick={logout}
//                       >
//                         <FaSignOutAlt className="me-2 icon-pro" /> Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </li>
//               </>
//             ) : (
//               // This block is rendered if no user is logged in.
//               <>
//                 {/* Login button */}
//                 <li className="nav-item">
//                   <Link
//                     className="btn btn-outline-light nav-btn-pro me-2 text-font"
//                     to="/login"
//                   >
//                     Login
//                   </Link>
//                 </li>
//                 {/* Register button */}
//                 <li className="nav-item">
//                   <Link
//                     className="btn btn-primary nav-btn-pro text-font"
//                     to="/register"
//                   >
//                     Register
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// // Exports the `Navbar` component to be used in other parts of the application.
// export default Navbar;


// ================================
// Import Statements
// ================================

// `React` must always be imported when using JSX, 
// because JSX is converted to React.createElement() behind the scenes.
import React, { useContext, useEffect, useRef } from "react"; 
// Here we also import three React hooks:
// - useContext: allows us to use values from React's Context API.
// - useEffect: lets us run side effects (like event listeners or API calls) after rendering.
// - useRef: lets us create a "reference" (like a pointer) to directly access/manipulate DOM elements.

// `Link` is a component from react-router-dom.
// It replaces <a> tags when navigating between routes inside a React app 
// (so the page does NOT reload, only updates the component).
import { Link } from "react-router-dom";

// Importing AuthContext, which is a React Context created separately.
// This stores authentication-related data (like currentUser and logout function)
// so multiple components can access it without prop drilling.
import AuthContext from "../../context/AuthContext";

// Import Bootstrap CSS for ready-made styling (colors, spacing, responsiveness, etc.)
import "bootstrap/dist/css/bootstrap.min.css";
// Import Bootstrap JavaScript (needed for toggling navbar, dropdowns, modals, etc.)
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Importing icons from react-icons library.
// Each icon is a React component that renders an SVG.
import {
  FaShoppingCart,  // Cart icon
  FaUser,          // User/person icon
  FaHistory,       // History/clock icon
  FaSignOutAlt,    // Logout icon
  FaPlusSquare,    // Add (+) icon
} from "react-icons/fa";

// Importing custom CSS file for navbar-specific styles and animations.
import "./Navbar.css";


const email ="sanu1@gmail.com"
// ================================
// Navbar Component
// ================================

// Define a functional component `Navbar`.
// In React, a function that returns JSX is a functional component.
const Navbar = () => {
  // useContext hook:
  // We extract `currentUser` and `logout` from AuthContext.
  // - currentUser stores the logged-in user’s details.
  // - logout is a function that clears authentication and logs the user out.
  const { currentUser, logout } = useContext(AuthContext);

  // useRef hook:
  // Creates a reference object (`navRef`) that points to a DOM element.
  // Initially, navRef.current = null. Later, it will point to the <nav> element.
  const navRef = useRef(null);

  // useEffect hook:
  // Runs after the component is rendered (mounted).
  // Dependency array [] means: run this only once.
  useEffect(() => {
    // Get the DOM element (the <nav>) from navRef.
    const navElement = navRef.current;

    // If navElement does not exist yet (like during initial render), stop here.
    if (!navElement) return;

    // Define an event handler for mouse movement inside navbar.
    const handleMouseMove = (e) => {
      // Get position and size of navbar relative to viewport.
      const rect = navElement.getBoundingClientRect();

      // Calculate x position of mouse inside navbar:
      // e.clientX = mouse x position in viewport.
      // rect.left = navbar’s left boundary.
      // Subtracting gives mouse position relative to navbar only.
      const x = e.clientX - rect.left;

      // Set CSS custom property (--x) on navbar.
      // This value will be used in CSS animations for glow effect.
      navElement.style.setProperty("--x", `${x}px`);
    };

    // Add mousemove event listener to navbar.
    navElement.addEventListener("mousemove", handleMouseMove);

    // Cleanup function:
    // Runs when component unmounts (removed from UI).
    // Removes event listener to prevent memory leaks.
    return () => {
      navElement.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // Empty array → run only once.


  // ================================
  // JSX Render (Return Statement)
  // ================================
  return (
    // <nav> element is the container for the whole navbar.
    // ref={navRef} → connects nav element to navRef for DOM access.
    <nav
      ref={navRef}
      // Bootstrap classes:
      // - navbar: makes it a Bootstrap navbar.
      // - navbar-expand-lg: expands fully on large screens, collapses on small.
      // - navbar-dark-pro: custom dark theme class (from Navbar.css).
      // - shadow-sm: small box-shadow.
      // - animate__fadeInDown: animation effect.
      // - fixed-top: sticks navbar to top of page.
      className="navbar navbar-expand-lg navbar-dark-pro shadow-sm animate__fadeInDown fixed-top"
    >
      {/* Div for glowing effect background (CSS uses --x variable for glow animation). */}
      <div className="navbar-glow"></div>

      {/* Container for navbar content (fluid = full width). */}
      <div className="container-fluid">
        {/* Brand/Logo → navigates to home page ("/Home"). */}
        <Link className="navbar-brand fw-bold brand-link text-font" to="/Home">
          E-Commerce
        </Link>

        {/* Button for mobile toggle (hamburger menu). 
            Appears only on smaller screens. */}
        <button
          className="navbar-toggler"        // Bootstrap toggler button class
          type="button"                     // HTML button type
          data-bs-toggle="collapse"         // Tells Bootstrap: toggles collapse effect
          data-bs-target="#navbarNav"       // Specifies which element collapses/expands
          aria-controls="navbarNav"         // Accessibility: element being controlled
          aria-expanded="false"             // Accessibility: initial collapsed state
          aria-label="Toggle navigation"    // Accessibility: description for screen readers
        >
          {/* Icon inside button (three lines icon). */}
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible menu content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Unordered list of navigation items.
              ms-auto → pushes items to right side of navbar. */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* Always visible Products link */}
            <li className="nav-item">
              <Link className="nav-link nav-link-pro text-font" to="/products">
                Products
              </Link>
            </li>

            {/* Conditional Rendering: 
                If user is logged in (currentUser exists), show logged-in menu. 
                Else, show login/register buttons. */}
            {currentUser ? (
              <>
                {/* Check if current user is admin (email === "sanu@gmail.com").
                    If yes, show "Add Product" link. */}
                {currentUser.email === email && (
                  <li className="nav-item">
                    <Link
                      className="nav-link nav-link-pro d-flex align-items-center text-font"
                      to="/create-products"
                    >
                      <FaPlusSquare className="me-2 icon-pro" /> Add Product
                    </Link>
                  </li>
                )}

                {/* Cart link */}
                <li className="nav-item">
                  <Link
                    className="nav-link nav-link-pro d-flex align-items-center text-font"
                    to="/carts"
                  >
                    <FaShoppingCart className="me-2 icon-pro" /> Cart
                  </Link>
                </li>

                {/* Order history link */}
                <li className="nav-item">
                  <Link
                    className="nav-link nav-link-pro d-flex align-items-center text-font"
                    to="/order-history"
                  >
                    <FaHistory className="me-2 icon-pro" /> Orders
                  </Link>
                </li>

                {/* User dropdown menu */}
                <li className="nav-item dropdown">
                  {/* Dropdown toggle link (click to expand). */}
                  <a
                    className="nav-link nav-link-pro dropdown-toggle d-flex align-items-center text-font"
                    href="#"                // Dummy link (required for dropdown)
                    id="navbarDropdown"     // ID to match aria-labelledby
                    role="button"           // Role for accessibility
                    data-bs-toggle="dropdown" // Bootstrap JS makes it dropdown
                    aria-expanded="false"   // Default collapsed
                  >
                    <FaUser className="me-2 icon-pro" /> Hello,{" "}
                    {currentUser.email}   {/* Shows user’s email */}
                  </a>

                  {/* Dropdown menu items */}
                  <ul
                    className="dropdown-menu dropdown-menu-end dropdown-menu-pro"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      {/* Profile link */}
                      <Link
                        className="dropdown-item dropdown-item-pro text-font"
                        to="/profile"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      {/* Divider line inside dropdown */}
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      {/* Logout button */}
                      <button
                        className="dropdown-item dropdown-item-pro text-danger text-font"
                        onClick={logout}   // Calls logout function from AuthContext
                      >
                        <FaSignOutAlt className="me-2 icon-pro" /> Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              // If user not logged in → show Login and Register buttons.
              <>
                <li className="nav-item">
                  <Link
                    className="btn btn-outline-light nav-btn-pro me-2 text-font"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="btn btn-primary nav-btn-pro text-font"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Export Navbar component so it can be imported in other files.
export default Navbar;
