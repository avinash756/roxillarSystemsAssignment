import { Component } from "react";
import { FiLogOut } from "react-icons/fi"; // Logout icon
import "./index.css";

class FilterComponent extends Component {
  state = {
    username: "",
    role: "",
    selected: "update",
  };

  handleSelect = (option) => {
    this.setState({ selected: option });
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
          <button
            className={selected === "update" ? "navBtn activeBtn" : "navBtn"}
            onClick={() => onSelect("update")}
          >
            Update Password
          </button>
          <button
            className={selected === "store" ? "navBtn activeBtn" : "navBtn"}
            onClick={() => onSelect("store")}
          >
            Store Register
          </button>
          <button
            className={selected === "dashboard" ? "navBtn activeBtn" : "navBtn"}
            onClick={() => onSelect("dashboard")}
          >
            Dashboard
          </button>
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
