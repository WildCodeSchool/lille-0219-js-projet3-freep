import React from "react";
import mailtoAddress from "../conf.js";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { MoreHorizontal } from "react-feather";
import "../style/Photo.scss";

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
        <DropdownToggle className="dots p-0">
          <MoreHorizontal color="white" />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem className="report-button">
            <a href={mailtoAddress}>Signaler un abus</a>
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

export default ReportButton;
