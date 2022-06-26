import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Navs from './components/Navs';
import Home from './pages/Home';
import Starred from './pages/Starred';

function App() {
  return (
  <div>
    <Navs/>
    <Switch>
      <Route path="/" exact>
        <Home/>
      </Route>
      <Route path="/Starred" exact>
        <Starred />
      </Route>
      <Route>404 PAGE</Route>
    </Switch>
  </div>
  );
}

export default App;
