import React from 'react';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'tippy.js/dist/tippy.css';
import Form from 'react-bootstrap/Form';
import { RoomSelection } from '../RoomAvailability/EditRoomSelectionForm';
import axios from 'axios';
import moment from 'moment';

export function EditReservationForm ({ editShow, resInfo, setResInfo, fetchUserCalData, handleEditClose, roomQuery, setRoomQuery, listLoading, setListLoading }) {
    
    //Input change/update
    const handleChange = (event) => {
        event.persist();
        setResInfo(resInfo => ({ ...resInfo, [event.target.name]: event.target.value }));
    };
    const handleRoomChange = (event) => {
        event.persist();
        setResInfo(resInfo => ({ ...resInfo, [event.target.name]: event.target.value }));
        fetchRoomList(event.target.value);
    };


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
        if (resInfo.room !== "~~~") {
            const allDatesCheck = [];
            //Form start:end dates
            const diff = moment(resInfo.end).diff(moment(resInfo.start), 'days');
            const dateRange = [];
            if (dateRange.length > 1) {
                for (let i=0; i < diff; i++) {
                    dateRange.push(moment(resInfo.start).add(i, 'days').format("YYYY-MM-DD"))
                }
            } else {
                dateRange.push(moment(resInfo.start).format("YYYY-MM-DD"))
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
                return true;
            }
            //Returns the state of available in order to proceed with sending the event through
        } else {
            return true;
        }
    }
    //Room Availability ----------------------------------------/

    const editCloseReset = () => {
        handleEditClose();
        setResInfo({});
        setRoomQuery([])
    }

    const deleteRes = () => {
        if (window.confirm("Do you want to delete this reservation?")) {
        axios
            .delete(`${process.env.REACT_APP_SRVR_URL}/reservation/delete/${resInfo.id}`)
            .then(() => {fetchUserCalData(); editCloseReset(); alert('Reservation successfully deleted'); window.location.reload();})
            .catch(err => {alert(`There was an error deleting this reservation: ${err}`)})
        }
    }

    const handleUpdateRes = () => {
        axios
            .put(`${process.env.REACT_APP_SRVR_URL}/reservation/edit`, {
                id: resInfo.id,
                title: resInfo.title,
                start: resInfo.start,
                end: resInfo.end,
                description: resInfo.description,
                room: resInfo.room,
                boyBunkBeds: resInfo.boyBunkBeds,
                girlBunkBeds: resInfo.girlBunkBeds,
            })
            .then(() => {fetchUserCalData(); editCloseReset();})
            .catch(err => {alert(`There was an error editing this reservation: ${err}`)})
    }
    //Submit the POST
    const handleEditResPost = () => {
        if (!listLoading && isDateAvailable()) {
            //Check for fields filled correctly
            if (resInfo.title.length > 0 && moment(resInfo.start).isValid() && moment(resInfo.end).isValid()) {
                handleUpdateRes()
                console.info(`Reservation ${resInfo.title} updated`)
                editCloseReset()
            } else {
                alert(`Oops, you forgot the important 'Title' and either one or both 'Date'`)
            }
        } else {
            alert(`I'm sorry, but that room appears to be occupied on your date range.`)
        }
    }


    return (
        <div className="resEdit-container">
            <Modal show={editShow} onHide={editCloseReset}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p>{resInfo.title}</p>
                <Form autoComplete="off">
                    <Form.Group className="eventDescr">
                    <Form.Label>Edit Title</Form.Label>
                    <Form.Control 
                        id="ResTitle"
                        name="title"
                        defaultValue={resInfo.title}
                        type="text"
                        size="lg"
                        onChange={handleChange}
                    />
                    <Form.Label>Edit Description</Form.Label>
                    <Form.Control 
                        id="ResDescription"
                        name="description"
                        defaultValue={resInfo.description}
                        type="textarea"
                        size="sm"
                        onChange={handleChange}
                    />
                    </Form.Group>
                    <br />
                    <Form.Group className="ResDate">
                    <Form.Label>Edit Arrival Date</Form.Label>
                    <Form.Control 
                        id="ResStart"
                        name="start"
                        //value={start}
                        defaultValue={resInfo.start}
                        type="date"
                        onChange={handleChange}
                    />
                    <Form.Label>Edit Departure Date</Form.Label>
                    <Form.Control 
                        id="ResEnd"
                        name="end"
                        type="date"
                        //value={end}
                        defaultValue={resInfo.end}
                        onChange={handleChange}
                    />
                    </Form.Group>
                    <br />
                    <br />
                    <Form.Label>Edit Sleeping Arrangements</Form.Label>
                    <RoomSelection 
                        resInfo={resInfo}
                        handleChange={handleChange}
                        handleRoomChange={handleRoomChange}
                    />
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleEditResPost}>Submit</Button>
                    <Button onClick={editCloseReset}>Cancel</Button>
                    <Button onClick={deleteRes} variant="outline-danger">Delete</Button>
                </Modal.Footer> 
            </Modal>
        </div>
    )
}