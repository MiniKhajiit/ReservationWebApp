import React from 'react';
import Image from 'react-bootstrap/Image';

export var Message = ({ data }) => {
    return (
        <div className="msg-container">
            <div className="msg-author">
                <Image roundedCircle src={data.pic} />
                <p className="msg-author-name">{data.author}</p>
            </div>
            <div className="msg-message">
                <p>{data.mssg}</p>
                <br />
                <p>{data.time}</p>
            </div>
        </div>
    );
}