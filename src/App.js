import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.less';
import HomePage from './Pages/Homepage';
import UploadSourceCode from './Pages/UploadSourceCode'


const App = () => (
  <Router>
  <Route path="/" component={HomePage} />
  <Route path="/upload" component={UploadSourceCode} />
  </Router>
);

export default App;