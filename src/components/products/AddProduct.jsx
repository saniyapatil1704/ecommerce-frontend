// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import productService from '../../services/productService';
// import AuthContext from '../../context/AuthContext';
// import { useContext } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// /**
//  * @description: A page component for adding a new product.
//  * It provides a form for users to input product details and handles the submission.
//  */
// const AddProductPage = () => {
//   // We use the useNavigate hook to programmatically navigate to other pages.
//   const navigate = useNavigate();

//   // We use the useAuth hook to get the current user's authentication status and information.
//   const { currentUser } = useContext(AuthContext);

//   // We use the useState hook to manage the form data. This is a standard
//   // way to handle form inputs in React.
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     imageUrl: '',
//     stock: ''
//   });

//   // We use state to manage UI feedback, such as success or error messages.
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   /**
//    * @description: Handles changes to the form input fields.
//    * We update the formData state with the new value of the input field.
//    * @param {object} e - The event object from the input field.
//    */
//   const handleChange = (e) => {
//     // Destructure the name and value from the event target.
//     const { name, value } = e.target;
//     // We use the spread operator to keep all existing form data and
//     // only update the field that changed.
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   /**
//    * @description: Handles the form submission.
//    * It prevents the default form behavior and calls the createProduct service.
//    * @param {object} e - The event object from the form submission.
//    */
//   const handleSubmit = async (e) => {
//     // Prevents the page from reloading.
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       // We call the createProduct service from our product.service.js file.
//       // This is a crucial step for separating UI from business logic.
//       const newProduct = await productService.createProduct(formData, currentUser.token);

//       // If the product is created successfully, we display a success message
//       // and redirect the user to the products page.
//       if (newProduct) {
//         setMessage('Product created successfully!');
//         // We navigate to the /products route after a 2-second delay.
//         setTimeout(() => {
//           navigate('/products');
//         }, 2000);
//       }
//     } catch (error) {
//       // If an error occurs, we display an error message to the user.
//       const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
//       setMessage(`Error: ${errorMessage}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card shadow-sm">
//             <div className="card-body">
//               <h2 className="card-title text-center mb-4">Add New Product</h2>
//               <form onSubmit={handleSubmit}>
//                 {/* Product Name Input */}
//                 <div className="mb-3">
//                   <label htmlFor="name" className="form-label">Product Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Product Description Input */}
//                 <div className="mb-3">
//                   <label htmlFor="description" className="form-label">Description</label>
//                   <textarea
//                     className="form-control"
//                     id="description"
//                     name="description"
//                     rows="3"
//                     value={formData.description}
//                     onChange={handleChange}
//                     required
//                   ></textarea>
//                 </div>

//                 {/* Product Price Input */}
//                 <div className="mb-3">
//                   <label htmlFor="price" className="form-label">Price</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="price"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Product Image URL Input */}
//                 <div className="mb-3">
//                   <label htmlFor="imageUrl" className="form-label">Image URL</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="imageUrl"
//                     name="imageUrl"
//                     value={formData.imageUrl}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 {/* Product Stock Input */}
//                 <div className="mb-3">
//                   <label htmlFor="stock" className="form-label">Stock</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="stock"
//                     name="stock"
//                     value={formData.stock}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//                   {loading ? 'Adding...' : 'Add Product'}
//                 </button>
//               </form>

//               {/* Message Display */}
//               {message && (
//                 <div className={`alert ${message.startsWith('Error') ? 'alert-danger' : 'alert-success'} mt-3 text-center`} role="alert">
//                   {message}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProductPage;

// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import productService from "../../services/productService";
// import AuthContext from "../../context/AuthContext";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../styles/AddProductPage.css"; // Keep custom CSS for styling details

