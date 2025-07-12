import { Component } from "react";
import "./index.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: "",
    showPassword: false,
    redirectTo: null,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    if (!username || !password) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      const response = await fetch("https://roxillerbackend-hfbh.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        const token = data.token;
        const userRole = data.user.role;

        localStorage.setItem("jwtToken", token);
        localStorage.setItem("user", JSON.stringify(data.user));
        let redirectPath = "/";

        if (userRole === "admin") redirectPath = "/";
        else if (userRole === "storeowner") redirectPath = "/storeowner";
        else if (userRole === "user") redirectPath = "/user";

        this.setState({ redirectTo: redirectPath });
        // You can redirect using window.location or react-router here
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  render() {
    const { username, password, redirectTo } = this.state;

    if (redirectTo) {
      return <Navigate to={redirectTo} />;
    }

    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-image"></div>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <h2>Roxiller Login</h2>

            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={this.handleChange}
              placeholder="Enter your username"
              required
            />

            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                name="password"
                type={this.state.showPassword ? "text" : "password"}
                value={password}
                onChange={this.handleChange}
                placeholder="Enter your password"
                required
                className="password-input"
              />
              <span
                className={`eye-icon ${this.state.showPassword ? "" : "show"}`}
                onClick={() =>
                  this.setState((prevState) => ({
                    showPassword: !prevState.showPassword,
                  }))
                }
              >
                {this.state.showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
            <Link to="/register">
              <p className="navigateRegisterRoute">
                Dont have an account? Please Register
              </p>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
