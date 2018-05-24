import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import "../../assets/styles/banner.css";

const Banner = () => (
  <div>
    <Jumbotron>
      <h1>Hello, world!</h1>
      <p>
        This is a simple hero unit, a simple jumbotron-style component for calling extra attention
        to featured content or information.
      </p>
      <p>
        <Button bsStyle="primary">Learn more</Button>
      </p>
    </Jumbotron>
  </div>
);

export default Banner;
