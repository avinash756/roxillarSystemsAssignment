import React, { Component } from "react";
import "./index.css";

class AdminDashboard extends Component {
  state = {
    activeTab: "stores",
    allStores: [],
    allUsers: [],
    filterText: "",
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const token = localStorage.getItem("jwtToken");
    try {
      const [storesRes, usersRes] = await Promise.all([
        fetch("http://localhost:5000/storesRating", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      const stores = await storesRes.json();
      const users = await usersRes.json();
      this.setState({ allStores: stores, allUsers: users });
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab });
  };

  handleFilterChange = (e) => {
    this.setState({ filterText: e.target.value });
  };

  logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/login";
  };

  filterData = (data, type) => {
    const { filterText } = this.state;
    const lowerText = filterText.toLowerCase();

    return data.filter((item) => {
      if (type === "stores") {
        return (
          (item.shop_name || "").toLowerCase().includes(lowerText) ||
          (item.shop_email || "").toLowerCase().includes(lowerText) ||
          (item.shop_address || "").toLowerCase().includes(lowerText)
        );
      } else if (type === "users") {
        return (
          (item.username || "").toLowerCase().includes(lowerText) ||
          (item.email || "").toLowerCase().includes(lowerText) ||
          (item.address || "").toLowerCase().includes(lowerText) ||
          (item.role || "").toLowerCase().includes(lowerText)
        );
      }
      return false;
    });
  };

  renderStores = () => {
    const { allStores } = this.state;
    const filtered = this.filterData(allStores, "stores");

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((store) => (
            <tr key={store.id}>
              <td>{store.shop_name}</td>
              <td>{store.shop_email}</td>
              <td>{store.shop_address}</td>
              <td>{store.average_rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  renderUsers = () => {
    const { allUsers } = this.state;
    const filtered = this.filterData(allUsers, "users");
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
            <th>Rating (If Owner)</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
              <td>{user.role === "shopowner" ? user.rating : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  render() {
    const { activeTab, filterText } = this.state;
    return (
      <div className="admin-container">
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
        </div>

        <div className="tabs">
          <button
            className={activeTab === "stores" ? "active" : ""}
            onClick={() => this.handleTabChange("stores")}
          >
            Stores
          </button>
          <button
            className={activeTab === "users" ? "active" : ""}
            onClick={() => this.handleTabChange("users")}
          >
            Users
          </button>
        </div>

        <input
          type="text"
          placeholder="Filter by name, email, address or role"
          value={filterText}
          onChange={this.handleFilterChange}
          className="filter-input"
        />

        <div className="table-wrapper">
          {activeTab === "stores" ? this.renderStores() : this.renderUsers()}
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
