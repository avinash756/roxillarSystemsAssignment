import React, { Component } from "react";
import "./index.css";

class AdminDashboard extends Component {
  state = {
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
        fetch("https://roxillerbackend-hfbh.onrender.com/storesRating", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("https://roxillerbackend-hfbh.onrender.com/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      const stores = await storesRes.json();
      const users = await usersRes.json();
      this.setState({ allStores: stores, allUsers: users });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  handleFilterChange = (e) => {
    this.setState({ filterText: e.target.value });
  };

  filterStores = () => {
    const { allStores, filterText } = this.state;
    const lowerText = filterText.toLowerCase();

    return allStores.filter(
      (store) =>
        (store.shop_name || "").toLowerCase().includes(lowerText) ||
        (store.shop_email || "").toLowerCase().includes(lowerText) ||
        (store.shop_address || "").toLowerCase().includes(lowerText)
    );
  };

  renderStores = () => {
    const filtered = this.filterStores();

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

  render() {
    const { filterText, allStores, allUsers } = this.state;

    return (
      <div className="admin-container">
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
        </div>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Total Stores</h3>
            <p>{allStores.length}</p>
          </div>
          <div className="dashboard-card">
            <h3>Total Users</h3>
            <p>{allUsers.length}</p>
          </div>
        </div>

        <input
          type="text"
          placeholder="Filter by name, email or address"
          value={filterText}
          onChange={this.handleFilterChange}
          className="filter-input"
        />

        <div className="table-wrapper">{this.renderStores()}</div>
      </div>
    );
  }
}

export default AdminDashboard;
