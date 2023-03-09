import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form';

export function RoomSelection({ 
    resInfo,
    handleChange,
    handleRoomChange, }) {


    return (
        <>
            <Form.Group className="ResRmChoice" autoComplete="off">
                <Form.Label className="RRC-title">Which available room would you like to change to?</Form.Label>
                <div key="radio" className="RmSelections">
                    <Form.Check
                        inline
                        label="None/Hotel"
                        name="room"
                        type="radio"
                        id="Rm-NA"
                        value="~~~"
                        checked={resInfo.room === '~~~'}
                        onChange={handleRoomChange}
                    />
                    <Form.Check
                        inline
                        label="Barn Loft"
                        name="room"
                        type="radio"
                        id="Rm-BnLBr1"
                        value="Loft Bedroom"
                        checked={resInfo.room === "Loft Bedroom"}
                        onChange={handleRoomChange}
                    />
                <br />
                    <Form.Check
                        inline
                        label="Bedroom 1"
                        name="room"
                        type="radio"
                        id="Rm-MnBr1"
                        value="Bedroom 1"
                        checked={resInfo.room === "Bedroom 1"}
                        onChange={handleRoomChange}
                    />
                    <Form.Check
                        inline
                        label="Bedroom 2"
                        name="room"
                        type="radio"
                        id="Rm-MnBr2"
                        value="Bedroom 2"
                        checked={resInfo.room === "Bedroom 2"}
                        onChange={handleRoomChange}
                    />
                <br />
                    <Form.Check
                        inline
                        label="Bedroom 3"
                        name="room"
                        type="radio"
                        id="Rm-TpBr3"
                        value="Bedroom 3"
                        checked={resInfo.room === "Bedroom 3"}
                        onChange={handleRoomChange}
                    />
                    <Form.Check
                        inline
                        label="Bedroom 4"
                        name="room"
                        type="radio"
                        id="Rm-TpBr4"
                        value="Bedroom 4"
                        checked={resInfo.room === "Bedroom 4"}
                        onChange={handleRoomChange}
                    />
                    <Form.Check
                        inline
                        label="Bedroom 5"
                        name="room"
                        type="radio"
                        id="Rm-TpBr5"
                        value="Bedroom 5"
                        checked={resInfo.room === "Bedroom 5"}
                        onChange={handleRoomChange}
                    />
                </div>
            </Form.Group>
            <br />
            <Form.Group className="ResBnkChoice">
                <Form.Label>Edit Boys' Bunks</Form.Label>
                <Form.Select 
                    defaultValue={resInfo.boyBunkBeds}
                    onChange={handleChange} 
                    aria-label="Select the number of bunks from those remaining:" 
                    size="sm" 
                    name="boyBunkBeds"
                >
                    <option value="0">None</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </Form.Select>
                <br />
                <Form.Label>Edit Girls' Bunks</Form.Label>
                <Form.Select 
                    defaultValue={resInfo.girlBunkBeds}
                    onChange={handleChange} 
                    aria-label="Select the number of bunks from those remaining:" 
                    size="sm" 
                    name="girlBunkBeds"
                >
                    <option value="0">None</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </Form.Select>
            </Form.Group>
        </>
    )
}

