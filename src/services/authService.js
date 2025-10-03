// // src/services/auth.service.js
// // This service is responsible for all authentication-related API calls.
// // By centralizing these functions, we keep our components focused on the UI.

// // We will use the native Fetch API for simplicity. For more advanced features, you could
// // use a library like Axios.
// const API_ACTUAL_USERS_URL = "http://localhost:3000/api/users"; // Adjust this URL to your backend server.

// /**
//  * @description: Registers a new user with the backend API.
//  * @param {string} email - The user's email address.
//  * @param {string} password - The user's password.
//  * @returns {object} The response data from the API.
//  */
// const register = async (email, password) => {
//   try {
//     const response = await fetch(`${API_ACTUAL_USERS_URL}/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();
//     if (!response.ok) {
//       // If the response is not OK (e.g., 400, 409, 500), throw an error
//       // with the message from the backend.
//       throw new Error(data.message || "Registration failed.");
//     }

//     return data; // Return the success message and user data.
//   } catch (error) {
//     // Log the error for debugging and re-throw it to be handled by the component.
//     console.error("Error in auth.service.register:", error);
//     throw error;
//   }
// };

// /**
//  * @description: Logs in a user and stores the token in local storage.
//  * @param {string} email - The user's email address.
//  * @param {string} password - The user's password.
//  * @returns {object} The user and token data.
//  */
// const login = async (email, password) => {
//   try {
//     const response = await fetch(`${API_ACTUAL_USERS_URL}/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });


//     const data = await response.json();
//         console.log("Step 1: Login API Response Data:", data);
// if (!response.ok) {
//       throw new Error(data.message || "Login failed.");
//     }

//   // Now, correctly extract the token and user data from the nested 'user' object
// // Correctly get the user object and then the token from it.
//     // The `user` object from the API response is now in its own variable.
//     const { user } = data;
//     const { token: accessToken } = user;
//         if (!accessToken || !user) {
//       throw new Error("Login failed: Missing token or user data in response.");
//     }

//     // Store the token and user data for persistence across page refreshes.
//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("user", JSON.stringify(user));
    
//     return user; // Return the user data.
//     // Why we store the token:
//     // We store the token in local storage so that the user remains logged in
//     // even if they refresh the page. This token is a key piece of information
//     // that allows us to authenticate future requests to protected routes.
//     // if (data.user && data.user.token) {
//     //   localStorage.setItem("user", JSON.stringify(data.user));
//     // }

//     // return data.user; // Return user data including the token.
//   } catch (error) {
//     console.error("Error in auth.service.login:", error);
//     throw error;
//   }
// };

// /**
//  * @description: Logs out the user by removing their data from local storage.
//  * @returns {void}
//  */
// const logout = () => {
//   // Why we use localStorage.removeItem:
//   // When the user logs out, we need to completely remove the token and user
//   // data from the browser's storage to prevent unauthorized access.
//   localStorage.removeItem("user");
//   localStorage.removeItem("accessToken");
// };

// /**
//  * @description Fetches the authenticated user's profile information from the backend.
//  * @param {string} token - The user's authentication token.
//  * @returns {Promise<object>} A promise that resolves to the user's profile.
//  */
// const getProfile = async (token) => {
//   try {
//     const response = await fetch(`${API_ACTUAL_USERS_URL}/profile`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Failed to fetch profile.");
//     }
//     const data = await response.json();
//     return data.profile;
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     throw error;
//   }
// };

// /**
//  * @description Fetches the authenticated user's profile information from the backend.
//  * @param {string} token - The user's authentication token.
//  * @returns {Promise<object>} A promise that resolves to the user's profile.
//  */
// const updateProfile = async (formData, token) => {
//   try {
//     const response = await fetch(`${API_ACTUAL_USERS_URL}/profile`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Failed to fetch profile.");
//     }
//     const data = await response.json();
//     return data.profile;
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     throw error;
//   }
// };

// // We will add more functions later if needed, such as for fetching profile.
// const authService = {
//   register,
//   login,
//   logout,
//   getProfile,
//   updateProfile,
// };

// export default authService;



// This service is responsible for all authentication-related API calls.
// By centralizing these functions, we keep our components focused on the UI.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// This line defines the base URL for the backend API endpoints.
// It's a constant variable that makes the code easier to maintain, as you only have to change the URL in one place.
const API_ACTUAL_USERS_URL = `${API_BASE_URL}/users`;

// This is an asynchronous function that handles user registration.
// It takes `email` and `password` as input.
/**
 * @description: Registers a new user with the backend API.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {object} The response data from the API.
 */
