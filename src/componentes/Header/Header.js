import React from "react";
import {Link} from "react-router-dom"
function Header (props){
    let barra= [
        {menu: "Home", path: "/"},
        {menu: "Peliculas", path: "/peliculas"},
        {menu: "Series", path: "/series"},
        {menu: "Favoritos", path: "/favoritos"},
        {menu: "Crear Cuenta", path: "/crearcuenta"},
        {menu: "Log in", path: "/login"},
    ]
    //tenemos que cambiar el mapeo
    return(
    <nav>
        <ul className="nav nav-tabs my-4">
            {barra.map((elm,idx) =>  
                (<li className="nav-item" key={elm+idx}> 
                <Link to={elm.path}>{elm.menu}</Link>
                </li>))}
        </ul>
    </nav>
    )
}
export default Header