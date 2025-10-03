import React, { useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import authService from "../services/authService";

/**
 * @description Renders the user profile page, allowing a logged-in user to
 * view and update their profile information.
 */
const ProfilePage = () => {
  // We get the current user and their token from our authentication context.
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // State to hold the profile data, form data, and UI state.
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  /**
   * @description Fetches the user's profile from the backend.
   */
  const fetchProfile = async () => {
    if (!currentUser || !currentUser.token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const userProfile = await authService.getProfile(currentUser.token);
      setProfile(userProfile);
      setFormData({ email: userProfile.email }); // Pre-fill the form with existing data
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(err.message || "Failed to fetch profile.");
      if (err.message.includes("token")) {
        // If the token is invalid, log the user out
        logout();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * @description Handles changes to the form input fields.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * @description Handles the form submission for updating the profile.
   * @param {object} e - The form event.
   */
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const updatedProfile = await authService.updateProfile(
        formData,
        currentUser.token
      );
      setProfile(updatedProfile);
      setMessage("Profile updated successfully!");
      setIsEditing(false); // Exit editing mode on success.
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage(err.message || "Failed to update profile.");
    }
  };

  // We fetch the profile when the component mounts or when the user changes.
  useEffect(() => {
    fetchProfile();
  }, [currentUser]);

  // Conditional rendering for loading and error states.
  if (loading) {
    return <div className="text-center my-5">Loading profile...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center my-5">{error}</div>;
  }

  if (!profile) {
    return (
      <div className="text-center my-5">Profile not found. Please log in.</div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-4">My Profile</h2>
          {message && (
            <div
              className={`alert ${
                message.includes("successfully")
                  ? "alert-success"
                  : "alert-danger"
              }`}
            >
              {message}
            </div>
          )}

          {/* Display mode */}
          {!isEditing && (
            <div>
              <p className="card-text">
                <strong>User ID:</strong> {profile.id}
              </p>
              <p className="card-text">
                <strong>Email:</strong> {profile.email}
              </p>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}

          {/* Edit mode */}
          {isEditing && (
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
