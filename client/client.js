import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Main from './pages/Main';


ReactDOM.render(
	<BrowserRouter>
		<Main/>
	 </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}