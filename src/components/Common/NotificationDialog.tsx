import React from "react";

//TODO: add styling for dialog
const NotificationDialog = ({ message, dialogRef }: {
    message: string;
    dialogRef: React.RefObject<HTMLDialogElement | null>
}) => {

    return (
        <dialog ref={dialogRef}>
            <div className="commonFontColor" style={{color: "black"}}>{message}</div>
            <form method="dialog" style={{textAlign: "center"}}>
                <button onClick={() => dialogRef.current?.close()}>OK</button>
            </form>
        </dialog>
    )
}

export default NotificationDialog