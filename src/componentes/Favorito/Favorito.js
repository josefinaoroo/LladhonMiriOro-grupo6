import React from 'react';
import { Link } from 'react-router-dom';

function FavoritoItem(props) {
    const item = props.item; //el .item tiene toda la información de la pelúcula
    const eliminar = props.eliminar; //eliminar --> es la función 

    return (
        <div>
            <h3>{item.titulo}</h3>

            <img
    className="card-img-top"
    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
    alt={item.titulo}
  />

            <Link to={"/detalle/" + item.id}> 
                Ver detalle 
            </Link>
            <button onClick={() => eliminar(item.id)}> 
                Eliminar
            </button>
        </div>
    );
}

export default FavoritoItem; 