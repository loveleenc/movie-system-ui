import { useEffect, useRef, useState } from "react";
import theatreService from "../../../services/theatreService";
import { NewTheatre, Theatre, TheatreRow } from "../../../types/theatre";
import TheatreItem from "./TheatreItem";
import NewTheatreDialog from "./NewTheatreDialog";

const UserTheatres = () => {
    const [theatres, setTheatres] = useState<Theatre[]>([]);
    const newTheatreDialogRef = useRef<HTMLDialogElement | null>(null);
    useEffect(() => {
        theatreService.getTheatres()
            .then(response => {
                setTheatres(response.data);
            })
    }, [])

    const createNewTheatre = (rowCount:number) => (event:React.SyntheticEvent) => {
        console.log("calling this shitty function")
        event.preventDefault();
        const newTheatreRows:TheatreRow[] = [];
        for(let i = 0; i < rowCount; i++){
            newTheatreRows.push({
                seatType: (event.target as HTMLFormElement)[`seatType${i}`].value,
                seatCount: (event.target as HTMLFormElement)[`seatCount${i}`].value,
                seatPrice: (event.target as HTMLFormElement)[`seatPrice${i}`].value,
                rowLetter: (event.target as HTMLFormElement)[`rowLetter${i}`].value,
            })
        }
        const newTheatre:NewTheatre = {
            name: (event.target as HTMLFormElement).theatreName.value,
            location: (event.target as HTMLFormElement).theatreLocation.value,
            theatreRows: newTheatreRows
        }

        theatreService.createTheatre(newTheatre)
            .then(response => {
                const newTheatre:Theatre = {
                    name: response.data.name,
                    location: response.data.location,
                    id: response.data.id
                }
                setTheatres(theatres.concat(newTheatre))
                newTheatreDialogRef.current?.close();
            })
    }

    return (
        <div className="profileItemViewContainer">
            <NewTheatreDialog dialogRef={newTheatreDialogRef} createNewTheatre={createNewTheatre}/>
            <div>
                <h1 className="commonFontColor">Theatres</h1>
                <button onClick={() => newTheatreDialogRef.current?.showModal()} className="profileItemButton">Add theatre</button>
            </div>
            <hr />
            {theatres.map((theatre, index) => <TheatreItem key={index} theatre={theatre} />)}
        </div>
    )
}

export default UserTheatres;