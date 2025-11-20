import { useEffect, useState } from "react"
import userService from "../../services/userService";
import { AxiosError, type AxiosResponse } from "axios"
import Header from "../Common/Header";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/loginSignUp.css"

const Activate = () => {
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();
    const id = useParams<string>().id as string;
    
    useEffect(() => {
        userService.activateUserAccount(id)
            .then((response:AxiosResponse) => {
                setMessage(response.data as string + " Navigating you to login...")
                setTimeout(() => navigate("/user/login"), 3000);
            })
            .catch((error:AxiosError) => setMessage(error.response?.data as string));

    }, [])

    return (
        <>
        <Header />
        <div className="loginSignupContainer commonFontColor">
            <h1 style={{textAlign: "center"}}>User Account Activation</h1>
            <div>{message}</div>
        </div>
        </>
    )
}

export default Activate