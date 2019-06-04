import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

function Routing({ location }) {
  return (
    <div>
          <section className="route-section">
            <Switch location={location} key={location}>
              <Route exact path="/" />
              <Route path="/" />
              <Route path="/" />

            </Switch>
          </section>
    </div>
  );
}
export default withRouter(Routing);  