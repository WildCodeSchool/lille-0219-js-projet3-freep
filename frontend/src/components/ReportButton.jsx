import React from "react";
import mailtoAddress from "../conf.js";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class ReportButton extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  render() {
    return (
      <ButtonDropdown
        direction="right"
        className="dropdown-btn"
        isOpen={this.state.btnDropright}
        toggle={() => {
          this.setState({ btnDropright: !this.state.btnDropright });
        }}
      >
        <DropdownToggle>...</DropdownToggle>
        <DropdownMenu>
          <DropdownItem className="p-1">
            <a href={mailtoAddress}>Signaler un abus</a>
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

export default ReportButton;
