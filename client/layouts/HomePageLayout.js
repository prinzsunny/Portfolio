import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import { Route } from "react-router-dom";

const HomePageLayout = ({ children, ...rest }) => (
  <div>
    <Header />
    <Banner />
    {children}
    <Footer />
  </div>
);

const HomePageLayoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <HomePageLayout>
        <Component {...props} />
      </HomePageLayout>
    )}
  />
);

export default HomePageLayoutRoute;
