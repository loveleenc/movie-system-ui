import { useEffect, useRef, useState } from "react";
import showService from "../../../services/showService";
import "../../../styles/profile/shows.css"
import common from "../../../utils/common";
import NotificationDialog from "../../Common/NotificationDialog";
import { TheatreShow } from "../../../types/profile";

const TheatreShowing = ({ show, cancelShow }: { show: TheatreShow; cancelShow: (id:string) => void }) => {
    return (
        <div className="theatreShowingSingle">
            <div className="theatreShowingDataPoint">{common.getDate(show.startTime.toString())}</div>
            <div className="theatreShowingDataPoint">{common.getTimeInHHMM(show.startTime.toString())}</div>
            <div className="theatreShowingDataPoint">{common.getTimeInHHMM(show.endTime.toString())}</div>
            <div className="theatreShowingDataPoint">{show.movieName}</div>
            <div className="theatreShowingDataPoint">{show.language}</div>
            <div className="theatreShowingDataPoint"><button
            onClick={() => cancelShow(show.id)}>Cancel Show</button></div>
        </div>
    )
}


const UserShows = ({id, setTheatreId}: {id:number; setTheatreId: React.Dispatch<React.SetStateAction<number>>}) => {
    const [shows, setShows] = useState<TheatreShow[]>([]);
    const notificationDialogRef = useRef<HTMLDialogElement | null>(null);
    const [notificationCounter, setNotificationCounter] = useState<number>(0);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if(id !== 0){
            showService.getShowsForTheatre(Number(id))
            .then(response => {
                setShows(response.data);
            })
        }
    }, [id])

     useEffect(() => {
        if(message !== ""){
            notificationDialogRef.current?.showModal()
        }
    }, [notificationCounter]);

    const cancelShow = (showId: string) => {
        showService.cancelShow(showId)
            .then(_response => {
                setMessage("Show has been cancelled successfully");
                setNotificationCounter(notificationCounter + 1);
                setShows(shows.filter(show => show.id !== showId));
            })
            .catch(_error => {
                setMessage("Unable to cancel show");
                setNotificationCounter(notificationCounter + 1);
            })
    }

    if(id === 0){
        return <></>
    }


    return (
        <div className="profileItemViewContainer commonFontColor">
            <NotificationDialog message={message} dialogRef={notificationDialogRef} />
            <button className="navigationBarButton showViewsBackButton" onClick={() => setTheatreId(0)}>Back</button>
            <div className="showHeadingsContainer">
                <h3 className="showDataHeadings">Date</h3>
                <h3 className="showDataHeadings">Start Time</h3>
                <h3 className="showDataHeadings">End Time</h3>
                <h3 className="showDataHeadings">Movie</h3>
                <h3 className="showDataHeadings">Language</h3>
                <h3 className="showDataHeadings">Action</h3>
            </div>
            <div className="showsContainer">
                {   shows.length !== 0 ?
                    shows.map((show, index) => <><TheatreShowing key={index} show={show} cancelShow={cancelShow}/><br/></>)
                    : "No shows are available at this theatre."
                }
            </div>

        </div>
    )
}

export default UserShows;