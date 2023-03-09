import React, { useState } from 'react';
import './DocDisplay.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { LoginWelcome } from './LoginWelcome.js';
import { Directions } from './Directions.js';

export function LoginDocDisplay(){
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

            <Modal show={show} size="lg" onHide={handleClose}>
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
                            <LoginWelcome />
                        </Tab>
                        <Tab eventKey="Directions" title="Directions">
                            <Directions />
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