import Header from "../Common/Header"
import "../../styles/profile/profile.css"
import ProfileMenu from "./ProfileMenu"
import UserTickets from "./UserTickets"
import { ProfileItems } from "../../types/profile"
import common from "../../utils/common"
import { useState } from "react"
import UserTheatres from "./Theatres/UserTheatres"
import UserShows from "./UserShows"

const MenuItem = ({selection}: {selection: ProfileItems;}) => {

    switch(selection){
        case ProfileItems.PROFILE:
            return (<></>)
        case ProfileItems.TICKETS:
            return <UserTickets />
        case ProfileItems.THEATRES:
            return <UserTheatres />
        case ProfileItems.SHOWS:
            return <UserShows />
        default:
            return common.assertNever(selection);
    }
}

//create a show
//cancel a show
//create a theatre
//get theatres
//get shows for theatre
//update status for tickets 

const Profile = () => {
    const [selection, setSelection] = useState<ProfileItems>(ProfileItems.PROFILE);

    const onClickChangeSelection = (item:ProfileItems) => {
        setSelection(item);
    }

    return (
        <>
        <Header />
        <div className="profileContainer">
            <ProfileMenu onClickChangeSelection={onClickChangeSelection}/>
            <MenuItem selection={selection}/>
        </div>
        </>
    )
}

export default Profile