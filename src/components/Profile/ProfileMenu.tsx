import { ProfileItems } from "../../types/profile";


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
    const MenuItems = [
        {
            buttonText: "Profile",
            element: ProfileItems.PROFILE,
        },
        {
            buttonText: "Tickets",
            element: ProfileItems.TICKETS
        }
    ]

    return (
        <div className="profileMenuContainer">
            {MenuItems.map(item => <ProfileMenuButton menuItem={item}
                onClickChangeSelection={onClickChangeSelection} />)}
        </div>
    )
}

export default ProfileMenu;