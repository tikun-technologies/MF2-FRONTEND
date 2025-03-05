import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import styles from "./Auth.module.css";
import { loginUser } from "../../api/authService";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ Get login function from AuthContext
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormComplete =
    form.email.trim() !== "" && form.password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = await loginUser(form.email, form.password);
    setLoading(false);

    if (data.error) {
      toast.error(data.error);
      console.error("❌ Login Failed:", data.error);
    } else {
      console.log("✅ Login Successful, storing token:", data.access_token);
      login(data.access_token, data.user); // ✅ Use AuthContext login function
      toast.success("Login successful!");
      navigate("/dashboard");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>Sign in to your account</h2>
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.inputField}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
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
                required
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormComplete || loading}
            className={`${styles.authButton} ${!isFormComplete ? styles.disabledButton : ""}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className={styles.authFooter}>
          Don't have an account?{" "}
          <Link to="/signup" className={styles.authLink}>
            Create one
          </Link>
        </p>
        <p className={styles.authFooter}>
          {/* Forget Password?{" "} */}
          <Link to="/reset-password" className={styles.passwordReset}>
            Reset Password
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
