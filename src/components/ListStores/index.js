import React, { Component } from "react";
import "./index.css";

class StoreList extends Component {
  state = {
    stores: [],
    search: "",
  };

  componentDidMount() {
    this.fetchStores();
  }

  fetchStores = async () => {
    const token = localStorage.getItem("jwtToken");
    const { search } = this.state;

    try {
      const response = await fetch(
        `http://localhost:5000/stores?search=${encodeURIComponent(search)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      this.setState({ stores: data });
    } catch (error) {
      console.error("Failed to fetch stores", error);
    }
  };

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value }, this.fetchStores);
  };

  handleRatingChange = async (storeId, rating) => {
    const token = localStorage.getItem("jwtToken");

    try {
      const response = await fetch(
        `http://localhost:5000/stores/${storeId}/rate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ rating }),
        }
      );

      if (response.ok) {
        this.fetchStores(); // Refresh data
      }
    } catch (error) {
      console.error("Rating failed", error);
    }
  };

  render() {
    const { stores, search } = this.state;

    return (
      <div className="store-list-container">
        <h2 className="heading">Store Listings</h2>

        <input
          type="text"
          className="search-input"
          placeholder="Search by name or address"
          value={search}
          onChange={this.handleSearchChange}
        />

        <div className="storeDisplay">
          {stores.length === 0 && search !== "" ? (
            <p className="no-store-message">Store not Found</p>
          ) : (
            stores.map((store) => (
              <div key={store.id} className="store-card">
                <img
                  src={store.shop_img_url}
                  alt={store.shop_name}
                  className="store-image"
                />
                <div className="store-details">
                  <h3>{store.shop_name}</h3>
                  <p>📍 {store.shop_address}</p>
                  <p>
                    ⭐ Overall Rating:{" "}
                    {isNaN(Number(store.overall_rating))
                      ? "N/A"
                      : Number(store.overall_rating).toFixed(1)}
                  </p>

                  <p>🧑‍💻 Your Rating: {store.user_rating || "Not rated yet"}</p>

                  <select
                    value={store.user_rating || ""}
                    onChange={(e) =>
                      this.handleRatingChange(store.id, Number(e.target.value))
                    }
                  >
                    <option value="">Rate this store</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} Star{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default StoreList;
