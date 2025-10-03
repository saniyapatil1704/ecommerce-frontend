// import React, { useState } from 'react';

// // This component represents the Login page of our application.
// // It receives `setView` to navigate to other pages and `setIsLoggedIn` to manage authentication state.
// const LoginPage = ({ setView, setIsLoggedIn }) => {
//   // Use React state to manage the email and password inputs.
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   /**
//    * @description: Handles the form submission for logging in.
//    * @param {object} e - The event object from the form submission.
//    */
//   const handleLogin = (e) => {
//     e.preventDefault();
//     // For now, we'll just log the data and simulate a successful login.
//     console.log('Login attempt with:', { email, password });
//     // This function call is what will change the view to the Home Page.
//     setIsLoggedIn(true);
//   };

//   return (
//     // Use Bootstrap classes for a responsive, centered container.
//     <div className="container d-flex justify-content-center align-items-center min-vh-100">
//       {/* Create a card for the form with a shadow and padding. */}
//       <div className="card shadow-lg p-4 rounded-3" style={{ maxWidth: '400px', width: '100%' }}>
//         <h2 className="card-title text-center mb-4">Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-3">
//             <label htmlFor="emailInput" className="form-label">Email address</label>
//             <input
//               type="email"
//               className="form-control rounded-pill"
//               id="emailInput"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="passwordInput" className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control rounded-pill"
//               id="passwordInput"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="d-grid gap-2">
//             <button type="submit" className="btn btn-primary rounded-pill">Login</button>
//           </div>
//         </form>
//         <p className="text-center mt-3">
//           Don't have an account? <a href="#" onClick={() => setView('register')}>Register here</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock, FaSignInAlt, FaSpinner } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import '../styles/LoginPage.css'; // Custom styles for a modern, animated look.

/**
 * @description This component provides a professional, animated, and
 * innovative login page UI. It maintains the original authentication logic
 * while enhancing the user experience with modern design principles.
 */
const LoginPage = () => {
  // State management for form inputs, errors, and loading status.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Accessing the login function from the authentication context.
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  /**
   * @description Handles the form submission for user authentication.
   * It's an async function to manage the network request to the backend.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError('Failed to log in. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container d-flex flex-column justify-content-center align-items-center vh-100 position-relative text-white overflow-hidden">
      {/* Dynamic Floating Shapes Background */}
      <div className="animated-shapes"></div>
      
      {/* Login Card - A minimalist, interactive panel */}
      <div className="login-panel p-5 rounded-4 shadow-lg animate__fadeInUp">
        
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-1 text-primary">Login</h2>
          <p className="text-muted">Welcome back to your account</p>
        </div>

        {/* Error message display */}
        {error && (
          <div className="alert alert-danger animate__shake" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Input Field */}
          <div className="form-group mb-4">
            <div className="input-group input-group-lg">
              <span className="input-group-text"><FaUser /></span>
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input Field */}
          <div className="form-group mb-4">
            <div className="input-group input-group-lg">
              <span className="input-group-text"><FaLock /></span>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit Button with Loading State */}
          <div className="d-grid mt-4">
            <button 
              type="submit" 
              className="btn btn-primary btn-lg rounded-pill fw-bold login-btn" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="spinner me-2" />
                  <span className="ms-2">Logging in...</span>
                </>
              ) : (
                <>
                  <FaSignInAlt className="me-2" />
                  <span>Login</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;