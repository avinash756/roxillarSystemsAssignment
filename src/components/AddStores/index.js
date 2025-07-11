import React, { Component } from "react";
import "./index.css";

class AddStore extends Component {
  state = {
    shop_name: "",
    shop_email: "",
    shop_address: "",
    owner_id: "",
    shop_image: null,
    owners: [],
    message: "",
    error: "",
  };

  componentDidMount() {
    this.fetchOwners();
  }

  fetchOwners = async () => {
    const token = localStorage.getItem("jwtToken");
    try {
      const res = await fetch("http://localhost:5000/store-owners", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) this.setState({ owners: data });
      else this.setState({ error: "Failed to fetch owners" });
    } catch {
      this.setState({ error: "Server error fetching owners" });
    }
  };

  handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "shop_image") {
      this.setState({ shop_image: files[0] });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      shop_name,
      shop_email,
      shop_address,
      owner_id,
      shop_image,
    } = this.state;
    const token = localStorage.getItem("jwtToken");

    const formData = new FormData();
    formData.append("shop_name", shop_name);
    formData.append("shop_email", shop_email);
    formData.append("shop_address", shop_address);
    formData.append("owner_id", owner_id);
    if (shop_image) formData.append("shop_image", shop_image);

    try {
      const res = await fetch("http://localhost:5000/stores", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        this.setState({
          shop_name: "",
          shop_email: "",
          shop_address: "",
          owner_id: "",
          shop_image: null,
          message: "Store added successfully!",
          error: "",
        });
      } else this.setState({ error: data.message });
    } catch {
      this.setState({ error: "Failed to add store. Try again later." });
    }
  };

  render() {
    const {
      shop_name,
      shop_email,
      shop_address,
      owner_id,
      message,
      error,
      owners,
    } = this.state;

    return (
      <div className="store-form-container">
        <h2>Add Store</h2>
        <form onSubmit={this.handleSubmit} className="store-form" encType="multipart/form-data">
          <input
            type="text"
            name="shop_name"
            placeholder="Store Name"
            value={shop_name}
            onChange={this.handleChange}
            required
          />
          <input
            type="email"
            name="shop_email"
            placeholder="Store Email"
            value={shop_email}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="shop_address"
            placeholder="Store Address"
            value={shop_address}
            onChange={this.handleChange}
            required
          />
          <select name="owner_id" value={owner_id} onChange={this.handleChange} required>
            <option value="">Select Store Owner</option>
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.username}
              </option>
            ))}
          </select>
          <input
            type="file"
            name="shop_image"
            accept="image/*"
            onChange={this.handleChange}
          />
          <button type="submit">Add Store</button>
        </form>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    );
  }
}

export default AddStore;
