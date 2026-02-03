import showService from "../../../services/showService";
import { Theatre } from "../../../types/theatre";

const NewShowDialog = ({ dialogRef, theatres }: { dialogRef: React.RefObject<HTMLDialogElement | null>; theatres: Theatre[] }) => {
    const language = "English";
    const startTime = "2026-03-02T13:00:00"
    const endTime = "2026-03-02T15:10:00"
    const createNewShow = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const id = (event.target as HTMLFormElement)["theatreId"].value;
        const data = {
            show: {
                theatre: {
                    id: id,
                    name: theatres.find(theatre => theatre.id === id)?.name,
                    location: theatres.find(theatre => theatre.id === id)?.location,
                },
                movie: {
                    id: movies[0].id
                },
                language: language,
                startTime: startTime,
                endTime: endTime
            },
            moviePrice: 300,
            status: "available"
        }
        showService.createShow(data)
            .then(_response => {
                alert('show created successfully!');
            })
            .catch(error => {
                alert(`show not created: ${error.response.data}`);
            })


    }

    //Temporary dialog added; to be updated later on
    const movies = [{
        id: 19,
        name: 'Toy Story 5',
        languages: ["English", "Hindi", "Telugu", "Tamil"]
    },
    ];

    return (
        <dialog ref={dialogRef} className="commonFontColor movie-information-dialog">
            <h4 style={{ textAlign: 'center' }}>Add a new show</h4>

            <form method="dialog" onSubmit={createNewShow}>
                <div>
                    <div>Select theatre:</div>
                    <select name="theatreId">
                        {theatres.map((theatre) => (
                            <option key={theatre.id} value={theatre.id}>
                                {theatre.name} - {theatre.location}
                            </option>
                        ))}
                    </select>
                </div>
                <div></div>
                <div style={{ paddingTop: '5px', width: 'inherit', textAlign: 'center' }}>
                    <button type="submit" className="navigationBarButton">Create</button>
                    <button type="button" className="navigationBarButton" onClick={() => dialogRef.current?.close()}>close</button>
                </div>
            </form>
        </dialog>
    )
}

export default NewShowDialog;