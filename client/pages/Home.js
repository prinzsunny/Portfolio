import React from "react";
import { Grid, Col, Thumbnail, Button, Row } from "react-bootstrap";
import "../../assets/images/thumbnail.png";
import "../../assets/styles/home.css";

const Home = () => (
  <Grid>
    <Row>
      <Col xs={6} md={4}>
        <Thumbnail src="/images/thumbnail.png" alt="242x200">
          <span className="center-align">
            <h3>Thumbnail label</h3>
            <p>Description</p>
          </span>
        </Thumbnail>
      </Col>
      <Col xs={6} md={4}>
        <Thumbnail src="/images/thumbnail.png" alt="242x200">
          <span className="center-align">
            <h3>Thumbnail label</h3>
            <p>Description</p>
          </span>
        </Thumbnail>
      </Col>
      <Col xs={6} md={4}>
        <Thumbnail src="images/thumbnail.png" alt="242x200">
          <span className="center-align">
            <h3>Thumbnail label</h3>
            <p>Description</p>
          </span>
        </Thumbnail>
      </Col>
    </Row>
  </Grid>
);

export default Home;
