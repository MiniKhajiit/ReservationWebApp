import React, { useState } from 'react';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Validate from './validation.js';
import useForm from './useForm.js';
//import profileImage from '../../default.png';


export function ProfileEdit({ rerender, setRerender }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const name = sessionStorage.getItem('name');

    //Logout after profile update to reset session
    const handleLogout = () => {
        sessionStorage.setItem("userAuth", 0);
        sessionStorage.removeItem("userData");
        window.location.reload();
    }

    //Update session storage on submission
    const newSessVars = (newData) => {
        if (newData.email) {sessionStorage.setItem("email", newData.email)}
        if (newData.phone) {sessionStorage.setItem("phone", newData.phone)}
        if (newData.backgroundColor) {sessionStorage.setItem("backgroundColor", newData.backgroundColor)}
        if (newData.borderColor) {sessionStorage.setItem("borderColor", newData.borderColor)}
        if (newData.textColor) {sessionStorage.setItem("textColor", newData.textColor)}
    }

    const sendForm = () => {
        console.log('NoErrors, submit sendForm called!');
        axios
            .put(`${process.env.REACT_APP_SRVR_URL}/profile/edit`, {
                name: sessionStorage.getItem("name"),
                email: values.email,
                phone: values.phone,
                backgroundColor: values.backgroundColor,
                borderColor: values.borderColor,
                textColor: values.textColor,
            })
            .then(close => {handleCloseReset(); newSessVars(values); setRerender(!rerender);})
            .catch(err => {alert(`Could not update profile: ${err}`)})
    }

    const updatePw = () => {
        console.log('No pw errors, submit updatePw called!')
        axios
            .put(`${process.env.REACT_APP_SRVR_URL}/profile/edit/pw`, {
                password: values.password
            })
            .then(close => {handleCloseReset(); handleLogout();})
            .catch(err => {alert(`Could not updat password: ${err}`)})
    }

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        handleReset,
    } = useForm(sendForm, updatePw, Validate);

    const handleCloseReset = () => {
        handleClose();
        handleReset();
    }


    return(
        <div className="ProfileEditContainer">
            <Button className="ProfileBtn" onClick={handleShow} variant="outline-danger">
                Edit Profile
            </Button>

            <Modal show={show} onHide={handleCloseReset}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit CF Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="profileEdit-container">
                        <form autoComplete="off" onSubmit={handleSubmit} noValidate>
                            <div className="pe-profileName">
                                <h2>{name}</h2>
                            </div>
                            <div className="field">
                                <label className="pe-label">Update your profile email:</label>
                                <div className="control">
                                    <input
                                        autoComplete="off"
                                        placeholder={sessionStorage.getItem("email")}
                                        type="email"
                                        className={`pe-input ${errors.email && 'is-danger'}`}
                                        name="email"
                                        onChange={handleChange}
                                        values={values.email || ""}
                                    />
                                    {errors.email && (
                                        <p className="help is-danger">{errors.email}</p>
                                    )}
                                </div>
                            </div>
                            <div className="field">
                                <label className="pe-label">Update your profile phone:</label>
                                <div className="control">
                                    <input
                                        autoComplete="off"
                                        placeholder={sessionStorage.getItem("phone")}
                                        type="text"
                                        className={`pe-input ${errors.phone && 'is-danger'}`}
                                        name="phone"
                                        onChange={handleChange}
                                        values={values.phone || ""}
                                    />
                                    {errors.phone && (
                                        <p className="help is-danger">{errors.phone}</p>
                                    )}
                                </div>
                            </div>
                            <div className="field">
                                <label className="pe-label">Update your password:</label>
                                <div className="control">
                                    <input
                                        autoComplete="off"
                                        type="password"
                                        className={`pe-input ${errors.ctrlPassword && 'is-danger'}`}
                                        name="ctrlPassword"
                                        onChange={handleChange}
                                        values={values.ctrlPassword || ""}
                                    />
                                    {errors.ctrlPassword && (
                                        <p className="help is-danger">{errors.ctrlPassword}</p>
                                    )}
                                </div>
                            </div> 
                            <div className="field">
                                <label className="pe-label">Confirm your new password:</label>
                                <div className="control">
                                    <input
                                        autoComplete="off"
                                        type="password"
                                        className={`pe-input ${errors.password && 'is-danger'}`}
                                        name="password"
                                        onChange={handleChange}
                                        values={values.password || ""}
                                    />
                                    {errors.password && (
                                        <p className="help is-danger">{errors.password}</p>
                                    )}
                                </div>
                            </div>
                            <hr />
                            <h3 className="pe-res-header">Customize your reservation style!</h3>
                            <div className="field">
                                <label className="pe-label">Change your background color:</label>
                                <div className="control">
                                    <input 
                                        autoComplete='off'
                                        className='pe-input'
                                        type="color"
                                        name="backgroundColor"
                                        placeholder={sessionStorage.getItem("backgroundColor")}
                                        value={values.backgroundColor || "#000000"}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="pe-label">Change your border color:</label>
                                <div className="control">
                                    <input 
                                        autoComplete='off'
                                        className="pe-input"
                                        type="color"
                                        name="borderColor"
                                        placeholder={sessionStorage.getItem("borderColor")}
                                        value={values.borderColor || "#000000"}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="pe-label">Change your text color:</label>
                                <div className="control">
                                    <input 
                                        autoComplete='off'
                                        className="pe-input"
                                        type="color"
                                        name="textColor"
                                        placeholder={sessionStorage.getItem("textColor")}
                                        value={values.textColor || "#ffffff"}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseReset}>
                                Cancel
                            </Button>
                            <Button variant="success" type="submit">
                                Save
                            </Button>
                        </Modal.Footer>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}