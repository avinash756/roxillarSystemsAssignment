import { Component } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./index.css";

class UpdatePassword extends Component {
  state = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showCurrent: false,
    showNew: false,
    showConfirm: false,
    message: "",
    error: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      message: "",
      error: "",
    });
  };

  toggleVisibility = (field) => {
    this.setState((prevState) => ({ [field]: !prevState[field] }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = this.state;

    if (!currentPassword || !newPassword || !confirmPassword) {
      this.setState({ error: "All fields are required" });
      return;
    }

    if (newPassword !== confirmPassword) {
      this.setState({ error: "New passwords do not match" });
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");

      const response = await fetch("https://roxillerbackend-hfbh.onrender.com/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        this.setState({
          message: data.message,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        this.setState({ error: data.error || "Failed to update password" });
      }
    } catch (err) {
      console.error("Update error:", err);
      this.setState({ error: "Something went wrong" });
    }
  };

  render() {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
      showCurrent,
      showNew,
      showConfirm,
      message,
      error,
    } = this.state;

    return (
      <div className="update-password-container">
        <h2>Update Password</h2>
        <form onSubmit={this.handleSubmit} className="update-password-form">
          {/* Current Password */}
          <label>Current Password</label>
          <div className="password-wrapper">
            <input
              type={showCurrent ? "text" : "password"}
              name="currentPassword"
              value={currentPassword}
              onChange={this.handleChange}
              required
            />
            <span onClick={() => this.toggleVisibility("showCurrent")}>
              {showCurrent ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {/* New Password */}
          <label>New Password</label>
          <div className="password-wrapper">
            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              value={newPassword}
              onChange={this.handleChange}
              required
            />
            <span onClick={() => this.toggleVisibility("showNew")}>
              {showNew ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {/* Confirm New Password */}
          <label>Confirm New Password</label>
          <div className="password-wrapper">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.handleChange}
              required
            />
            <span onClick={() => this.toggleVisibility("showConfirm")}>
              {showConfirm ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <button type="submit">Update Password</button>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    );
  }
}

export default UpdatePassword;
