import React from 'react';
import Image from 'react-bootstrap/Image';
//import Button from 'react-bootstrap/Button';
//import axios from 'axios';
import profileImage from '../../default.png';


export const MsgList = ({ data }) => {

/*    //Delete a post
    const handleMsgDelete = (id) => {
        //Send PUT request
        axios
            .put('http://localhost:5000/messages/delete', {id: id})
            .then(() => {
                console.log(`Message by ${author} deleted`)
                fetchData()
            })
            .catch(error => console.error(`There was an error deleting the post by ${author}`))
    }
*/    

    return (
        <div className="msgList">
            {data.map(msg => (
                <div key={msg.id} className="msg-container">
                    <div className="msg-author">
                        <Image roundedCircle src={profileImage} width="50" />
                        <p className="msg-author-p">{msg.author}</p>
                    </div>
                    <div className="msg-message">
                        <p className="msg-message-p">{msg.mssg}</p>
                    </div>
                </div>
            ))}
        </div>
    )

};