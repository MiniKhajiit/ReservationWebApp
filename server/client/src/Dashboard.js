import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navi } from './components/navbar/nav.js';
import Calendar from './components/calendar/Calendar.js';
import { MsgBoard } from './components/messageBoard/msgBoard.js';
import React, { useState,useEffect } from 'react';
import axios from "axios";

function Dashboard() {

  //LOGIN DATA------------------------------------------
  //User Login Attempt

  //User Data fetching for axios
  //LOGIN DATA------------------------------------------

  //CALENDAR DATA----------------------------------
  const [calData, setCalData] = useState([])
  const [calLoading, setCalLoading] = useState(false)

  useEffect(() => {
      fetchCalData();
  }, [])

  //Cal Data fetching for axios
  const fetchCalData = async () => {
      setCalLoading(true);
      try{
          const calRes = await axios.get(`${process.env.REACT_APP_SRVR_URL}/reservation/all`)
          setCalData(calRes.data);
          setCalLoading(false);
      } catch (error) {
          alert('There was an error while loading the reservation data')
      }
  }
  //CALENDAR DATA---------------------------------

  //USER DATA ------------------------------------
  const [users, setUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(false)

  //Axios with async/await
  useEffect(() => {
      fetchUsers();
  }, [])

  //Data fetching
  const fetchUsers = async () => {
      setUsersLoading(true);
      try{
          const userList = await axios.get(`${process.env.REACT_APP_SRVR_URL}/users/all`)
          setUsers(userList.data);
          setUsersLoading(false);
      } catch (error) {
          alert('There was an error while loading the user data')
      }
  }
  //USER DATA ------------------------------------

  return (
    <div className="App">
      <Navi 
        calData={calData}
        calLoading={calLoading}
        fetchCalData={fetchCalData}
        users={users}
      />
      <div className="App-row">
        <div className="col">
          <Calendar calData={calData} calLoading={calLoading} fetchCalData={fetchCalData} />
        </div>
        <div className="col">
          <MsgBoard />
        </div>
      </div>
    </div>
  );
}


export default Dashboard;