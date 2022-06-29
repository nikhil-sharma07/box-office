import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Home from './pages/Home';
import Starred from './pages/Starred';
import Show from './pages/Show';

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

function App() {
  return (
  <ThemeProvider theme={theme}>
    <Switch>
      <Route path="/" exact>
        <Home/>
      </Route>
      <Route path="/Starred" exact>
        <Starred />
      </Route>
      <Route path="/show/:id">
        <Show/>
      </Route>

      <Route>404 PAGE</Route>
    </Switch>
  </ThemeProvider>
  );
}

export default App;
