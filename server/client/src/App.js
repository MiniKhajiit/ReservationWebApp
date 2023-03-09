import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login/Login2.js';
import Dashboard from './Dashboard.js';
import React, { useState } from 'react';

function App() {

  //LOGIN DATA------------------------------------------
  //Storing user token in memory using the useState hook 
  const userSessStor = sessionStorage.getItem("userData");
  const [userData, setUserData] = useState(JSON.parse(userSessStor));

  const [userLoading, setUserLoading] = useState(false);
  const [userAuth, setUserAuth] = useState(sessionStorage.getItem("userAuth"));

  console.log(`Logging in: ${userLoading}`);

  return (
    <div className="App-Container">
      {(userAuth == 1) ? (
        <Dashboard />
      ) : (
        <Login userData={userData} setUserData={setUserData} setUserLoading={setUserLoading} setUserAuth={setUserAuth}/>
      )}
    </div>
  )
}

export default App;