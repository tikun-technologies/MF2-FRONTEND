import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Auth.module.css";
import { resetPasswordRequest, resetPassword } from "../../api/authService";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordReset = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract token from URL
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(""); // Password validation error
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromURL = params.get("token");
    if (tokenFromURL) {
      setToken(tokenFromURL);
    }
  }, [location.search]);

  // ✅ Password validation function (SAME AS REGISTER FORM)
  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  // ✅ Handle Password Change & Validation
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (!validatePassword(newPassword)) {
      setPasswordError(
        "Password must be at least 8 characters, contain one uppercase letter, one number, and one special character."
      );
    } else {
      setPasswordError("");
    }
  };

  // ✅ Handle Reset Request (Request email link)
  const handleResetRequest = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await resetPasswordRequest(email);
    setLoading(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message || "Check your email for reset link.");
    }
  };

  // ✅ Handle Password Reset (Use token)
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    setLoading(true);
    const response = await resetPassword(token, password);
    setLoading(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Password successfully reset! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        {/* 🔹 If No Token → Show Request Form */}
        {!token ? (
          <>
            <h2 className={styles.authTitle}>Reset Your Password</h2>
            <form onSubmit={handleResetRequest} className={styles.authForm}>
              <div className={styles.inputField}>
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`${styles.authButton} ${loading ? styles.disabledButton : ""}`}
              >
                {loading ? "Requesting..." : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          // 🔹 If Token Exists → Show Password Reset Form
          <>
            <h2 className={styles.authTitle}>Enter New Password</h2>
            <form onSubmit={handleResetPassword} className={styles.authForm}>
              <div className={styles.inputField}>
                <label>New Password</label>
                <div className={styles.passwordContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    required
                    className={passwordError ? styles.inputError : ""}
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    className={
                      password !== confirmPassword ? styles.inputError : ""
                    }
                  />
                  <span
                    className={styles.eyeIcon}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              {password !== confirmPassword && (
                <p className={styles.errorText}>Passwords do not match.</p>
              )}

              <button
                type="submit"
                disabled={
                  loading || passwordError || password !== confirmPassword
                }
                className={`${styles.authButton} ${loading ? styles.disabledButton : ""}`}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </>
        )}

        <p className={styles.authFooter}>
          <Link to="/login" className={styles.passwordReset}>
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PasswordReset;
