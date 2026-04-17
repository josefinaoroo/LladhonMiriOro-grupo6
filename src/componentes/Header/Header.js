import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

function Header() {
    const cookies = new Cookies()
    let usuario = cookies.get("user")
    const logOut = () => {
        cookies.remove("user")
    }
    
    return (
        <div className= "alert alert-danger">
            <h1 className="alert-danger">UdeSA Movies</h1>
            <nav>
                <ul className="nav nav-tabs my-4">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/moviesscreen" className="nav-link">
                            Peliculas
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/moviesscreencartelera" className="nav-link">
                            En Cartelera
                        </Link>
                    </li>
                    {usuario ? (
                        <li className="nav-item">
                            <Link to="/favoritos" className="nav-link">Favoritos</Link>
                        </li>): ""}

                    {!usuario ? (
                        <li className="nav-item ml-auto">
                            <Link to="/crearcuenta" className="nav-link">Registro</Link>
                        </li>): ""}

                    {!usuario ? (
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                    ): null}
                    {!usuario ?  "":(
                        <li className="nav-item ml-auto">
                            <button onClick={logOut} className="btn btn-danger">
                                Log out
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Header;