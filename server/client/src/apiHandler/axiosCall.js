import axios from 'axios';

// it might also be -- return (await calRes).data; -- instead

// Dashboard File
export async function fetchCalData() {
    const calRes = axios.get(`${process.env.REACT_APP_SRVR_URL}/reservation/all`);
    return await calRes.data;
};

export async function fetchUsers() {
    const userList = axios.get(`${process.env.REACT_APP_SRVR_URL}/users/all`);
    return await userList.data;
};

//Reservation
export async function fetchRoomList(roomSelection) {
    const roomList = axios.get(`${process.env.REACT_APP_SRVR_URL}/availability/roomList/${roomSelection}`);
    return await roomList.data;
};
export async function handleResCreate(title, start, end, description, room, boyBunkBeds, girlBunkBeds) {
    axios
        .post(`${process.env.REACT_APP_SRVR_URL}/reservation/create`, {
            title: title,
            author: sessionStorage.getItem("name"),
            start: start,
            end: end,
            description: description,
            backgroundColor: sessionStorage.getItem("backgroundColor"),
            borderColor: sessionStorage.getItem("borderColor"),
            textColor: sessionStorage.getItem("textColor"),
            room: room,
            boyBunkBeds: boyBunkBeds,
            girlBunkBeds: girlBunkBeds
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(error => console.error(`There was an error creating the reservation: ${error}`));
};

//contact
export async function handleContactCreate(author, email, message) {
    axios
        .post(`${process.env.REACT_APP_SRVR_URL}/contact/email`, {
            author: author,
            email: email,
            message: message
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(error => {
            alert(`There was an error sending the message`);
            console.error(`There was an error sending the contact email: ${error}`)
        });
};

//CreateUser
export async function sendForm(name, email, phone, password) {
    axios.post(`${process.env.REACT_APP_SRVR_URL}/signup/create`, {
        name: name,
        email: email,
        phone: phone,
        password: password,
    }).then(res => {
        console.log(res.data);
    }).catch(error => {
        console.error(`There was an error creating the user: ${error}`);
        alert(`${error}`);
    })
}

//useForm (createUser/profile)
export async function FetchUsers() {
    const res =  axios.get(`${process.env.REACT_APP_SRVR_URL}/users/all`);
    return await res.data;
};

//Login
export async function handleLoginAttempt(name, password) {
    axios
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
        .catch(error => console.error(error));
};

export async function refreshToken(refreshToken) {
    const res = axios.post(`${process.env.REACT_APP_SRVR_URL}/login/refresh`, { token: refreshToken });
    return await res.data;
};

//msgBoard
export async function fetchData() {
    const res = axios.get(`${process.env.REACT_APP_SRVR_URL}/messages/all`);
    return await res.data;
};

export async function handleMsgCreate(author, mssg) {
    //Send POST req to backend
    axios
        .post(`${process.env.REACT_APP_SRVR_URL}/messages/create`, {
            author: sessionStorage.getItem("name"),
            mssg: mssg
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(error => console.error(`There was an error creating the message by ${author}: ${error}`));
};

//Profile
export async function fetchUserCalData(name) {
    const userCalRes = axios.get(`${process.env.REACT_APP_SRVR_URL}/reservation/user/${sessionStorage.getItem("name")}`);
    return await userCalRes.data;
};

export async function fetchRoomList() {
    const roomQuery = axios.get(`${process.env.REACT_APP_SRVR_URL}/availability/roomList/${roomSelection}`);
    return await roomQuery.data;
};

//ProfileEdit
export async function updatePw(password) {
    axios
        .put(`${process.env.REACT_APP_SRVR_URL}/profile/edit/pw`, {
            password: values.password
        })
        .then(close => {handleCloseReset(); handleLogout();})
        .catch(err => {alert(`Could not updat password: ${err}`)});
};

export async function sendForm(name, email, phone, backgroundColor, borderColor, textColor) {
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
        .catch(err => {alert(`Could not update profile: ${err}`)});
};

//EditReservation
export async function fetchRoomList(roomSleection) {
    const roomQuery = axios.get(`${process.env.REACT_APP_SRVR_URL}/availability/roomList/${roomSelection}`);
    return await roomQuery.data
};
//verifyWelcomePage
export async function welcomeUrl() {
    axios
        .get(`${process.env.REACT_APP_SRVR_URL}/signup/user/create/verify/${confirmationCode}`)
        .then((response) => {
        console.log(response.confirmationCode)
        return response.confirmationCode;
    });
}