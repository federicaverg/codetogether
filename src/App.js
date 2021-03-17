import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.less';
import PagesContainer from './Components/PagesContainer';

import ExercisesDisplay from './Components/ExercisesDisplay';
import CreateExercise from './Components/CreateExercise';
import Homepage from './Components/Homepage';

const App = () => {
  return (
      <Router>
        <PagesContainer/>
        <Route path='/' exact component={Homepage} />
        <Route path='/createx' exact component={CreateExercise} />
      </Router>
    )
};

export default App;