// const AddProductPage = () => {
//   const navigate = useNavigate();
//   const { currentUser } = useContext(AuthContext);

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     imageUrl: "",
//     stock: "",
//   });

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const newProduct = await productService.createProduct(
//         formData,
//         currentUser.token
//       );

//       if (newProduct) {
//         setMessage("Product created successfully!");
//         setTimeout(() => {
//           navigate("/products");
//         }, 2000);
//       }
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || "An unexpected error occurred.";
//       setMessage(`Error: ${errorMessage}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="add-product-page ">
//       <div className="container	 mt-3">
//         <div className="row justify-content-center">
//           <div className="col-md-8">
//             {" "}
//             {/* Adjusted column size for a wider card */}
//             <div className="card shadow-lg product-form-card">
//               <div className="card-body">
//                 <h2 className="card-title text-center mb-4 product-form-title">
//                   Add New Product 🛍️
//                 </h2>
//                 <form onSubmit={handleSubmit} className="product-form">
//                   <div className="row">
//                     {/* Product Name Input */}
//                     <div className="col-md-6 mb-3 form-group">
//                       <label htmlFor="name" className="form-label">
//                         Product Name
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     {/* Product Price Input */}
//                     <div className="col-md-6 mb-3 form-group">
//                       <label htmlFor="price" className="form-label">
//                         Price
//                       </label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         id="price"
//                         name="price"
//                         value={formData.price}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Product Description Input (full width) */}
//                   <div className="mb-3 form-group">
//                     <label htmlFor="description" className="form-label">
//                       Description
//                     </label>
//                     <textarea
//                       className="form-control"
//                       id="description"
//                       name="description"
//                       rows="3"
//                       value={formData.description}
//                       onChange={handleChange}
//                       required
//                     ></textarea>
//                   </div>

//                   <div className="row">
//                     {/* Product Image URL Input */}
//                     <div className="col-md-6 mb-3 form-group">
//                       <label htmlFor="imageUrl" className="form-label">
//                         Image URL
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="imageUrl"
//                         name="imageUrl"
//                         value={formData.imageUrl}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     {/* Product Stock Input */}
//                     <div className="col-md-6 mb-3 form-group">
//                       <label htmlFor="stock" className="form-label">
//                         Stock
//                       </label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         id="stock"
//                         name="stock"
//                         value={formData.stock}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Submit Button */}
//                   <button
//                     type="submit"
//                     className="btn btn-primary w-100 btn-add-product"
//                     disabled={loading}
//                   >
//                     {loading ? "Adding..." : "Add Product"}
//                   </button>
//                 </form>

//                 {/* Message Display */}
//                 {message && (
//                   <div
//                     className={`alert ${
//                       message.startsWith("Error")
//                         ? "alert-danger"
//                         : "alert-success"
//                     } mt-3 text-center`}
//                     role="alert"
//                   >
//                     {message}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProductPage;




// This line imports the main React library, along with the `useState` and `useContext` hooks.
// `useState` is used to manage component-specific data (state).
// `useContext` is used to access data from a React Context.
import React, { useState, useContext } from "react";
// This line imports the `useNavigate` hook from `react-router-dom`,
// which allows us to navigate programmatically to different routes.
import { useNavigate } from "react-router-dom";
// This line imports the `productService` object, which contains the functions
// for making API calls related to products.
import productService from "../../services/productService";
// This line imports the `AuthContext` to access user authentication data.
import AuthContext from "../../context/AuthContext";
// These lines import CSS files for styling, using Bootstrap for a consistent look
// and a custom CSS file for specific styling details.
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/AddProductPage.css"; // Keep custom CSS for styling details

// This is the functional component for adding a new product.
const AddProduct = () => {
  // `useNavigate` is initialized here to get the navigation function.
  const navigate = useNavigate();
  // `useContext` is used to get the `currentUser` object from `AuthContext`.
  // The `currentUser` object contains user details and the authentication token.
  const { currentUser } = useContext(AuthContext);

  // This `useState` hook manages the form data.
  // The state is an object with keys for each form input field.
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    stock: "",
  });

  // This `useState` hook manages the message to be displayed to the user
  // after an action (success or error).
  const [message, setMessage] = useState("");
  // This `useState` hook manages the loading state, which is used to
  // disable the submit button and show a loading indicator.
  const [loading, setLoading] = useState(false);

  // This function handles changes to any of the form input fields.
  const handleChange = (e) => {
    // Destructure `name` and `value` from the event target (`e.target`).
    // `name` corresponds to the `name` attribute of the input, and `value` is its current value.
    const { name, value } = e.target;
    // Update the `formData` state.
    setFormData({
      // The spread operator (`...`) copies all existing key-value pairs from `formData`.
      ...formData,
      // Computed property name `[name]: value` updates the specific field
      // that was changed, without affecting others.
      [name]: value,
    });
  };

  // This asynchronous function handles the form submission.
  const handleSubmit = async (e) => {
    // `e.preventDefault()` stops the default browser behavior of refreshing the page on form submission.
    e.preventDefault();
    // Set `loading` to `true` to start the loading state.
    setLoading(true);
    // Clear any previous messages.
    setMessage("");

    // A `try...catch` block is used to handle success and failure of the API call.
    try {
      // Call the `createProduct` function from the `productService`.
      // We pass the `formData` and the user's `token` for authentication.
      const newProduct = await productService.createProduct(
        formData,
        currentUser.token
      );

      // If `newProduct` is a truthy value, it means the product was created successfully.
      if (newProduct) {
        // Set a success message.
        setMessage("Product created successfully!");
        // `setTimeout` is used to wait 2 seconds before navigating.
        setTimeout(() => {
          // The `Maps` function redirects the user to the `/products` route.
          navigate("/products");
        }, 2000);
      }
    } catch (error) {
      // If an error occurs, this block is executed.
      // We try to get a specific error message from the Axios response
      // (`error.response?.data?.message`), or use a generic one if it's not available.
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      // Set the error message to be displayed.
      setMessage(`Error: ${errorMessage}`);
    } finally {
      // The `finally` block runs after either the `try` or `catch` block.
      // It ensures that `loading` is set to `false`, regardless of the outcome.
      setLoading(false);
    }
  };

  // The `return` statement renders the component's JSX.
  return (
    // The main container div for the page, with a custom class for styling.
    <div className="add-product-page ">
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {" "}
            {/* Adjusted column size for a wider card */}
            {/* A card component with a shadow and custom class for styling. */}
            <div className="card shadow-lg product-form-card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4 product-form-title">
                  Add New Product 🛍️
                </h2>
                {/* The form element with an `onSubmit` event handler. */}
                <form onSubmit={handleSubmit} className="product-form">
                  <div className="row">
                    {/* Product Name Input */}
                    <div className="col-md-6 mb-3 form-group">
                      <label htmlFor="name" className="form-label">
                        Product Name
                      </label>
                      {/* The input field. `value` and `onChange` bind it to the state. */}
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Product Price Input */}
                    <div className="col-md-6 mb-3 form-group">
                      <label htmlFor="price" className="form-label">
                        Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Product Description Input (full width) */}
                  <div className="mb-3 form-group">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="row">
                    {/* Product Image URL Input */}
                    <div className="col-md-6 mb-3 form-group">
                      <label htmlFor="imageUrl" className="form-label">
                        Image URL
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Product Stock Input */}
                    <div className="col-md-6 mb-3 form-group">
                      <label htmlFor="stock" className="form-label">
                        Stock
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="stock"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-50 btn-add-product"
                    // The `disabled` attribute prevents users from submitting the form while the request is in progress.
                    disabled={loading}
                  >
                    {/* The button text changes based on the `loading` state. */}
                    {loading ? "Adding..." : "Add Product"}
                  </button>
                </form>

                {/* Message Display */}
                {/* This uses conditional rendering to display the message only if it's not empty. */}
                {message && (
                  <div
                    // The alert class is dynamically set based on whether the message starts with "Error".
                    className={`alert ${
                      message.startsWith("Error")
                        ? "alert-danger"
                        : "alert-success"
                    } mt-3 text-center`}
                    role="alert"
                  >
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the component for use in other parts of the application.
export default AddProduct;