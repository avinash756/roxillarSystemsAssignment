import { Component } from "react";
import { Navigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./index.css";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    role: "user",
    showPasswordRules: false,
    redirectToLogin: false,
    error: "",
    showPassword: false, // 👁️ New
    showConfirmPassword: false,
    passwordRules: {
      hasUppercase: false,
      hasNumber: false,
      hasSpecialChar: false,
      minLength: false,
    },
  };

  validatePasswordRules = (password) => {
    const rules = {
      hasUppercase: (password.match(/[A-Z]/g) || []).length === 1,
      hasNumber: (password.match(/\d/g) || []).length === 1,
      hasSpecialChar: (password.match(/[@$!%*?&]/g) || []).length === 1,
      minLength: password.length >= 8,
    };
    this.setState({ passwordRules: rules });
    return Object.values(rules).every((rule) => rule === true);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, error: "" });

    if (name === "password") {
      this.validatePasswordRules(value);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      password,
      confirmPassword,
      address,
      role,
      passwordRules,
    } = this.state;

    if (!name || !email || !password || !confirmPassword || !address) {
      this.setState({ error: "All fields are required." });
      return;
    }

    const isValid = Object.values(passwordRules).every((rule) => rule === true);
    if (!isValid) {
      this.setState({ error: "Password does not meet requirements." });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({ error: "Passwords do not match." });
      return;
    }

    try {
      const response = await fetch(
        "https://roxillerbackend-hfbh.onrender.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, address, role }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        this.setState({ redirectToLogin: true });
      } else {
        this.setState({ error: data.error || "Registration failed." });
      }
    } catch (error) {
      this.setState({ error: "Server error. Please try again later." });
    }
  };

  renderPasswordRule = (condition, label) => {
    return (
      <li className={`password-rule ${condition ? "valid" : "invalid"}`}>
        {condition ? "✅" : "❌"} {label}
      </li>
    );
  };

  render() {
    const {
      name,
      email,
      password,
      confirmPassword,
      address,
      error,
      redirectToLogin,
      passwordRules,
      showPassword,
      showConfirmPassword,
    } = this.state;

    if (redirectToLogin) return <Navigate to="/login" />;

    return (
      <div className="login-page">
        <div className="login-card">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <h2>Register</h2>

            {error && <p className="error-text">{error}</p>}

            <label>Name</label>
            <input
              name="name"
              value={name}
              onChange={this.handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              required
            />

            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={this.handleChange}
                required
                className="password-input"
              />
              <span
                className="eye-icon"
                onClick={() =>
                  this.setState({ showPassword: !this.state.showPassword })
                }
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <ul className="password-rules">
              {this.renderPasswordRule(
                passwordRules.hasUppercase,
                "Exactly 1 uppercase letter"
              )}
              {this.renderPasswordRule(
                passwordRules.hasNumber,
                "Exactly 1 number"
              )}
              {this.renderPasswordRule(
                passwordRules.hasSpecialChar,
                "Exactly 1 special character (@$!%*?&)"
              )}
              {this.renderPasswordRule(
                passwordRules.minLength,
                "Minimum 8 characters"
              )}
            </ul>

            <label>Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
                required
                className="password-input"
              />
              <span
                className="eye-icon"
                onClick={() =>
                  this.setState({
                    showConfirmPassword: !this.state.showConfirmPassword,
                  })
                }
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <label>Address</label>
            <input
              name="address"
              value={address}
              onChange={this.handleChange}
              required
            />

            <input type="hidden" name="role" value="user" />

            <button className="login-button" type="submit">
              Register
            </button>
            <Link to="/login">
              <p className="navigateRegisterRoute">
                already Registered? Please Login...
              </p>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
