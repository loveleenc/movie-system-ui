import React, { useEffect, useRef, useState } from "react"
import userService from "../../services/userService";
import { AxiosError, type AxiosResponse } from "axios"
import Header from "../Common/Header";
import { Link, useNavigate } from "react-router-dom";
import NotificationDialog from "../Common/NotificationDialog";
import "../../styles/loginSignUp.css"

const LoginPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [notification, setNotification] = useState<string>('');
    const notificationDialogRef = useRef<HTMLDialogElement | null>(null);
    const [notificationCounter, setNotificationCounter] = useState<number>(0);

    const navigate = useNavigate();

    const onLogin = (event: React.SyntheticEvent) => {
        event.preventDefault();
        userService.login(username, password)
            .then((_response:AxiosResponse) => {
                setNotification("Login was successful. Redirecting...");
                setNotificationCounter(notificationCounter + 1);
                setTimeout(() => navigate("/"), 2000);
            })
            .catch((error:AxiosError) => {
                if(error.response?.status === 401){
                    setNotification("Invalid username or password");
                }
                else if(!error.response){
                setNotification("Something has gone wrong. Please check your internet connection");
                }
                else{
                    setNotification("Unable to login at the moment. Please try later.")
                }
                setNotificationCounter(notificationCounter + 1);
            })
            
    }

    useEffect(() => {
        if(notification !== ""){
            notificationDialogRef.current?.showModal();
        }
    }, [notificationCounter])

    return (
        <>
        <Header />
        <div className="loginSignupContainer">
            <h1 className="commonFontColor" style={{textAlign: "center"}}>Login</h1>
            <NotificationDialog message={notification} dialogRef={notificationDialogRef}/>
            <form onSubmit={onLogin} className="commonFontColor">
                <div >username: <input className="loginInput" type='text' onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div>password: <input className="loginInput" type='password' onChange={(event) => setPassword(event.target.value)}/></div>
                <button className="navigationBarButton" type="submit">Login</button>
                <div>New User? <Link className="newUserSignupText" to="/user/signup">Sign up</Link></div>
            </form>
        </div>
        </>
    )
}

export default LoginPage