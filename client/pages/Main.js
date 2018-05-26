import React from "react";
import { Switch, Route } from "react-router-dom";
import { Grid } from "react-bootstrap";
import Home from "./Home";
import Aboutme from "./Aboutme";
import Photography from "./Photography";
import Resume from "./Resume";
import Blog from "./Blog";
import Resources from "./Resources";
import Contact from "./Contact";
import HomePageLayoutRoute from "../layouts/HomePageLayout";
import NoBannerLayoutRoute from "../layouts/NoBannerLayout";

const Main = () => (
  <Grid>
    <Switch>
      <HomePageLayoutRoute exact path="/" component={Home} />
      <NoBannerLayoutRoute exact path="/aboutme" component={Aboutme} />
      <NoBannerLayoutRoute exact path="/photography" component={Photography} />
      <NoBannerLayoutRoute exact path="/blog" component={Blog} />
      <NoBannerLayoutRoute exact path="/resume" component={Resume} />
      <NoBannerLayoutRoute exact path="/resources" component={Resources} />
      <NoBannerLayoutRoute exact path="/contact" component={Contact} />
    </Switch>
  </Grid>
);

export default Main;
