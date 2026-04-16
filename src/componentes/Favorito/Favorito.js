import React from 'react';
import { Link } from 'react-router-dom';

function FavoritoItem(props) {
    const item = props.item; //el .item tiene toda la información de la pelúcula
    const eliminar = props.eliminar; //eliminar --> es la función 

    return (
        <div>
            <h3>{item.titulo}</h3>
            <Link to={"/detalle/" + item.id}> //navegamos al detalle de la película usando su id 
                Ver detalle 
            </Link>
            <button onClick={() => eliminar(item.id)}> //para borrar una película de favoritos 
                Eliminar
            </button>
        </div>
    );
}

export default FavoritoItem; 