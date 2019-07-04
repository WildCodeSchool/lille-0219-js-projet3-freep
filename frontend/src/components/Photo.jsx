import React from "react";
import { Heart, Target } from "react-feather";
import { Link } from "react-router-dom";
import { Row, Card, CardImg } from "reactstrap";
import ReportButton from "./ReportButton";

class Photo extends React.Component {
  render() {
    const picture = this.props.picture;
    const link = this.props.link;
    return (
      <React.Fragment>
        <Card className="m-2 picture-card">
          <Link to={`/article/${link}`}>
            <CardImg src={picture} alt="clothes" className="Photo" />
          </Link>
          <div className="overlay">
            <Row className="p-0 card-buttons align-items-center">
              <Heart color="white" />
              <div
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  fontSize: "1.5rem"
                }}
              >
                ℂ
              </div>
              <ReportButton />
            </Row>
          </div>
        </Card>
      </React.Fragment>
    );
  }
}

export default Photo;
