import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApplicationProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <ApplicationProvider >
      <App />
    </ApplicationProvider>
  </Router>
);