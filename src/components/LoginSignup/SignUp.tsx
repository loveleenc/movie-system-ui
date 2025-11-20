import { useEffect, useRef, useState } from "react";
import Header from "../Common/Header";
import NotificationDialog from "../Common/NotificationDialog";
import { AccountType, NewUser } from "../../types/user";
import userService from "../../services/userService";
import { AxiosError, AxiosResponse } from "axios";

interface UserTypeHTMLInputElement extends HTMLInputElement {
    value: AccountType;
}

const SignUp = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [userEmail, setUserEmail]= useState<string>('');
    const [userTypes, setUserTypes] = useState<AccountType[]>([]);
    const [notification, setNotification] = useState<string>('');
    const [notificationCounter, setNotificationCounter] = useState<number>(0);
    const notificationDialogRef = useRef<HTMLDialogElement | null>(null);

    const onChangingUserType = (event: React.ChangeEvent<UserTypeHTMLInputElement>) => {
        if(event.target.checked){
            setUserTypes(userTypes.concat(event.target.value))
        }
        else{
            setUserTypes(userTypes.filter(userType =>  userType !== event.target.value));
        }
    }

    const onSignUp = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const newUser:NewUser = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            email: userEmail,
            roles: userTypes,
        }

        userService.register(newUser)
        .then((_response:AxiosResponse) => {
            setNotification("Account has been created successfully! Please check your e-mail and follow the instructions to activate your account.");
        })
        .catch((error:AxiosError) => {
            if(error.response?.status === 400){
                setNotification("Unable to create an account. Please check the entered details, or username or e-mail may have already been used.");
            }
            else if(!error.response){
                setNotification("Something has gone wrong. Please check your internet connection");
            }
            else{
                setNotification(error.response?.data as string);
            }
        })
        setNotificationCounter(notificationCounter + 1);
    }

    useEffect(() => {
        if(notification !== ""){
            notificationDialogRef.current?.showModal()
        }
    }, [notificationCounter]);

    return (
        <>
        <Header />
        <div className="loginSignupContainer">
            <h1 className="commonFontColor" style={{textAlign: "center"}}>Sign Up</h1>
            <NotificationDialog message={notification} dialogRef={notificationDialogRef}/>
            <form onSubmit={onSignUp} className="commonFontColor">

                <div ><div className="inputTextContainer">First name: </div> <input className="loginInput" type='text' onChange={(event) => setFirstName(event.target.value)}/></div>
                <div ><div className="inputTextContainer">Last name:</div> <input className="loginInput" type='text' onChange={(event) => setLastName(event.target.value)}/></div>
                <div ><div className="inputTextContainer">E-mail: </div><input className="loginInput" type='text' onChange={(event) => setUserEmail(event.target.value)}/></div>
                <div ><div className="inputTextContainer">username: </div><input name="newUsername" className="loginInput" type='text' onChange={(event) => setUsername(event.target.value)}/></div>
                <div><div className="inputTextContainer">password: </div><input name="newPassword" className="loginInput" type='password' onChange={(event) => setPassword(event.target.value)}/></div>
                <div className="inputTextContainer">Select user type(s)</div>
                <div>
                    <label htmlFor="Regular User"><span>Regular User</span></label>
                    <input onChange={onChangingUserType} type="checkbox" id="Regular User" value={AccountType.REGULAR_USER} />
                    <label htmlFor="Theatre Owner"><span>Theatre Owner</span></label>
                    <input onChange={onChangingUserType} type="checkbox" id="Theatre Owner" value={AccountType.THEATRE_OWNER} />
                </div>
                <button className="navigationBarButton" type="submit">Sign Up</button>
            </form>
        </div>
        </>
    )
}

export default SignUp