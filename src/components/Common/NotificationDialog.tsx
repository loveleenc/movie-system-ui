import React from "react";

//TODO: add styling for dialog
const NotificationDialog = ({ message, dialogRef }: {
    message: string;
    dialogRef: React.RefObject<HTMLDialogElement | null>
}) => {

    return (
        <dialog ref={dialogRef}>
            <div className="">{message}</div>
            <form method="dialog">
                <button onClick={() => dialogRef.current?.close()}>OK</button>
            </form>
        </dialog>
    )
}

export default NotificationDialog