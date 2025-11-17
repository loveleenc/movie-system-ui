import React, { useRef, useState } from "react"
import userService from "../../services/userService";
import { AxiosError, type AxiosResponse } from "axios"
import Header from "../Common/Header";
import { useNavigate } from "react-router-dom";
import NotificationDialog from "../Common/NotificationDialog";
import "../../styles/login.css"

const LoginPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [notification, setNotification] = useState<string>('');
    const notificationDialogRef = useRef<HTMLDialogElement | null>(null);

    const navigate = useNavigate();

    const onLogin = (event: React.SyntheticEvent) => {
        event.preventDefault();
        userService.login(username, password)
            .then((_response:AxiosResponse) => {
                setNotification("Login was successful. Redirecting...");
                setTimeout(() => navigate("/"), 1000);
            })
            .catch((error:AxiosError) => {
                if(error.response?.status === 401){
                    setNotification("Invalid username or password");
                    notificationDialogRef.current?.showModal();
                }
                else{
                    setNotification("Unable to login at the moment. Please try later.")
                    notificationDialogRef.current?.showModal();
                }
            })
    }


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
            </form>
        </div>
        </>
    )
}

export default LoginPage