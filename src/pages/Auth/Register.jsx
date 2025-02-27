import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import { registerUser } from "../../api/authService";
import API_BASE_URL from "../../api/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(""); // Email validation error
  const [passwordError, setPasswordError] = useState(""); // Password validation error
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle confirm password visibility

  // Email validation function
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Password validation function
  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Validate email
    if (name === "email") {
      setEmailError(validateEmail(value) ? "" : "Invalid email address");
    }

    // Validate password
    if (name === "password") {
      setPasswordError(
        validatePassword(value)
          ? ""
          : "Password must be at least 8 characters, contain one uppercase letter, one number, and one special character."
      );
    }

    // Show password mismatch error only when typing in confirmPassword
    if (name === "confirmPassword") {
      setShowPasswordError(true);
    }
  };

  // Check if all fields are filled
  const isFormComplete = Object.values(form).every(
    (value) => value.trim() !== ""
  );

  // Check if passwords match
  const isPasswordMatching = form.password === form.confirmPassword;

  // Determine if the button should be disabled
  const isButtonDisabled =
    !isFormComplete ||
    !isPasswordMatching ||
    loading ||
    emailError ||
    passwordError;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestData = {
      firstName: form.firstName,
      lastName: form.lastName,
      companyName: form.companyName,
      email: form.email,
      password: form.password,
    };

    console.log(
      "Submitting registration request to:",
      `${API_BASE_URL}/signup`
    );

    const data = await registerUser(requestData);
    setLoading(false);

    if (data.error) {
      console.error("Registration failed:", data.error);
      toast.error(data.error);
    } else {
      toast.success("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>Create your account</h2>
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.inputRow}>
            <div className={styles.inputField}>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputField}>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputField}>
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              placeholder="Acme Inc."
              value={form.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputField}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
              className={emailError ? styles.inputError : ""}
              required
            />
            {emailError && <p className={styles.errorText}>{emailError}</p>}
          </div>

          <div className={styles.inputField}>
            <label>Password</label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                className={passwordError ? styles.inputError : ""}
                required
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {passwordError && (
              <p className={styles.errorText}>{passwordError}</p>
            )}
          </div>

          <div className={styles.inputField}>
            <label>Confirm Password</label>
            <div className={styles.passwordContainer}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="********"
                value={form.confirmPassword}
                onChange={handleChange}
                className={
                  !isPasswordMatching && showPasswordError
                    ? styles.inputError
                    : ""
                }
                required
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {showPasswordError && !isPasswordMatching && (
            <p className={styles.errorText}>Passwords do not match.</p>
          )}

          <button
            className={`${styles.authButton} ${isButtonDisabled ? styles.disabledButton : ""}`}
            type="submit"
            disabled={isButtonDisabled}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className={styles.authFooter}>
          Already have an account?{" "}
          <Link to="/login" className={styles.authLink}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
