import { Theatre } from "../../../types/theatre"


const TheatreItem = ({theatre, setTheatreId}: {theatre: Theatre; setTheatreId: React.Dispatch<React.SetStateAction<number>>}) => {

    return (
        <div className="profileItemContainer">
            <h2 className="itemDetails commonFontColor">{theatre.name}</h2>
            <div className="itemDetails commonFontColor">{theatre.location}</div>
            <button className="itemDetails viewShowsButton" onClick={() => setTheatreId(theatre.id)}>View Shows</button>
        </div>
    )
}

export default TheatreItem