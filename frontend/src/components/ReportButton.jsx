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
    const link = this.props.link;
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
            <a
              href={`mailto:${mailtoAddress}?subject=Une%20Freepeuse%20veut%20signaler%20un%20abus&body=Bonjour,%20je%20vous%20signale%20un%20abus%20sur%20l%27article%20suivant%20:%20https://freep-app.fr/article/${link}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Signaler un abus
            </a>
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

export default ReportButton;
