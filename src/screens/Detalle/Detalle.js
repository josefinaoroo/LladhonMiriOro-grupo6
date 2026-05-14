import { useState, useEffect } from "react";
import "./Detalle.css";
import Loader from "../../componentes/Loader/Loader";
import Cookies from "universal-cookie";
import Header from "../../componentes/Header/Header";

const cookies = new Cookies();

function Detalle(props) {
  const [pelicula, setPelicula] = useState(null);
  const [loading, setLoading] = useState(true);
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    let id = props.match.params.id;
    let tipo = props.match.params.tipo;

    fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=22424f1be1f9ca8ae9a2dba99019226a&language=es-ES`)
      .then(res => res.json())
      .then(data => {
        setPelicula(data);
        setLoading(false);
        setEsFavorito(chequearFavoritoInicial(data.id));
      })
      .catch(err => console.log(err));
  }, []);

  function chequearFavoritoInicial(id) {
    let favoritos = localStorage.getItem("favoritos");
    if (favoritos === null) return false;
    favoritos = JSON.parse(favoritos);
    let resultado = favoritos.filter(fav => fav.id === id);
    return resultado.length > 0;
  }

  function agregarFavorito() {
    let favoritos = localStorage.getItem("favoritos");
    if (favoritos === null) {
      favoritos = [];
    } else {
      favoritos = JSON.parse(favoritos);
    }

    let objeto = {
      id: pelicula.id,
      titulo: pelicula.title,
      tipo: "movie",
      poster_path: pelicula.poster_path
    };

    let existe = favoritos.filter(fav => fav.id === pelicula.id);

    if (existe.length === 0) {
      favoritos.push(objeto);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      setEsFavorito(true);
      alert("Agregado a favoritos");
    }
  }

  function eliminarFavorito() {
    let favoritos = localStorage.getItem("favoritos");
    if (favoritos !== null) {
      favoritos = JSON.parse(favoritos);
      let nuevos = favoritos.filter(fav => fav.id !== pelicula.id);
      localStorage.setItem("favoritos", JSON.stringify(nuevos));
      setEsFavorito(false);
      alert("Eliminado de favoritos");
    }
  }

  if (loading) return <Loader />;

  return (
    <div className="detalle-container">
      <Header />
      <h1>{pelicula.title ? pelicula.title : pelicula.name}</h1>

      <img
        src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
        alt={pelicula.title}
      />

      <p><strong>Rating:</strong> {pelicula.vote_average}</p>
      <p><strong>Fecha de estreno:</strong>{" "}{pelicula.release_date ? pelicula.release_date : pelicula.first_air_date}</p>
      <p><strong>Duración:</strong>{" "}
        {pelicula.runtime ? pelicula.runtime + " minutos"
          : pelicula.episode_run_time && pelicula.episode_run_time.length > 0
          ? pelicula.episode_run_time[0] + " min por episodio"
          : "No disponible"}
      </p>
      <p><strong>Géneros:</strong>{" "}{pelicula.genres ? pelicula.genres.map(g => g.name).join(", ") : "Sin datos"}</p>
      <p><strong>Sinopsis:</strong> {pelicula.overview}</p>

      {cookies.get("user") && (
        esFavorito ? (
          <button onClick={() => eliminarFavorito()} className="btn btn-danger mt-2">
            Eliminar de favoritos
          </button>
        ) : (
          <button onClick={() => agregarFavorito()} className="btn btn-danger mt-2">
            Agregar a favoritos
          </button>
        )
      )}
    </div>
  );
}

export default Detalle;