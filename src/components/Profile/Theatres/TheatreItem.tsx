import { Theatre } from "../../../types/theatre"


const TheatreItem = ({theatre}: {theatre: Theatre}) => {

    return (
        <div className="profileItemContainer">
            <h2 className="itemDetails commonFontColor">{theatre.name}</h2>
            <div className="itemDetails commonFontColor">{theatre.location}</div>
        </div>
    )
}

export default TheatreItem