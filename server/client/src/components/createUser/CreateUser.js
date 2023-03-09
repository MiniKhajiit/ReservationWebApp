//https://github.com/upmostly/custom-react-hooks-form-validation/blob/master/src/Form.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Validate from './validation.js';
import useForm from './useForm.js';
import axios from 'axios';
import './CreateUser.css'


export function CreateUserForm() {
 
    //modal functionality
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(sendForm, Validate);

    function sendForm() {
        console.log('NoErrors, submit sendForm called!');
        axios.post(`${process.env.REACT_APP_SRVR_URL}/signup/create`, {
                name: values.name,
                email: values.email,
                phone: values.phone,
                password: values.password,
        }).then(res => {
            console.log(res.data);
        }).catch(error => {
            console.error(`There was an error creating the user: ${error}`);
            alert(`${error}`);
        })
        alert(`An email has been sent to '${values.email}' for verification.`);
        handleClose();
    }


    return(
        <div className="createUser-container">
            <Button className="createUserButton" onClick={handleShow} variant="secondary" >
                Create New User
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New User</Modal.Title>
                </Modal.Header>                                
                <Modal.Body>
                    <div className="createUser-container">
                        <div className="extra-container">
                            <form noValidate>
                                <div className="field">
                                    <label className="create-user-label">Enter your full name</label>
                                    <div className="control">
                                        <input autoComplete="off" className={`create-user-input ${errors.name && 'is-danger'}`} type="text" name="name" onChange={handleChange} value={values.name || ""} required />
                                        {errors.name && (
                                            <p className="help is-danger">{errors.name}</p>
                                        )}
                                    </div>
                                </div>
                                <br />
                                <div className="field">
                                    <label className="create-user-label">Enter an email</label>
                                    <div className="control">
                                        <input autoComplete="off" className={`create-user-input ${errors.email && 'is-danger'}`} type="email" name="email" onChange={handleChange} value={values.email || ""} required />
                                        {errors.email && (
                                            <p className="help is-danger">{errors.email}</p>
                                        )}
                                    </div>
                                </div>
                                <br />
                                <div className="field">
                                    <label className="create-user-label">Enter your phone</label>
                                    <div className="control">
                                        <input autoComplete="off" className={`create-user-input ${errors.phone && 'is-danger'}`} type="text" name="phone" onChange={handleChange} value={values.phone || ""} />
                                        {errors.phone && (
                                            <p className="help is-danger">{errors.phone}</p>
                                        )}
                                    </div>
                                </div>
                                <br />
                                <div className="field">
                                    <label className="create-user-label">Enter a password</label>
                                    <div className="control">
                                        <input autoComplete="off" className={`create-user-input ${errors.ctrlPassword && 'is-danger'}`} type="password" name="ctrlPassword" onChange={handleChange} value={values.ctrlPassword || ""} required />
                                        {errors.ctrlPassword && (
                                            <p className="help is-danger">{errors.ctrlPassword}</p>
                                        )}
                                    </div>
                                </div>
                                <br />
                                <div className="field">
                                    <label className="create-user-label">Please confirm your password</label>
                                    <div className="control">
                                        <input autoComplete="off" className={`create-user-input ${errors.password && 'is-danger'}`} type="password" name="password" onChange={handleChange} value={values.password || ""} required />
                                        {errors.password && (
                                            <p className="help is-danger">{errors.password}</p>
                                        )}
                                    </div>
                                </div>
                                <br />
                                <Button type="submit" onClick={handleSubmit} variant="outline-danger" className="create-user-button">Create User</Button>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
/*    
    return(
        <div className="createUser-container">
            <Button className="createUserButton" onClick={handleShow} variant="secondary" >
                Create New User
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New User</Modal.Title>
                </Modal.Header>                                
                <Modal.Body>
                    <Form autoComplete="off" onSubmit={handleSubmit} noValidate>
                        <Form.Group>
                                <Form.Label>Enter your first and last name</Form.Label>
                                <Form.Control
                                    name="name"
                                    type="text"
                                    required
                                    value={values.name || ''}
                                    size="lg"
                                    placeholder="Markham McMullen"
                                    onChange={handleChange}
                                    isValid={false}
                                />
                                <Form.Control.Feedback type="invalid">
                                    error
                                </Form.Control.Feedback>
                        </Form.Group>
                            <br/>
                        <Form.Group>
                                <Form.Label>Enter your Email Address</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    required
                                    value={values.email || ''}
                                    placeholder="MarkhamMcMullen@cedarfalls.cc"
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                        </Form.Group>
                            <br/>
                        <Form.Group>
                                <Form.Label>Enter your phone number (Optional)</Form.Label>
                                <Form.Control
                                    name="phone"
                                    type="text"
                                    value={values.phone || ''}
                                    placeholder="555-867-5309"
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phone}
                                </Form.Control.Feedback>
                        </Form.Group>
                            <br/>
                        <Form.Group>
                                <FloatingLabel
                                    controlId="floatingInput1"
                                    label="Enter a Password"
                                >
                                    <Form.Control
                                        name="ctrlPassword"
                                        type="password"
                                        required
                                        value={values.ctrlPassword || ''}
                                        onChange={handleChange}
                                        placeholder="Enter a Password"
                                    />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">
                                    {errors.ctrlPassword}
                                </Form.Control.Feedback>
                        </Form.Group>
                            <br/>
                        <Form.Group>
                                <FloatingLabel
                                    controlId="floatingInput2"
                                    label="Confirm your Password"
                                >
                                    <Form.Control
                                        name="password"
                                        type="password"
                                        required
                                        value={values.password || ''}
                                        onChange={handleChange}
                                        placeholder="Confirm your Password"
                                    />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                        </Form.Group>
                            <br />
                        <Button 
                            className="submitCreateUser"
                            as="input"
                            type="submit"
                            value="Create User"
                            variant="success"
                        />
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
*/
}