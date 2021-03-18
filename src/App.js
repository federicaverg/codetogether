import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.less';

import PagesContainer from './Components/PagesContainer';
import Homepage from './Components/Homepage';

const App = () => {
  return (
      <Router>
        <PagesContainer/>
        <Route path='/' exact component={Homepage} />
      </Router>
    )
};

export default App;