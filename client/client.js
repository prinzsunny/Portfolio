import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route } from 'react-router-dom';

const HOME = () => { return "prince" };
ReactDOM.render(
	<BrowserRouter>
	  <Route path="/" component = {HOME}/>
	 </BrowserRouter>,
  document.getElementById('root')
);

