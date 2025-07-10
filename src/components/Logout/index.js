import { Component } from "react";
import { Navigate } from "react-router-dom";

class Logout extends Component {
  state = {
    redirect: false,
  };

  componentDidMount() {
    // Clear user session data
    localStorage.removeItem("jwtToken");


    // Redirect to login
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/login" />;
    }

    return <p>Logging out...</p>;
  }
}

export default Logout;
