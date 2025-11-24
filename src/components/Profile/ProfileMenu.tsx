import { ProfileItems } from "../../types/profile";
import { AccountType } from "../../types/user";


interface MenuButtonProps {
    menuItem: ProfileMenuItem;
    onClickChangeSelection: (item: ProfileItems) => void;
}

interface ProfileMenuItem {
    buttonText: string;
    element: ProfileItems;
}

const ProfileMenuButton = (props: MenuButtonProps) => {
    return (
        <button onClick={() => props.onClickChangeSelection(props.menuItem.element)} className="profileMenuButton">{props.menuItem.buttonText}</button>
    )
}



const ProfileMenu = ({ onClickChangeSelection }: { onClickChangeSelection: (item: ProfileItems) => void }) => {
    
    const getMenuItems = () => {
        const MenuItems = [
            {
            buttonText: "Profile",
            element: ProfileItems.PROFILE,
            }
        ]
        if(localStorage.getItem(AccountType.REGULAR_USER) === "true"){
            MenuItems.push({
            buttonText: "Tickets",
            element: ProfileItems.TICKETS
            })
        }
        if(localStorage.getItem(AccountType.THEATRE_OWNER) === "true"){
            // MenuItems.push({
            //     buttonText: "Shows",
            //     element: ProfileItems.SHOWS
            // })
            MenuItems.push({
                buttonText: 'Theatres',
                element: ProfileItems.THEATRES,
            })
        }
        return MenuItems;
    }

    return (
        <div className="profileMenuContainer">
            {getMenuItems().map((item, index) => <ProfileMenuButton key={index} menuItem={item}
                onClickChangeSelection={onClickChangeSelection} />)}
        </div>
    )
}

export default ProfileMenu;