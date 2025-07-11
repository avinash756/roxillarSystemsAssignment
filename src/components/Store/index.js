import { Component } from "react";
import FilterComponent from "../FilterComponent";
import UpdatePassword from "../UpdatePassword";
import "./index.css";
import Dashboard from "../ShopOwnerDashboard";

class Store extends Component {
  state = {
    selectedOption: "update",
  };

  handleSelectOption = (option) => {
    this.setState({ selectedOption: option });
  };

  renderContent = () => {
    const { selectedOption } = this.state;

    if (selectedOption === "update") return <UpdatePassword />;
    if (selectedOption === "dashboard") return <Dashboard />;
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <div className="StoreContainer">
        <FilterComponent
          selected={selectedOption}
          onSelect={this.handleSelectOption}
        />

        <div className="contentArea">{this.renderContent()}</div>
      </div>
    );
  }
}

export default Store;
