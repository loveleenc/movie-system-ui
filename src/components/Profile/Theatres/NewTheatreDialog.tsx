import {  useState } from "react";
import { SeatType } from "../../../types/tickets";
import "../../../styles/profile/newTheatre.css"


const TheatreRows = ({rowCount, setRowCount}: {rowCount:number; setRowCount: React.Dispatch<React.SetStateAction<number>>}) => {
    const changeRowCount = (newValue:number) => (event:React.SyntheticEvent) => {
        event.preventDefault();
        if(newValue === 0){
            return;
        }
        setRowCount(newValue);
    }
    return (
        <div>
            <button className="navigationBarButton" onClick={changeRowCount(rowCount + 1)}>+</button>
            <button className="navigationBarButton"  onClick={changeRowCount(rowCount - 1)}>-</button>
            {Array.from({ length: rowCount }, (_v, i) => i).map(number => <TheatreRowInput key={number} rowNumber={number} />)}
        </div>
    )
}


const TheatreRowInput = ({ rowNumber }: { rowNumber: number; }) => {
    return (
        <div className="newTheatreRowInput">
            <div><div className="inputTextContainer">Row Identifier: </div> <input name={`rowLetter${rowNumber}`} className="commonInput" type='text' /></div>
            <div><div className="inputTextContainer">Seat Count: </div> <input name={`seatCount${rowNumber}`} className="commonInput" type='number' min={1} /></div>
            <div>
                <div className="inputTextContainer">Seat Type: </div>
                <select name={`seatType${rowNumber}`}>
                    {Object.values(SeatType).map((seatType, index) => (
                        <option key={index} value={seatType}>
                            {seatType}
                        </option>
                    ))}
                </select>
            </div>

            <div><div className="inputTextContainer">Seat Price: </div> <input name={`seatPrice${rowNumber}`} className="commonInput" type='number' min={1} /></div>
        </div>
    )
}


const NewTheatreDialog = ({ dialogRef , createNewTheatre}: { dialogRef: React.RefObject<HTMLDialogElement | null>; createNewTheatre: (rowCount:number) => (event:React.SyntheticEvent) => void; }) => {
    const [rowCount, setRowCount] = useState<number>(1);

    return (
        <dialog ref={dialogRef} className="commonFontColor movie-information-dialog">
            <h4 style={{ textAlign: 'center' }}>Add a new theatre</h4>
            <form method="dialog" onSubmit={createNewTheatre(rowCount)}>
                <div style={{ textAlign: 'center' }}>
                    <div ><div className="inputTextContainer">Theatre name: </div> <input name="theatreName" className="commonInput" type='text' /></div>
                    <div ><div className="inputTextContainer">Theatre location:</div> <input name="theatreLocation" className="commonInput" type='text' /></div>
                </div>
                <TheatreRows rowCount={rowCount} setRowCount={setRowCount}/>
                <div style={{ paddingTop: '5px', width: 'inherit', textAlign: 'center' }}>
                    <button type="submit" className="navigationBarButton">Create</button>
                    <button className="navigationBarButton" onClick={() => dialogRef.current?.close()}>close</button>
                </div>
            </form>
        </dialog>
    )
}

export default NewTheatreDialog;