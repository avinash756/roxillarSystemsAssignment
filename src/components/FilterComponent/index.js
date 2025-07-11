import { Component } from "react";
import { FiLogOut } from "react-icons/fi";
import "./index.css";

class FilterComponent extends Component {
  state = {
    username: "",
    role: "",
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    this.setState({
      username: user.username || "Guest",
      role: user.role || "Unknown",
    });
  }

  handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  render() {
    const { username, role } = this.state;
    const { selected, onSelect } = this.props;

    return (
      <nav className="navContainer">
        <div className="navTop">
          <h3>👤 {username}</h3>
          <p>🔑 {role}</p>
        </div>

        <div className="navMiddle">
          {(role === "user" || role === "storeowner") && (
            <button
              className={selected === "update" ? "navBtn activeBtn" : "navBtn"}
              onClick={() => onSelect("update")}
            >
              Update Password
            </button>
          )}

          {role === "user" && (
            <button
              className={selected === "store" ? "navBtn activeBtn" : "navBtn"}
              onClick={() => onSelect("store")}
            >
              Store Register
            </button>
          )}

          {role === "storeowner" && (
            <button
              className={
                selected === "dashboard" ? "navBtn activeBtn" : "navBtn"
              }
              onClick={() => onSelect("dashboard")}
            >
              Dashboard
            </button>
          )}

          {role === "admin" && (
            <>
              <button
                className={
                  selected === "adminDashboard" ? "navBtn activeBtn" : "navBtn"
                }
                onClick={() => onSelect("adminDashboard")}
              >
                Dashboard
              </button>
              <button
                className={
                  selected === "addUser" ? "navBtn activeBtn" : "navBtn"
                }
                onClick={() => onSelect("addUser")}
              >
                Add User
              </button>
              <button
                className={
                  selected === "addAdmin" ? "navBtn activeBtn" : "navBtn"
                }
                onClick={() => onSelect("addAdmin")}
              >
                Add Admin
              </button>
              <button
                className={
                  selected === "viewUsers" ? "navBtn activeBtn" : "navBtn"
                }
                onClick={() => onSelect("viewUsers")}
              >
                View Users
              </button>
              <button
                className={
                  selected === "addStores" ? "navBtn activeBtn" : "navBtn"
                }
                onClick={() => onSelect("addStores")}
              >
                Add Stores
              </button>
            </>
          )}
        </div>

        <div className="navBottom">
          <button className="logoutButton" onClick={this.handleLogout}>
            <FiLogOut className="logoutIcon" />
            Logout
          </button>
        </div>
      </nav>
    );
  }
}

export default FilterComponent;
