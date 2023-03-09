import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import profileImage from '../../default.png';


export const MsgForm = ({ mssg, setMssg, handleMsgPost }) => {

    return (
        <div className="msgForm-container">
            <Form onSubmit={handleMsgPost} autoComplete="off">
            <div className="msg-author">
                <Image roundedCircle width="50" src={profileImage} />
                <p><strong>{sessionStorage.getItem("name")}</strong></p>
            </div>
            <br />
                <Form.Group className="msgForm">
                    <Form.Control
                        as="textarea"
                        placeholder="Enter message here!"
                        rows={4}
                        className="mssg"
                        value={mssg}
                        onChange={(e) => setMssg(e.currentTarget.value)}
                        />
                </Form.Group>
            </Form>
            <br />
            <Button 
                as="input"
                type="submit"
                value="Post"
                variant="outline-danger"
                onClick={handleMsgPost}
            />
        </div>
    )
};