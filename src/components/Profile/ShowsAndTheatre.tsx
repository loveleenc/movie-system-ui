import { useState } from "react";
import UserShows from "./Shows/UserShows"
import UserTheatres from "./Theatres/UserTheatres"


const TheatresAndShows = () => {
    const [theatreId, setTheatreId] = useState<number>(0);

    return(
        <>
        <UserTheatres theatreId={theatreId} setTheatreId={setTheatreId}/>
        <UserShows id={theatreId} setTheatreId={setTheatreId}/>
        </>
    )


}


export default TheatresAndShows