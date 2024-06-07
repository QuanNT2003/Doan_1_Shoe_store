import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider } from '~/components/ToastContext';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Router>
    <ToastProvider>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </ToastProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
