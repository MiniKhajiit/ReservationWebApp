import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { RoomSelection } from '../RoomAvailability/RoomSelectionForm';
import axios from 'axios';
import moment from 'moment';

export function ResForm({ calData, fetchCalData, users }) {
    // The Form's modal functionaity
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // The Form's Room selection toggle view via the switch
    const [toggle, setToggle] = useState(false)
    
    const handleToggleChecked = () => {
      setToggle(!toggle);
    }

    //The Form's bunk bed toggling within the Room Selection Form Group
    const [boyToggle, setBoyToggle] = useState(false)
    const handleBoyToggleChecked = () => {
      setBoyToggle(!boyToggle);
    }

    const [girlToggle, setGirlToggle] = useState(false)
    const handleGirlToggleChecked = () => {
      setGirlToggle(!girlToggle);
    }

    //State Prep
    const [title, setTitle] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [description, setDescription] = useState('')
    const [room, setRoom] = useState('~~~')
    const [boyBunkBeds, setBoyBunkBeds] = useState("0")
    const [girlBunkBeds, setGirlBunkBeds] = useState("0")
    const [roomQuery, setRoomQuery] = useState(["1999-12-31"])
    const [listLoading, setListLoading] = useState(false);
    //const [checkingAvailability, setCheckingAvailability] = useState(false);

    //Room Availability-------------------------------------\
    //Fetch Data
    const fetchRoomList = async (roomSelection) => {
      setListLoading(true);
      try {
          setRoomQuery(await axios.get(`${process.env.REACT_APP_SRVR_URL}/availability/roomList/${roomSelection}`));
          setListLoading(false);
      } catch {
          alert('There was an error while loading the reservation data')
      }
    };
    //Date Range from frontend
    // Date Availability
    const isDateAvailable = () => {
      if (room !== "~~~") {
        const allDatesCheck = [];
        //Form start:end dates
        const diff = moment(end).diff(moment(start), 'days');
        const dateRange = [];
        if (dateRange.length > 1) {
          for (let i=0; i < diff; i++) {
              dateRange.push(moment(start).add(i, 'days').format("YYYY-MM-DD"))
          }
        } else {
          dateRange.push(moment(start).format("YYYY-MM-DD"))
        }
        //^Form dates
        //Array of all events with currently selected Room
        const roomList = roomQuery.data;
        //Do the check if there are any events, otherwise skip and return 'available'
        if (roomList.length > 0) {
            //for every event in roomList, do these things
            for (let i=0; i < roomList.length; i++) {
                //make a new sub-date range for each event in roomList
                const bookedStart = moment(roomList[i].start);
                const bookedEnd = moment(roomList[i].end);
                const bookedDiff = bookedEnd.diff(bookedStart, 'days');
                //Isn't working for single day events - this if/else supports if multi-day else single-day functionality
                if (bookedDiff > 0) {
                    for (let i=0; i <= bookedDiff; i++) {
                        allDatesCheck.push(moment(bookedStart).add(i, 'days').format("YYYY-MM-DD"))
                    }
                } else {
                    allDatesCheck.push(moment(bookedStart).format("YYYY-MM-DD"))
                }
                //Now the allDates array should have a list of every date that contains the form's selected room
            }
            //And now we can iterate through the dateRange and check through our allDates array instead of just the roomList Object
            if (allDatesCheck.length > 0) {
                for (let i=0; i < dateRange.length; i++) {
                    if (allDatesCheck.some(date => date === dateRange[i])) {
                        return false;
                    } else {
                        return true;
                    }
                }
            } else {
                return true;
            }
        } else {
            return true
        }
        //Returns the state of available in order to proceed with sending the event through
      } else {
        return true
      }
  }
    //Room Availability ----------------------------------------/

    //Form reset
    const handleResFormReset = () => {
        setTitle('')
        setStart('')
        setEnd('')
        setDescription('')
        setRoom('')
        setToggle(false)
        setBoyBunkBeds("0")
        setGirlBunkBeds("0")
        setBoyToggle(false)
        setGirlToggle(false)
        setListLoading(false)
        setRoomQuery(["1999-12-31"])
    }

    //Close&reset dual-function
    const closeResetButton = () => {
      handleClose();
      handleResFormReset();
    }

    //Axios POST for Form
    const handleResCreate = () => {
        //Send POST req to backend
        axios
            .post(`${process.env.REACT_APP_SRVR_URL}/reservation/create`, {
                title: title,
                author: sessionStorage.getItem("name"),
                start: start,
                end: end,
                description: description,
                backgroundColor: sessionStorage.getItem("backgroundColor"),
                borderColor: sessionStorage.getItem("borderColor"),
                textColor: sessionStorage.getItem("textColor"),
                room: room,
                boyBunkBeds: boyBunkBeds,
                girlBunkBeds: girlBunkBeds
            })
            .then(res => {
                console.log(res.data);
                fetchCalData();
            })
            .catch(error => console.error(`There was an error creating the reservation: ${error}`))
    }

    //Submit the POST
    const handleResPost = () => {
        if (!listLoading && isDateAvailable()) {
          //Check for fields filled correctly
          if (title.length > 0 && moment(start).isValid() && moment(end).isValid()) {
              console.info(`Reservation ${title} created`)
              console.log(roomQuery.data)
              handleResCreate();
              handleResFormReset();
              handleClose();
          } else {
              alert(`Oops, you forgot the important 'Title' and either one or both 'Date'`)
          }
        } else {
          alert(`I'm sorry, but that room has been taken for at least one of the days during your stay.`)
        }
    }
  
    return (
      <div className="ResContainer">
        <Button className="navBtn" onClick={handleShow}>
          Reservation
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Submit your stay!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form autoComplete="off">
              <p>{sessionStorage.getItem("name")}</p>
              <p>{sessionStorage.getItem("email")}</p>
              <Form.Group className="eventDescr">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                  id="ResTitle"
                  value={title}
                  type="text"
                  size="lg"
                  placeholder="water you doing?"
                  onChange={(e) => setTitle(e.currentTarget.value)}
                />
                <Form.Label>Add a description?</Form.Label>
                <Form.Control 
                  id="ResDescription"
                  value={description}
                  type="textarea"
                  size="sm"
                  placeholder="not much, water bout you?"
                  onChange={(e) => setDescription(e.currentTarget.value)}
                />
              </Form.Group>
              <br />
              <Form.Group className="ResDate">
                  <Form.Label>Arrival Date</Form.Label>
                  <Form.Control 
                    id="ResStart"
                    value={start}
                    type="date"
                    placeholder="00/00/0000"
                    onChange={(e) => {
                      setStart(e.currentTarget.value);
                    }}
                  />
                  <Form.Label>Departure Date</Form.Label>
                  <Form.Control 
                    id="ResEnd"
                    value={end}
                    type="date"
                    placeholder="00/00/0000"
                    onChange={(e) => {
                      setEnd(e.currentTarget.value);
                    }}
                  />
              </Form.Group>
              <br />
              <br />
              <Form.Label>Staying the night at Cedar Falls Ranch?</Form.Label>
              <Form.Check
                defaultChecked={false}
                type="switch"
                id="ResRmSwitch"
                onClick={handleToggleChecked}
              />
              <br />
              {toggle ? <RoomSelection 
                room={room}
                boyBunkBeds={boyBunkBeds}
                girlBunkBeds={girlBunkBeds}
                setRoom={setRoom}
                setBoyBunkBeds={setBoyBunkBeds}
                setGirlBunkBeds={setGirlBunkBeds}
                boyToggle={boyToggle}
                girlToggle={girlToggle}
                handleBoyToggleChecked={handleBoyToggleChecked}
                handleGirlToggleChecked={handleGirlToggleChecked}
                fetchRoomList={fetchRoomList}
              /> : <></>}
            </Form>
            </Modal.Body>
          <Modal.Footer>
            <Button 
              value="Close"
              variant="secondary"
              onClick={closeResetButton}
            >Close</Button>
            <Button 
              as="input"
              type="submit"
              value="Save Event"
              variant="danger"
              onClick={handleResPost}
            />
          </Modal.Footer>
        </Modal>
      </div>
    );
}


//The buttons should have some type of "selection" that when the form submits it will update the RoomAvailability component