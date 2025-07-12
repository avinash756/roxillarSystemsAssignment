import React, { Component } from "react";
import "./index.css"; // You can create a separate CSS file if needed

class ViewUsers extends Component {
  state = {
    allUsers: [],
    filterText: "",
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await fetch(
        "https://roxillerbackend-hfbh.onrender.com/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const users = await response.json();
      this.setState({ allUsers: users });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  handleFilterChange = (e) => {
    this.setState({ filterText: e.target.value });
  };

  filterUsers = () => {
    const { allUsers, filterText } = this.state;
    const lowerText = filterText.toLowerCase();

    return allUsers.filter(
      (user) =>
        (user.username || "").toLowerCase().includes(lowerText) ||
        (user.email || "").toLowerCase().includes(lowerText) ||
        (user.address || "").toLowerCase().includes(lowerText) ||
        (user.role || "").toLowerCase().includes(lowerText)
    );
  };

  render() {
    const { filterText } = this.state;
    const filtered = this.filterUsers();

    return (
      <div className="view-users-container">
        <h2>View Users</h2>
        <input
          type="text"
          placeholder="Filter by name, email, address or role"
          value={filterText}
          onChange={this.handleFilterChange}
          className="filter-input"
        />
        <div className="table-wrapper">
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
        </div>
      </div>
    );
  }
}

export default ViewUsers;
