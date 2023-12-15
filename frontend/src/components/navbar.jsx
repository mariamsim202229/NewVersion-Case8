import { Link } from "react-router-dom";


const Navbar = () => {
// create a Navigation bar with links to the routes and export it to the page/routes
    return (
        <header className="navbar">
            <h1 className="storTitel">BioPalatset</h1>
            <nav>
                <img className="logo" src="https://img.freepik.com/free-vector/home-movie-background-with-popcorn_1419-1852.jpg"></img>
                <br></br>
                <Link to='/' className="link"> Hemsida </Link>
                <br></br>
                <Link to='/movies' className="link"> Hemsida </Link>
                <br></br>
                <Link to='/booking' className="link"> Boka film</Link>
            </nav>
        </header>
    )
}

export default Navbar;