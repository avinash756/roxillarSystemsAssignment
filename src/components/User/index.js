import { Component } from "react";
import UpdatePassword from "../UpdatePassword";
import FilterComponent from "../FilterComponent";
import StoreList from "../ListStores";
import "./index.css";

class User extends Component {
  state = {
    selectedOption: "update",
  };

  handleSelectOption = (option) => {
    this.setState({ selectedOption: option });
  };

  renderContent = () => {
    const { selectedOption } = this.state;

    if (selectedOption === "update") return <UpdatePassword />;
    if (selectedOption === "store") return <StoreList />;
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <>
        <div className="UserContainer">
          <FilterComponent
            selected={selectedOption}
            onSelect={this.handleSelectOption}
          />
          <div className="contentArea">{this.renderContent()}</div>
        </div>
      </>
    );
  }
}

export default User;
