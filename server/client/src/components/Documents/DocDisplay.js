import React, { useState } from 'react';
import './DocDisplay.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Welcome } from './Welcome.js';
import { Directions } from './Directions.js';
import { HouseGuide } from './HouseGuide.js';
//import { BarnGuide } from './BarnGuide.js';
//import { VehiclesGuide } from './VehiclesGuide.js';
import { UserList } from './UserList.js';

export function DocDisplay({ users }){
    // The Form's modal functionaity
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Different details

    return(
        <div className="DocDisplayContainer">
            <Button className="navBtn" onClick={handleShow}>
                Documents
            </Button>

            <Modal show={show} size="xl" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Documents</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        className="docs-tabs"
                        fill
                        justify
                        defaultActiveKey="Welcome"
                    >
                        <Tab eventKey="Welcome" title="Welcome">
                            <Welcome />
                        </Tab>
                        <Tab eventKey="Directions" title="Directions">
                            <Directions />
                        </Tab>
                        <Tab eventKey="HouseGuide" title="House Guide">
                            <HouseGuide />
                        </Tab>
                        <Tab eventKey="User List" title="User List">
                            <UserList users={users}/>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        value="Close"
                        variant="outline-danger"
                        onClick={handleClose}
                    >Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}