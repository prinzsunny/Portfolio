import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Main from "./pages/Main";

ReactDOM.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>,
  document.getElementById("root")
);

if(process.env.NODE_ENV == 'development' && module.hot) {
	if (module.hot) {
	  module.hot.accept();
	}
}
