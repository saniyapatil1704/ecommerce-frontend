// import React, { useState } from 'react';

// // This component represents the Register page of our application.
// // It receives `setView` to navigate to other pages and `setIsLoggedIn` to manage authentication state.
// const RegisterPage = ({ setView, setIsLoggedIn }) => {
//   // Use React state to manage the form inputs.
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   /**
//    * @description: Handles the form submission for user registration.
//    * @param {object} e - The event object from the form submission.
//    */
//   const handleRegister = (e) => {
//     e.preventDefault();
//     // For now, we'll just log the data and simulate a successful login after registration.
//     console.log('Registration attempt with:', { email, password, confirmPassword });
    
//     // This function call is what will change the view to the Home Page.
//     // In a real application, you would make an API call here.
//     setIsLoggedIn(true);
//   };

//   return (
//     // Use Bootstrap classes for a responsive, centered container.
//     <div className="container d-flex justify-content-center align-items-center min-vh-100">
//       {/* Create a card for the form with a shadow and padding. */}
//       <div className="card shadow-lg p-4 rounded-3" style={{ maxWidth: '400px', width: '100%' }}>
//         <h2 className="card-title text-center mb-4">Register</h2>
//         <form onSubmit={handleRegister}>
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
//           <div className="mb-3">
//             <label htmlFor="confirmPasswordInput" className="form-label">Confirm Password</label>
//             <input
//               type="password"
//               className="form-control rounded-pill"
//               id="confirmPasswordInput"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="d-grid gap-2">
//             <button type="submit" className="btn btn-success rounded-pill">Register</button>
//           </div>
//         </form>
//         <p className="text-center mt-3">
//           Already have an account? <a href="#" onClick={() => setView('login')}>Login here</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;




// src/pages/RegisterPage.jsx
// This component provides a form for a new user to register a new account.
// It uses standard HTML tags with Bootstrap classes for a consistent UI.

// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AuthContext from '../context/AuthContext';

// // Why we use `useContext`:
// // The `useContext` hook allows us to access the value provided by the nearest
// // `AuthContext.Provider` parent component in the tree. This is how we
// // get access to the `registerUser` function from our authentication context.
// const RegisterPage = () => {
//   // Why we use `useState`:
//   // We use the `useState` hook to manage the form's input state for email and password,
//   // as well as any loading or error states.
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // We get the `registerUser` function from our AuthContext.
//   const { register } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // Why we use an asynchronous function for `handleSubmit`:
//   // The registration process involves a network request to the backend, which is an
//   // asynchronous operation. Using `async/await` makes the code more readable and
//   // helps us handle the sequence of events (sending the request, waiting for a response).
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       // Call the `register` function from the AuthContext.
//       await register(email, password);

//       // If registration is successful, we redirect the user to the login page.
//       navigate('/login');
//     } catch (err) {
//       // If an error occurs, we set the error state to display a message to the user.
//       console.error(err);
//       // We check for a specific error message to provide better feedback to the user.
//       const errorMessage = err.message === 'Email already in use.'
//         ? 'This email is already in use. Please try a different one.'
//         : 'Failed to register. Please try again later.';
//       setError(errorMessage);
//     } finally {
//       // The `finally` block ensures that the loading state is reset, regardless of
//       // whether the registration was successful or not.
//       setLoading(false);
//     }
//   };

//   return (
//     // We use standard HTML tags with Bootstrap classes for styling to maintain
//     // consistency across our components.
//     <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
//       <div className="card p-4 shadow-sm" style={{ width: '25rem' }}>
//         <h2 className="text-center mb-4">Register</h2>
//         {/* We use conditional rendering to show an error message if the `error` state is not null. */}
//         {error && <div className="alert alert-danger">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="formBasicEmail" className="form-label">Email address</label>
//             <input
//               type="email"
//               className="form-control"
//               id="formBasicEmail"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="formBasicPassword" className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="formBasicPassword"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//             {loading ? 'Registering...' : 'Register'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;





// This component provides a form for a new user to register a new account.
// It uses standard HTML tags with Bootstrap classes for a consistent UI.

// This line imports the `React`, `useState`, and `useContext` hooks from the React library.
// `useState` is used for managing component state, and `useContext` is for accessing context values.
import React, { useState, useContext } from 'react';

// This line imports the `useNavigate` hook from `react-router-dom`.
// This hook is used to programmatically navigate to different routes in your application.
import { useNavigate } from 'react-router-dom';

// This line imports the `AuthContext` object from the authentication context file.
// The context provides a way to share authentication state and functions across the component tree without prop drilling.
import AuthContext from '../context/AuthContext';

