import Header from "../Common/Header"
import Movies from "./MovieContainers"
import "../../styles/home.css"

const Home = () => {

    return (
        <>
            <Header />
            <Movies.NowShowing />
            <Movies.ComingSoon />
        </>
    )
}


export default Home