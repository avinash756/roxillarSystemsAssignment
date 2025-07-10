import { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Store from "./components/Store";
import SystemAdministator from "./components/SystemAdminister";
import User from "./components/User";
import NotFound from "./components/not-foundPage";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/storeowner" element={<Store />} />
          <Route path="/" element={<SystemAdministator />} />
          <Route path="/user" element={<User />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
