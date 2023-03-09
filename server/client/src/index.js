import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import { Welcome } from './components/services/verifyWelcomePage.js';
import { ErrorApp } from './components/services/error-app';
import { ErrorVerify } from './components/services/error-verify';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorApp />,
  },
  {
    path: "/user/create/verify/:confirmationCode",
    element: <Welcome />,
    errorElement: <ErrorVerify />,
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
