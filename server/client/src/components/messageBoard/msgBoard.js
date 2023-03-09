import React, { useState, useEffect } from 'react';
//import date from 'date-and-time';
import { MsgList } from './msgList';
import { MsgForm } from './msgForm';
import { MsgPagination } from './msgPagination';
import axios from 'axios';
import './msgBoard.css';

// "author" will automatically be determined based off of who is logged in

export const MsgBoard = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    //Pagination info
    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 5;

    //Axios with async/await
    useEffect(() => {
        fetchData();
    }, [])

    //Data fetching
    const fetchData = async () => {
        setLoading(true);
        try{
            const res = await axios.get(`${process.env.REACT_APP_SRVR_URL}/messages/all`)
            setData(res.data);
            setLoading(false);
        } catch (error) {
            alert('There was an error while loading the message data')
        }
    }

    //State preparation
    const author = sessionStorage.getItem("name")
    const [mssg, setMssg] = useState('')

    //Form reset
    const handleMsgFormReset = () => {
        setMssg('')
    }

    //Axios POST for Form
    const handleMsgCreate = () => {
        //Send POST req to backend
        axios
            .post(`${process.env.REACT_APP_SRVR_URL}/messages/create`, {
                author: sessionStorage.getItem("name"),
                mssg: mssg
            })
            .then(res => {
                console.log(res.data);
                fetchData();
            })
            .catch(error => console.error(`There was an error creating the message by ${author}: ${error}`))
    }
    //Submit the POST
    const handleMsgPost = () => {
        //Check for fields filled correctly
        if (mssg.length > 0) {
            handleMsgCreate()
            console.info(`Message by ${author} created`)
            handleMsgFormReset()
        } else {
            alert(`Oh no, you forgot the message part or you clicked Post by accident!`)
        }
    }

    // Pagination variables
    const indexOfLastPost = currentPage * dataPerPage;
    const indexOfFirstPost = indexOfLastPost - dataPerPage;
    //Need to reverse the array to get the newest post at the top
    const reverseData = data.slice(0).reverse()
    const currentPosts = reverseData.slice(indexOfFirstPost, indexOfLastPost);
    const nPages = Math.ceil(data.length / dataPerPage)
    
    console.log(`The data is loading: ${loading}`)
    console.log(data[0])
    return (
        <div className="msgBoard-container">
            <h3 className="msgBoard-title">Message Board</h3>
            <MsgForm 
                handleMsgPost={handleMsgPost} 
                mssg={mssg}
                setMssg={setMssg}
            />
            <MsgList data={currentPosts}/>
            
            <MsgPagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
    )
};