import React from 'react';
import { Link } from 'react-router-dom';

function FavoritoItem(props) {
    const item = props.item; 
    const eliminar = props.eliminar; 

    return (
        <article className="col-md-3 mb-4">
            <div className="card h-100">
            <h3 className= "card-title">{item.titulo}</h3>

            <img
    className="card-img-top"
    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
    alt={item.titulo}
  />
            <Link to={"/detalle/" + item.id} className= "btn btn-danger mt-2" > 
                Ver detalle 
            </Link>
            <button className="btn btn-danger mt-2" onClick={() => eliminar(item.id)}> 
                Eliminar
            </button>
        </div>
        </article>

    );
}

export default FavoritoItem; 