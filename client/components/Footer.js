import React from "react";
import { Grid } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../assets/styles/footer.css";

const Footer = () => (
  <Grid>
    <footer className="footer">
      <div className="container">
        <span>
          <Link to="/contact">Contact</Link>
        </span>&nbsp;|&nbsp;
        <span>&copy; {new Date().getFullYear()} - Prince Mukka &nbsp; </span>
      </div>
    </footer>
  </Grid>
);

export default Footer;
