import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { CreateUserForm } from '../createUser/CreateUser.js';
import { LoginNavi } from '../navbar/loginNav.js';

function Login({ setUserData, setUserLoading, setUserAuth }) {

    //State prep for logged in user
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginReset = () => {
        setName('')
        setPassword('')
    }

    //post for login check
    const handleLoginAttempt = async () => {
        await axios
            .post(`${process.env.REACT_APP_SRVR_URL}/login/login`, {
                name: name,
                password: password
            })
            .then(res => {
                console.log(`User [${name}] attempted login`);
                setUserLoading(true);
                console.log(res)
                setUserData(res.data)
                setUserAuth(1)
                handleLoginReset()
                sessionStorage.setItem("userAuth", 1)
                sessionStorage.setItem("userData", JSON.stringify(res.data))
                sessionStorage.setItem("id", res.data.id)
                sessionStorage.setItem("name", res.data.name)
                sessionStorage.setItem("userID", res.data.userID)
                sessionStorage.setItem("email", res.data.email)
                sessionStorage.setItem("phone", res.data.phone)
                sessionStorage.setItem("backgroundColor", res.data.backgroundColor)
                sessionStorage.setItem("borderColor", res.data.borderColor)
                sessionStorage.setItem("textColor", res.data.textColor)
            })
            .catch(error => {
                console.error(error);
                alert(error.response.data.error);
            })
            
        return {}
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            handleLoginAttempt();
        } catch (err) {
            console.log(err);
        }
        setUserAuth(sessionStorage.getItem("userAuth"))
    }

    return (
        <div className="login-page">
            <LoginNavi />
            <div className="login-screen">
                <div className="login-container">
                    <h1 className="login-h1">Please Log In</h1>
                    <Form>
                        <Form.Group>
                            <Form.Label>Enter your name</Form.Label>
                            <Form.Control 
                                id="loginName"
                                value={name}
                                placeholder="Markham McMullen"
                                onChange={(e) => setName(e.currentTarget.value)}
                                size="lg"
                            />
                            <br />
                            <Form.Control
                                id="loginPassword"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.currentTarget.value)}
                                size="lg"
                                type="password"
                            />
                            <div className="loginPageButtons">
                                <Button
                                    as="input"
                                    type="submit"
                                    value="Sign In"
                                    variant="dark"
                                    onClick={handleSubmit}
                                />
                                <CreateUserForm />
                            </div>
                        </Form.Group>

                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;