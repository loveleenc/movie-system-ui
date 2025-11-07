import Header from "../Common/Header"
import "../../styles/profile.css"
import ProfileMenu from "./ProfileMenu"
import UserTickets from "./UserTickets"
import { ProfileItems } from "../../types/profile"
import common from "../../utils/common"
import { useState } from "react"

const MenuItem = ({selection}: {selection: ProfileItems;}) => {

    switch(selection){
        case ProfileItems.PROFILE:
            return (<></>)
        case ProfileItems.TICKETS:
            return <UserTickets />
        default:
            return common.assertNever(selection);
    }
}



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