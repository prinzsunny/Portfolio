import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Route } from "react-router-dom";

const NoBannerLayout = ({ children, ...rest }) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
);

const NoBannerLayoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <NoBannerLayout>
        <Component {...props} />
      </NoBannerLayout>
    )}
  />
);

export default NoBannerLayoutRoute;
