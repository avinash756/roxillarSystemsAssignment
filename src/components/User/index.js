import { Component } from "react";
import UpdatePassword from "../UpdatePassword";
import FilterComponent from "../FilterComponent";
import ListStores from "../ListStores";
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
    if (selectedOption === "store") return <ListStores />;
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
