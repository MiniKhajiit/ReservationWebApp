import React, { useState, useEffect} from 'react';
import axios from 'axios';


export function DateAvailability({calData, startdate}) {
    //Fetch Data
    const fetchRoomList = async (roomSelection) => {
        setListLoading(true);
        if (roomSelection !== '~~~') {
            try {
                setRoomQuery(await axios.get(`${process.env.REACT_APP_PROD_URL}/availability/roomList/${roomSelection}`));
                setListLoading(false);
            } catch {
                alert('There was an error while loading the reservation data')
            }
        } else {
            setRoomQuery([])
        }
      };
      //Date Range from frontend
      // Date Availability
      const isDateAvailable = (rangeStart, rangeEnd) => {
        setCheckingAvailability(true);
        let allDatesCheck = [];
        //Form start:end dates
        let startDate = moment(rangeStart);
        let endDate = moment(rangeEnd);
        let diff = endDate.diff(startDate, 'days');
        let dateRange = [];
        for (let i=0; i < diff; i++) {
            dateRange.push(moment(rangeStart).add(i, 'days').format("YYYY-MM-DD"))
        }
        //^Form dates
        //Array of all events with currently selected Room
        var roomList = roomQuery.data;
        //Do the check if there are any events, otherwise skip and return 'available'
        if (roomList.length > 0) {
            //for every event in roomList, do these things
            for (let i=0; i < roomList.length; i++) {
                //make a new sub-date range for each event in roomList
                let bookedStart = moment(roomList[i].start);
                let bookedEnd = moment(roomList[i].end);
                let bookedDiff = bookedEnd.diff(bookedStart, 'days');
                //Isn't working for single day events - this if/else supports if multi-day else single-day functionality
                if (bookedDiff > 0) {
                    for (let i=0; i <= bookedDiff; i++) {
                        allDatesCheck.push(moment(bookedStart).add(i, 'days').format("YYYY-MM-DD"))
                    }
                } else {
                    allDatesCheck.push(moment(bookedStart).format("YYYY-MM-DD"))
                }
                //Now the allDates array should have a list of every date that contains the form's selected room
            }
            //And now we can iterate through the dateRange and check through our allDates array instead of just the roomList Object
            if (allDatesCheck.length > 0) {
                for (let i=0; i < dateRange.length; i++) {
                    if (allDatesCheck.some(date => date === dateRange[i])) {
                        setAvailable(false);
                        setCheckingAvailability(false);
                        setAvailabilityChecked(true);
                        break;
                    } else {
                        setAvailable(true);
                        setCheckingAvailability(false);
                        setAvailabilityChecked(true);
                    }
                }
            } else {
                setAvailable(true);
                setCheckingAvailability(false);
                setAvailabilityChecked(true);
            }
        } else {
            setAvailable(true);
            setCheckingAvailability(false);
            setAvailabilityChecked(true);
        }
        console.log(`Available? :${available}`)
        console.log(availabilityChecked)
        return available;
        //Returns the state of available in order to proceed with sending the event through
    }

}