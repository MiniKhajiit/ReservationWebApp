import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form';

export function RoomSelection({ 
    room, 
    setRoom, 
    boyBunkBeds, 
    setBoyBunkBeds, 
    girlBunkBeds, 
    setGirlBunkBeds, 
    boyToggle, 
    girlToggle, 
    handleBoyToggleChecked, 
    handleGirlToggleChecked,
    fetchRoomList, }) {


    return (
        <>
            <Form.Group className="ResRmChoice" autoComplete="off">
                <Form.Label className="RRC-title">Which available room would you like to stay in?</Form.Label>
                <div key="radio" className="RmSelections">
                    <Form.Check 
                        inline label="None/Hotel"
                        name="Rooms"
                        type="radio"
                        id="Rm-NA"
                        value="~~~"
                        checked={room === '~~~'}
                        onChange={(e) => {setRoom(e.target.value); fetchRoomList(e.target.value);}}
                    />
                    <Form.Check
                        inline label="Barn Loft"
                        name="Rooms" 
                        type="radio"
                        id="Rm-BnLBr1"
                        value="Loft Bedroom"
                        checked={room === "Loft Bedroom"}
                        onChange={(e) => {setRoom(e.target.value); fetchRoomList(e.target.value);}}
                    />
                <br />
                    <Form.Check
                        inline label="Bedroom 1"
                        name="Rooms"
                        type="radio"
                        id="Rm-MnBr1"
                        value="Bedroom 1"
                        checked={room === "Bedroom 1"}
                        onChange={(e) => {setRoom(e.target.value); fetchRoomList(e.target.value);}}
                    />
                    <Form.Check
                        inline label="Bedroom 2"
                        name="Rooms"
                        type="radio"
                        id="Rm-MnBr2"
                        value="Bedroom 2"
                        checked={room === "Bedroom 2"}
                        onChange={(e) => {setRoom(e.target.value); fetchRoomList(e.target.value);}}
                    />
                <br />
                    <Form.Check
                        inline label="Bedroom 3"
                        name="Rooms"
                        type="radio"
                        id="Rm-TpBr3"
                        value="Bedroom 3"
                        checked={room === "Bedroom 3"}
                        onChange={(e) => {setRoom(e.target.value); fetchRoomList(e.target.value);}}
                    />
                    <Form.Check
                        inline
                        label="Bedroom 4"
                        name="Rooms"
                        type="radio"
                        id="Rm-TpBr4"
                        value="Bedroom 4"
                        checked={room === "Bedroom 4"}
                        onChange={(e) => {setRoom(e.target.value); fetchRoomList(e.target.value);}}
                    />
                    <Form.Check
                        inline
                        label="Bedroom 5"
                        name="Rooms"
                        type="radio"
                        id="Rm-TpBr5"
                        value="Bedroom 5"
                        checked={room === "Bedroom 5"}
                        onChange={(e) => {setRoom(e.target.value); fetchRoomList(e.target.value);}}
                    />
                </div>
            </Form.Group>
            <br />
            <Form.Group className="ResBnkChoice">
                <Form.Label>Do you need any bunk beds in the Boys' Room?</Form.Label>
                <Form.Check
                    type="switch"
                    id="BoyBunkSwitch"
                    onClick={handleBoyToggleChecked}
                />
                {boyToggle ? 
                    <Form.Select 
                        value={boyBunkBeds} 
                        onChange={(e) => {setBoyBunkBeds(e.target.value)}} 
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
                    </Form.Select> : <></>
                }
                <br />
                <Form.Label>Do you need any bunk beds in the Girls' Room?</Form.Label>
                <Form.Check
                    type="switch"
                    id="GirlBunkSwitch"
                    onClick={handleGirlToggleChecked}
                />
                {girlToggle ? 
                    <Form.Select 
                        value={girlBunkBeds} 
                        onChange={(e) => {setGirlBunkBeds(e.target.value)}} 
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
                    </Form.Select> : <></>
                }
            </Form.Group>
            </>
    )
}

