import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();
//comand f para ver si tenemos algun this, state
function Movie (props) {
    const [verDescripcion, setverDescripcion] = useState(false)
    const [esFavorito, setesFavorito] = useState (false)
  

  //si queremos console log con todos los estados({con las variables de los estados})
 // useEffect (
 //() => {})
  //sacamos el this y ponemos props
  //vemos que funcion usamos --> setVerdescripcion en lugar del this
  useEffect(
    () => {
      setesFavorito: chequearFavoritoInicial(props.dato.id)
    }, []);
  
// al metodo le agregamos function adelante 
  function verDescripcionf() {
    setverDescripcion(!verDescripcion)
  }

  function agregarFavorito() {
    let favoritos = localStorage.getItem("favoritos");

    if (favoritos === null) {
      favoritos = [];
    } else {
      favoritos = JSON.parse(favoritos);
    }

    let peli = props.dato;

    let objeto = {
      id: peli.id,
      titulo: peli.title ? peli.title : peli.name,
      tipo: "movie",
      poster_path: peli.poster_path
    };

    let existe = favoritos.filter(fav => fav.id === peli.id);

    if (existe.length === 0) {
      favoritos.push(objeto);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      setesFavorito(true)
      alert("Agregado a favoritos");
    }
  }

  function chequearFavoritoInicial(id) {
    let favoritos = localStorage.getItem("favoritos");

    if (favoritos === null) {
      return false;
    }

    favoritos = JSON.parse(favoritos);
    let resultado = favoritos.filter(fav => fav.id === id);
    return resultado.length > 0;
  }

  function eliminarFavorito() {
    let favoritos = localStorage.getItem("favoritos");

    if (favoritos !== null) {
      favoritos = JSON.parse(favoritos);
      let nuevos = favoritos.filter(fav => fav.id !== props.dato.id);
      localStorage.setItem("favoritos", JSON.stringify(nuevos));
      setesFavorito(false)
      alert("Eliminado de favoritos");
    }
  }
// borramos el render y las llaves que cierran 
//sacamos el this.state y dejamos solo el metodo
    const tipo = props.dato.name ? "tv" : "movie";

    return (
      <article className="col-md-3 mb-4">
        <div className="card h-100">
          <img
            className="card-img-top"
            src={`<https://image.tmdb.org/t/p/w500${props.dato.poster_path}`}
            alt={props.dato.title}
          /> 
          <div className="card-body">
            <h5 className="card-title">
              {props.dato.title ? props.dato.title : props.dato.name}
            </h5>
            <button
              onClick={() => verDescripcionf()}
              className="btn btn-danger"
            >
              {verDescripcion ? "Ver menos" : "Descripción"}
            </button>
            {verDescripcion ? (
              <p className="card-text mt-2">{props.dato.overview}...</p>
            ) : null}
            <Link to={`/detalle/${tipo}/${props.dato.id}`} className="btn btn-danger mt-2 d-block">
              Ir a detalle
            </Link>
            {cookies.get("user") && (
              esFavorito ? (
                <button
                  onClick={() => eliminarFavorito()}
                  className="btn btn-danger mt-2"
                >
                  Eliminar de favoritos
                </button>
              ) : (
                <button
                  onClick={() => agregarFavorito()}
                  className="btn btn-danger mt-2"
                >
                  Agregar a favoritos
                </button>
              )
            )}
          </div>
        </div>
      </article>
    );
  }


export default Movie;