// Why we use `useContext`:
// The `useContext` hook allows us to access the value provided by the nearest
// `AuthContext.Provider` parent component in the tree. This is how we
// get access to the `registerUser` function from our authentication context.
// This defines the `RegisterPage` functional component.
const RegisterPage = () => {
    // Why we use `useState`:
    // We use the `useState` hook to manage the form's input state for email and password,
    // as well as any loading or error states.
    // This line initializes the `email` state variable with an empty string and provides the `setEmail` function to update it.
    const [email, setEmail] = useState('');
    // This line initializes the `password` state variable and its updater function.
    const [password, setPassword] = useState('');
    // This line initializes the `error` state, which will store any registration error messages.
    const [error, setError] = useState(null);
    // This line initializes the `loading` state, which tracks whether the registration process is in progress.
    const [loading, setLoading] = useState(false);

    // This line uses the `useContext` hook to get the `register` function from `AuthContext`.
    // We're destructuring `{ register }` from the value provided by the context.
    const { register } = useContext(AuthContext);
    // This line initializes the `Maps` function, which we'll use to redirect the user after a successful registration.
    const navigate = useNavigate();

    // Why we use an asynchronous function for `handleSubmit`:
    // The registration process involves a network request to the backend, which is an
    // asynchronous operation. Using `async/await` makes the code more readable and
    // helps us handle the sequence of events (sending the request, waiting for a response).
    // This asynchronous function is called when the form is submitted.
    const handleSubmit = async (e) => {
        // `e.preventDefault()` prevents the default form submission behavior, which would cause a page reload.
        e.preventDefault();
        // Set the `loading` state to `true` to indicate that the registration process has started.
        // This can be used to show a loading spinner or disable the submit button.
        setLoading(true);
        // Clear any previous error messages before attempting a new registration.
        setError(null);

        // A `try...catch` block is used to handle success and failure of the asynchronous operation.
        try {
            // Call the `register` function from the AuthContext.
            // The `await` keyword pauses the execution until the `register` promise is resolved.
            await register(email, password);

            // If the `register` call is successful, this line uses `Maps` to redirect the user to the `/login` route.
            navigate('/login');
        } catch (err) {
            // If an error occurs during registration, this `catch` block is executed.
            // Log the error to the console for debugging purposes.
            console.error(err);
            // We check for a specific error message to provide better feedback to the user.
            // The `?` operator is a ternary operator, which is a shorthand for an `if...else` statement.
            const errorMessage = err.message === 'Email already in use.'
                ? 'This email is already in use. Please try a different one.'
                : 'Failed to register. Please try again later.';
            // Set the `error` state with the appropriate message, which will be displayed to the user.
            setError(errorMessage);
        } finally {
            // The `finally` block ensures that the loading state is reset, regardless of
            // whether the registration was successful or not.
            // This is a crucial step to enable the submit button again.
            setLoading(false);
        }
    };

    // The `return` statement renders the component's JSX (React's syntax for HTML-like code).
    return (
        // We use standard HTML tags with Bootstrap classes for styling to maintain
        // consistency across our components.
        // This is the main container `div` with Bootstrap classes for centering content.
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            // This `div` acts as a card with padding, a shadow, and a fixed width.
            <div className="card p-4 shadow-sm" style={{ width: '25rem' }}>
                // A heading for the form.
                <h2 className="text-center mb-4">Register</h2>
                // We use conditional rendering to show an error message if the `error` state is not null.
                // If `error` is a truthy value, the `div` with the alert will be rendered.
                {error && <div className="alert alert-danger">{error}</div>}
                // The `form` element with an `onSubmit` event handler that calls `handleSubmit`.
                <form onSubmit={handleSubmit}>
                    // A `div` for the email input group.
                    <div className="mb-3">
                        // A `label` for the email input. `htmlFor` links it to the input field's `id`.
                        <label htmlFor="formBasicEmail" className="form-label">Email address</label>
                        // The email input field.
                        <input
                            type="email"
                            className="form-control"
                            id="formBasicEmail"
                            placeholder="Enter email"
                            // `value={email}` binds the input's value to the `email` state.
                            value={email}
                            // `onChange` updates the `email` state whenever the user types.
                            onChange={(e) => setEmail(e.target.value)}
                            // `required` is an HTML attribute that makes the field mandatory.
                            required
                        />
                    </div>

                    // A `div` for the password input group.
                    <div className="mb-3">
                        // A `label` for the password input.
                        <label htmlFor="formBasicPassword" className="form-label">Password</label>
                        // The password input field.
                        <input
                            type="password"
                            className="form-control"
                            id="formBasicPassword"
                            placeholder="Password"
                            // `value={password}` binds the input's value to the `password` state.
                            value={password}
                            // `onChange` updates the `password` state whenever the user types.
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    // The submit button.
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        // The `disabled` attribute is set to `true` if `loading` is `true`,
                        // preventing multiple submissions while a request is in progress.
                        disabled={loading}
                    >
                        // This uses a ternary operator to conditionally change the button's text
                        // based on the `loading` state.
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// This line exports the `RegisterPage` component so it can be used in other files, like a router.
export default RegisterPage;