const register = async (email, password) => {
  // A `try...catch` block is used to handle success and failure of the API call.
  try {
    // `fetch()` is a built-in browser API used to make network requests.
    // It's called with the full registration URL and an options object.
    const response = await fetch(`${API_ACTUAL_USERS_URL}/register`, {
      // `method: "POST"` specifies that this is a POST request, used for creating a new resource (a new user).
      method: "POST",
      // `headers` contains metadata about the request.
      headers: {
        // `"Content-Type": "application/json"` tells the server that the request body is a JSON object.
        "Content-Type": "application/json",
      },
      // `body` contains the data sent to the server.
      // `JSON.stringify()` converts the JavaScript object `{ email, password }` into a JSON string.
      body: JSON.stringify({ email, password }),
    });

    // `response.json()` parses the JSON response body from the server. It's an asynchronous operation.
    const data = await response.json();
    // `response.ok` is a boolean property that is `true` if the HTTP status code is in the 200-299 range.
    // If it's not `ok`, it means the request failed (e.g., 400 Bad Request, 409 Conflict, 500 Internal Server Error).
    if (!response.ok) {
      // If the response is not OK, we throw a new `Error`.
      // The error message is taken from the backend response (`data.message`) or a default message is used.
      throw new Error(data.message || "Registration failed.");
    }

    // If the registration is successful, the function returns the data from the API.
    return data;
  } catch (error) {
    // If a network error or the `throw new Error` happens, this `catch` block runs.
    // The error is logged to the console for debugging.
    console.error("Error in auth.service.register:", error);
    // The error is re-thrown so the calling component can handle it and update its state (e.g., show an error message).
    throw error;
  }
};

// This asynchronous function handles user login. It's similar to `register`.
/**
 * @description: Logs in a user and stores the token in local storage.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {object} The user and token data.
 */
const login = async (email, password) => {
  try {
    // Make a `POST` request to the `/login` endpoint with the user's credentials.
    const response = await fetch(`${API_ACTUAL_USERS_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Parse the JSON response.
    const data = await response.json();
    // Log the response data for debugging.
    console.log("Step 1: Login API Response Data:", data);
    // Check if the response was successful.
    if (!response.ok) {
      throw new Error(data.message || "Login failed.");
    }

    // Now, correctly extract the token and user data from the nested 'user' object
    // Destructure the `user` object from the `data` response.
    const { user } = data;
    // Destructure the `token` from the `user` object and rename it to `accessToken`.
    const { token: accessToken } = user;
    // Check if the token or user object is missing, which indicates a login failure.
    if (!accessToken || !user) {
      throw new Error("Login failed: Missing token or user data in response.");
    }

    // Store the token and user data for persistence across page refreshes.
    // `localStorage.setItem` stores key-value pairs in the browser's local storage.
    // We store the `accessToken` directly.
    localStorage.setItem("accessToken", accessToken);
    // We store the `user` object after converting it to a JSON string using `JSON.stringify()`.
    localStorage.setItem("user", JSON.stringify(user));

    // Return the user data to the component.
    return user;
    // Why we store the token:
    // We store the token in local storage so that the user remains logged in
    // even if they refresh the page. This token is a key piece of information
    // that allows us to authenticate future requests to protected routes.
  } catch (error) {
    // Handle errors by logging and re-throwing them.
    console.error("Error in auth.service.login:", error);
    throw error;
  }
};

// This function handles user logout. It's a synchronous operation.
/**
 * @description: Logs out the user by removing their data from local storage.
 * @returns {void}
 */
const logout = () => {
  // `localStorage.removeItem()` removes a specific item from local storage by its key.
  // This is how we log the user out: by deleting their authentication data.
  // Why we use localStorage.removeItem:
  // When the user logs out, we need to completely remove the token and user
  // data from the browser's storage to prevent unauthorized access.
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
};

// This asynchronous function fetches the user's profile information.
/**
 * @description Fetches the authenticated user's profile information from the backend.
 * @param {string} token - The user's authentication token.
 * @returns {Promise<object>} A promise that resolves to the user's profile.
 */
const getProfile = async (token) => {
  try {
    // Make a `GET` request to the `/profile` endpoint.
    const response = await fetch(`${API_ACTUAL_USERS_URL}/profile`, {
      method: "GET",
      headers: {
        // `Authorization` header is crucial for authenticating the request.
        // The value is a string in the format `Bearer <token>`. This is a common pattern for JWT authentication.
        Authorization: `Bearer ${token}`,
      },
    });
    // Check if the response was successful.
    if (!response.ok) {
      // If not successful, parse the error data from the response.
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch profile.");
    }
    // Parse the successful response data.
    const data = await response.json();
    // Return the user's profile, which is expected to be in `data.profile`.
    return data.profile;
  } catch (error) {
    // Handle errors by logging and re-throwing them.
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// This asynchronous function updates the user's profile.
/**
 * @description Fetches the authenticated user's profile information from the backend.
 * @param {string} token - The user's authentication token.
 * @returns {Promise<object>} A promise that resolves to the user's profile.
 */
const updateProfile = async (formData, token) => {
  try {
    // Make a `PUT` request to the `/profile` endpoint. `PUT` is used for updating a resource.
    const response = await fetch(`${API_ACTUAL_USERS_URL}/profile`, {
      method: "PUT",
      headers: {
        // Include the Authorization and Content-Type headers.
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // The request body contains the updated profile data.
      body: JSON.stringify(formData),
    });
    // Check for a successful response.
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch profile.");
    }
    // Parse the successful response data.
    const data = await response.json();
    // Return the updated profile data.
    return data.profile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// This object bundles all the authentication functions together.
const authService = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
};

// This line exports the `authService` object, making these functions available to other parts of the application.
export default authService;