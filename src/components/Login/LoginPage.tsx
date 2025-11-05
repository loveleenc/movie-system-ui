import React, { useState } from "react"
import userService from "../../services/userService";
import { AxiosError, type AxiosResponse } from "axios"
import Header from "../Header";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [notification, setNotification] = useState<string>('');
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
                }
                else{
                    setNotification("Unable to login at the moment. Please try later.")
                }
            })
    }


    return (
        <>
        <Header />
        <div>{notification}</div>
        <form onSubmit={onLogin}>
            <div>username: <input type='text' onChange={(event) => setUsername(event.target.value)}/>
            </div>
            <div>password: <input type='password' onChange={(event) => setPassword(event.target.value)}/></div>
            <button type="submit">Login</button>
        </form>
        </>
    )
}

export default LoginPage