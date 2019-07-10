import React from "react";
import Partner from "./Partner";
import { Card, CardBody } from "reactstrap";
import "../style/PartnerPage.scss";
import axios from "axios";

class PartnerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPoints: null
    };
  }

  componentDidMount() {
    const profileId = JSON.parse(localStorage.getItem("user")).user.id;
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`http://localhost:5050/partenaire/${profileId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(({ data }) => {
        this.setState({
          userPoints: data.points
        });
      });
  }

  render() {
    const points = this.state.userPoints;
    return (
      <React.Fragment>
        <Card className="cardPoint m-5">
          <CardBody>
            <p className="point">Vous avez {points} points</p>
          </CardBody>
        </Card>
        <Partner />
      </React.Fragment>
    );
  }
}

export default PartnerPage;
