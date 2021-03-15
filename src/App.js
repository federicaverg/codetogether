import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.less';
import HomePage from './Pages/Homepage';

const App = () => (
  <Router>
  <Route path="/" exact component={HomePage} />
  </Router>
);

export default App;