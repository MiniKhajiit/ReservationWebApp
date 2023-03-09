import React from "react";
import axios from 'axios';
import { matchPath, useLocation, useParams } from 'react-router-dom';

export const Welcome = (props) => {
  const pattern = '/user/create/verify/:confirmationCode'
  const location = useLocation();
  const locationPath = location.pathname;
  console.log(locationPath)
  const { confirmationCode } = useParams();
  console.log(confirmationCode)
  if (matchPath({path:pattern, exact:true, strict:false}, location.pathname)) {
    axios
      .get(`${process.env.REACT_APP_SRVR_URL}/signup/user/create/verify/${confirmationCode}`)
      .then((response) => {
        console.log(response.confirmationCode)
        return response.confirmationCode;
      });
  }

  return (
    <div className="welcome-container">
      <header className="jumbotron">
        <h1>
          <strong>Account confirmed!</strong>
        </h1>
        <h2><a href="cedarfalls.cc">Return to login page</a></h2>
      </header>
    </div>
  );
};