import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// containers
import App from './ui/App.js';

export const AppRoutes = () => (
  <Router>
    <div>
      <Route exact path='/' component={App}/>
    </div>
  </Router>
);