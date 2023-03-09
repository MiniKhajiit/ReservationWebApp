import React, { useState } from 'react';
import './contact.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export function ContactForm() {
    // The Form's modal functionaity
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // State prep
    const [author, setAuthor] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [validForm, setValidForm] = useState(true);

    // Form reset
    const handleContactFormReset = () => {
        setAuthor('');
        setMessage('');
        setEmail('');
    }

    const closeResetButton = () => {
        handleClose();
        handleContactFormReset();
    }

    // Axios POST for sending email
    const handleContactCreate = () => {
        //Send POST req to backend
        axios
            .post(`${process.env.REACT_APP_SRVR_URL}/contact/email`, {
                author: author,
                email: email,
                message: message
            })
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                alert(`There was an error sending the message`);
                console.error(`There was an error sending the contact email: ${error}`)
            })
    }

    // Contact Form Submission
    const validEmail = new RegExp('^[A-Za-z0-9_!#$%&\'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$', "gm");
    const handleValidation = () => {
        if (author.length > 3 && validEmail.test(email) && message.length > 3) {
            // This state is for a 'disabled' prop, so the boolean is reversed
            setValidForm(false)
        }
    }

    // Contact Form Submission
    const handleContactPost = () => {
        handleContactCreate();
        handleClose();
        handleContactFormReset();
        console.info(`Contact Email Attempting to be sent`)
    } 

    return (
        <div className="ContactContainer">
            <Button className="navBtn" onClick={handleShow}>
                Contact Support
            </Button>

            <Modal show={show} onHide={closeResetButton}>
                <Modal.Header closeButton>
                    <Modal.Title>Send an email to support below</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form autoComplete='off'>
                        <Form.Group className="contactDetails">
                            <Form.Label>Let us know who's asking:</Form.Label>
                            <Form.Control
                                value={author}
                                type="text"
                                placeholder="Your Name Here"
                                onChange={(e) => {
                                    setAuthor(e.currentTarget.value);
                                    handleValidation();
                                }}
                            />
                            <br />
                            <Form.Label>Please provide an email to respond to:</Form.Label>
                            <Form.Control
                                value={email}
                                type="email"
                                placeholder="example@email.com"
                                onChange={(e) => {
                                    setEmail(e.currentTarget.value);
                                    handleValidation();
                                }}
                            />
                        </Form.Group>
                        <br/>
                        <Form.Group className="contactMessage">
                            <Form.Label>What kinda help do ya need?</Form.Label>
                            <Form.Control
                                value={message}
                                as="textarea"
                                placeholder="You can send questions, concerns, issues, or just general inquiries. Response times vary as 'us' technically refers to a singular person who is the developer. But, 'we' will try to get back to you as soon as 'we' are able."
                                row={4}
                                onChange={(e) => {
                                    setMessage(e.currentTarget.value);
                                    handleValidation();
                                }}
                            />
                        </Form.Group>
                        <br />
                        <Button
                            as="input"
                            type="submit"
                            value="Send Message"
                            variant="outline-success"
                            onClick={handleContactPost}
                            disabled={validForm}
                        />
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )

}