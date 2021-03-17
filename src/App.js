import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.less';
import HomePage from './Components/Homepage';
import PagesContainer from './Components/PagesContainer';


const App = () => {
  return (
    <PagesContainer></PagesContainer>
    )
};

export default App;