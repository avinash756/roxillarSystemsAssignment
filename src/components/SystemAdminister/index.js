import { Component } from "react";
import AdminDashboard from "../AdminDashboard";
import FilterComponent from "../FilterComponent";
import AddUser from "../AddUser";
import "./index.css";
import AddAdmin from "../AddAdmin";
import ViewUsers from "../ViewUsers";
import AddStores from "../AddStores";

class SystemAdministator extends Component {
  state = {
    selected: "adminDashboard",
  };

  handleSelect = (tab) => {
    this.setState({ selected: tab });
  };

  renderContent() {
    const { selected } = this.state;

    if (selected === "adminDashboard") return <AdminDashboard />;
    if (selected === "addUser") return <AddUser />;
    if (selected === "addAdmin") return <AddAdmin />;
    if (selected === "viewUsers") return <ViewUsers />;
    if (selected === "addStores") return <AddStores />;
  }

  render() {
    const { selected } = this.state;
    return (
      <div className="systemAdminContainer">
        <FilterComponent selected={selected} onSelect={this.handleSelect} />
        <div className="contentArea">{this.renderContent()}</div>
      </div>
    );
  }
}

export default SystemAdministator;
