import React, { Component } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./index.css";

class AddUser extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    address: "",
    message: "",
    showPassword: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, address } = this.state;

    try {
      const response = await fetch(
        "https://roxillerbackend-hfbh.onrender.com/register-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, address }),
        }
      );

      const text = await response.text();
      this.setState({
        message: text,
        name: "",
        email: "",
        password: "",
        address: "",
      });
    } catch (error) {
      this.setState({ message: "Something went wrong." });
    }
  };

  render() {
    const { name, email, password, address, message, showPassword } =
      this.state;

    return (
      <div className="user-form">
        <h2>Register User</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={name}
            onChange={this.handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
            required
          />
          <div className="password-wrapper">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={this.togglePasswordVisibility}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <input
            name="address"
            placeholder="Address"
            value={address}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>{message}</p>
      </div>
    );
  }
}

export default AddUser;
