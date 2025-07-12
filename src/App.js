import { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Store from "./components/Store";
import SystemAdministator from "./components/SystemAdminister";
import User from "./components/User";
import NotFound from "./components/not-foundPage";
import PrivateRoute from "./PrivateRoute";

class App extends Component {
  render() {
    const token = localStorage.getItem("jwtToken");

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ✅ Protected Routes */}
          <Route
            path="/storeowner"
            element={
              <PrivateRoute>
                <Store />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <SystemAdministator />
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />

          <Route path="/not-found" element={<NotFound />} />
          <Route
            path="*"
            element={<Navigate to={token ? "/not-found" : "/login"} replace />}
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
