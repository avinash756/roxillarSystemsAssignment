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
        "http://localhost:5000/owner/stores/ratings",
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
    console.log(stores)

    return (
      <div className="dashboard-main-container">
        <h2>Your Store Dashboard</h2>
        <div className="dashboard-container">
          {stores.map((store) => (
            <div key={store.store_id} className="dashboard-card">
              <h3>{store.shop_name}</h3>
              <p>📍 {store.shop_address}</p>
              <p>
                ⭐ Average Rating: {Number(store.average_rating).toFixed(1)}
              </p>
              {store.user_ratings.length > 0 ? (
                <>
                  <h4>Ratings by Users:</h4>
                  <ul>
                    {store.user_ratings.map((user, index) => (
                      <li key={index}>
                        👤 {user.username}: {user.rating} ⭐
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Dashboard;
