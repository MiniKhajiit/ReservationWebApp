import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const test_user1 = {
    name: "Dean Winchester",
    email: 'impala67@hotmail.com',
    phone: '866-907-3235',
    password: '**********',
    pic: './squirrel.jpeg'
}

/* When this form submits, I want it to submit as a background event
 Somewhere in the Write to database, it should have a property of -
 display: 'background'
 for the FullCalendar API to recognize it
*/

export function EventForm() {
    // Modal functions
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Adding email invites function
    // Thanks nishant-666 for your tutorial
    const [formFields, setFormFields] = useState([{name: "", email: ""},])

    const handleFormChange = (element, index) => {
        let data = [...formFields];
        data[index][element.target.name] = element.target.value;
        setFormFields(data);
    }

    /*const submit = (e) => {
        e.preventDefault();
        console.log(formFields)
      }*/
    
      const addFields = () => {
        let object = {
            name: '',
            email: ''
        }
    
        setFormFields([...formFields, object])
      }
    
      const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
      }
    
  
    return (
      <div className="EventFormContainer">
        <Button className="navBtn" onClick={handleShow}>
          Event
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Make an event and invite others!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form autoComplete="off">
              <p>{test_user1.name}</p>
              <p>{test_user1.email}</p>
              <Form.Group className="EventDate" autocomplete="off">
                  <Form.Label>Event Day 1</Form.Label>
                  <Form.Control type="date" />
                  <Form.Label>Final Event Day</Form.Label>
                  <Form.Control type="date" />
              </Form.Group>
                  <Form.Group className="EventInvites" autocomplete="off">
                      <Form.Label>Invite others:</Form.Label>
                      {formFields.map((form, index) => {
                          return (
                              <div>
                                  <Form.Control
                                      type="name"
                                      placeholder="Invitee's Name"
                                      value={form.name || ""}
                                      onChange={event => handleFormChange(event, index)}
                                  ></Form.Control>
                                  <Form.Control 
                                      type="email" 
                                      placeholder="Invitee's Email"
                                      value={form.email || ""} 
                                      onChange={event => handleFormChange(event, index)}
                                  ></Form.Control> 
                                  <Button className="emailRmv" variant="danger" onClick={() => removeFields(index)}>x</Button>
                              </div>
                          )
                      })}
          
                      <Form.Text>This will send them an email invite!</Form.Text>
                  </Form.Group> 
              
              <Button className="emailAdd" onClick={addFields}>+Add Email</Button>
            </Form>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={handleClose}>
              Save Event
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}