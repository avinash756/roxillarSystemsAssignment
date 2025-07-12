import React, { Component } from "react";
import "./index.css";

class Dashboard extends Component {
  state = {
    stores: [],
  };

  async componentDidMount() {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await fetch(
        "https://roxillerbackend-hfbh.onrender.com/owner/stores/ratings",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      this.setState({ stores: data });
    } catch (err) {
      console.error("Dashboard error:", err);
    }
  }

  render() {
    const { stores } = this.state;
    console.log(stores);

    return (
      <div className="dashboard-wrapper">
        <h2 className="dashboard-title">Your Store Dashboard</h2>
        <div className="cards-grid">
          {stores.map((store) => (
            <div key={store.store_id} className="store-card">
              <h3 className="store-title">{store.shop_name}</h3>
              <p className="store-address">📍 {store.shop_address}</p>
              <p className="store-rating">
                ⭐ Average Rating: {Number(store.average_rating).toFixed(1)}
              </p>
              {store.user_ratings.length > 0 ? (
                <div className="user-rating-section">
                  <h4>Ratings by Users:</h4>
                  <ul className="user-rating-list">
                    {store.user_ratings.map((user, index) => (
                      <li key={index}>
                        👤 {user.username}: {user.rating} ⭐
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Dashboard;
