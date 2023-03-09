import React, { useState, useEffect } from 'react';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import profileImage from '../../default.png';
import { ProfileEdit } from './ProfileEdit';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
//import interactionPlugin from '@fullcalendar/interaction';
import '../calendar/Calendar.css';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { EditReservationForm } from './EditReservation';
//import { RoomSelection } from '../RoomAvailability/RoomSelectionForm';
import axios from 'axios';
import moment from 'moment';

export function ProfileView() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleCloseUpdate = () => {
      handleClose();
      window.location.reload()
    }
    const handleShow = () => setShow(true);

    const [rerender, setRerender] = useState(false);

    //USER CALENDAR DATA----------------------------------
    const [userCalData, setUserCalData] = useState([])
    const [userCalLoading, setUserCalLoading] = useState(false)

    useEffect(() => {
        fetchUserCalData();
    }, [])

    //Cal Data fetching for axios
    const fetchUserCalData = async () => {
        setUserCalLoading(true);
        try{
            const userCalRes = await axios.get(`${process.env.REACT_APP_SRVR_URL}/reservation/user/${sessionStorage.getItem("name")}`)
            setUserCalData(userCalRes.data);
            setUserCalLoading(false);
        } catch (error) {
            alert('There was an error while loading the reservation data')
        }
    }

    const reservationAppearance = (eventInfo) => {
      return (
          <div style={{display: 'flex'}} className="td-container">
              <span style={{marginRight: "auto"}}>{eventInfo.event.title}</span><span>   </span>
              <span style={{fontSize: 12+'px'}} className="edit-hint">(click to edit)</span>
          </div>
      )
  }
    //USER CALENDAR DATA---------------------------------

    //USER RESERVATION EDIT------------------------------
    const [resInfo, setResInfo] = useState({});
    const [editShow, setEditShow] = useState(false);
    const handleEditClose = () => setEditShow(false);
    const handleEditShow = (xid, xtitle, xstart, xend, xdescription, xroom, xboyBunkBeds, xgirlBunkBeds) => {
      setEditShow(true);
      setResInfo({
        id: xid,
        title: xtitle,
        start: xstart,
        end: xend,
        description: xdescription,
        room: xroom,
        boyBunkBeds: xboyBunkBeds,
        girlBunkBeds: xgirlBunkBeds,
      });
      fetchRoomList(xroom);
    }
    //USER RESERVATION EDIT------------------------------

    const isEndDate = (start, end) => {
      if (end == null) {
        return moment(start).format("YYYY-MM-DD")
      } else {
        return moment(end).format("YYYY-MM-DD")
      }
    }

    //Availability Stuff
    const [roomQuery, setRoomQuery] = useState(["1999-12-31"])
    const [listLoading, setListLoading] = useState(false);

    const fetchRoomList = async (roomSelection) => {
      setListLoading(true);
      try {
          setRoomQuery(await axios.get(`${process.env.REACT_APP_SRVR_URL}/availability/roomList/${roomSelection}`));
          setListLoading(false);
      } catch {
          alert('There was an error while loading the reservation data')
      }
    }
    
    
    return (
      <div className="ProfileContainer">
        <Button className="navBtn" onClick={handleShow}>
          Profile
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>CF Profile</Modal.Title>
            <ProfileEdit rerender={rerender} setRerender={setRerender} />

          </Modal.Header>
          <Modal.Body>
            <Image src={profileImage} alt="Profile" roundedCircle thumbnail width="200" ></Image>
            <div>
              <h4><strong>{sessionStorage.getItem("name")}</strong></h4>
              <h4><strong>{sessionStorage.getItem("email")}</strong></h4>
              <h4><strong>{sessionStorage.getItem("phone")}</strong></h4>
            </div>
            <br />
            <div className="model-reservation">
              <h6>Example calendar appearance:</h6>
              <Tippy 
                className="model-tippy"
                trigger="click"
                placement="top"
                touch="hold"
                theme="cedarF-theme"
                delay={250}
                content={
                  <div style={{maxWidth: 25+'vh'}}>
                    <h3>
                        {sessionStorage.getItem("name")}
                    </h3>
                    <hr style={{width: 25+'vh', marginBottom: 1+'vh', marginTop: 1+'vh'}}/>
                    <h5>Reserved Room</h5>
                    <p style={{marginBottom: 0}}>Boy side bunks: #ofBunks</p>
                    <p style={{marginBottom: 0}}>&</p>
                    <p style={{marginBottom: 1+'vh'}}>Girl side bunks: #ofBunks</p>
                    <hr style={{width: 25+'vh', marginBottom: 0}}/>
                    <p style={{marginBottom: .25+'vh', marginTop: .5+'vh'}}><u>Details:</u></p>
                    <p style={{marginBottom: 1+'vh', wordWrap: 'break-word'}}>Description of the reservation and/or details of the event in question.</p>
                  </div>
              }>
                <button type="button" className="model-button" style={
                  {
                    color: sessionStorage.getItem("textColor"),
                    backgroundColor: sessionStorage.getItem("backgroundColor"),
                    borderColor: sessionStorage.getItem("borderColor"),
                  }
                }>Reservation</button>
              </Tippy>
            </div>
            <hr />
            <FullCalendar
              plugins={[
                listPlugin,
                //interactionPlugin,
              ]}
              headerToolbar={{
                left: 'prev,next',
                right: 'title'
              }}
              initialView='listWeek'
              //selectable={true}
              events={userCalData}
              eventContent={reservationAppearance}
              eventClick={ (info) => {
                handleEditShow(
                  info.event.id,
                  info.event.title,
                  moment(info.event.start).format("YYYY-MM-DD"),
                  isEndDate(info.event.start, info.event.end),
                  info.event.extendedProps.description,
                  info.event.extendedProps.room,
                  info.event.extendedProps.boyBunkBeds,
                  info.event.extendedProps.girlBunkBeds);
              }}
              //eventClick={(info) => }
              eventDidMount={ (info) => {
                tippy(info.el, {
                  placement: 'top',
                  trigger: 'mouseenter focus',
                  theme: 'cedarF-theme',
                  touch: 'hold',
                  interactive: true,
                  allowHTML: true,
                  content: `
                    <h5><u>${info.event.extendedProps.room}</u></h5>
                    <p>Boy side bunks:${info.event.extendedProps.boyBunkBeds}</p><p>Girl side bunks: ${info.event.extendedProps.girlBunkBeds}</p>
                    <span>${info.event.extendedProps.description}</span><br/>
                  `
                })
              }}
            />
            
            <EditReservationForm
              editShow={editShow}
              resInfo={resInfo}
              setResInfo={setResInfo}
              fetchUserCalData={fetchUserCalData}
              handleEditClose={handleEditClose}
              roomQuery={roomQuery}
              setRoomQuery={setRoomQuery}
              listLoading={listLoading}
              setListLoading={setListLoading}
            />

            </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseUpdate}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}