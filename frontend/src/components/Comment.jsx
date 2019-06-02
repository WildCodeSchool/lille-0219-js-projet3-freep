import React from "react";
import {
  Row,
  Col,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "../style/Comment.scss";
import mailtoAddress from "../conf.js";

class Comment extends React.Component {
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
      <React.Fragment>
        <Row className="comment-line mx-1 my-2">
          <Col xs="2">
            <img
              src={this.props.avatar}
              alt="username-goes-here" // !
              className="avatar"
            />
          </Col>
          <Col xs="2">{this.props.username}</Col>
          <Col xs="7" className="text-left">
            {this.props.comment}
          </Col>
          <Col xs="1" className="p-0">
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
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Comment;
