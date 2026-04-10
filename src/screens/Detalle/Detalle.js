import React, { Component } from "react";
import "./Detalle.css";
import Loader from "../../componentes/Loader/Loader";

class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelicula: null,
      loading: true
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;

    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=22424f1be1f9ca8ae9a2dba99019226a&language=es-ES`)
      .then(res => res.json())
      .then(data => {
      
        this.setState({
        pelicula: data,
        loading: false
    });

})
      .catch(err => console.log(err));
  }

  agregarFavorito() {
    let favoritos = localStorage.getItem("favoritos");
//si no guarda nada --> crea un array vacio
//si hay algo convierte el texto guardado de nuevo en un array
    if (favoritos === null) {
      favoritos = [];
    } else {
      favoritos = JSON.parse(favoritos);
    }

    let id = this.state.pelicula.id;
// verifica que el id no este repetido
// si no esta lo agrega con push --> agrega id al final del array
// lo vuelve a guardar en LS
    if (!favoritos.includes(id)) {
      favoritos.push(id);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      alert("Agregado a favoritos");
    }
  }

  render() {
    if (this.state.loading) {
    return <Loader />;
    }

    let peli = this.state.pelicula;

    return (
      <div className="detalle-container">
        <h1>{peli.title}</h1>

        <img
          src={`https://image.tmdb.org/t/p/w500${peli.poster_path}`}
          alt={peli.title}
        />

        <p><strong>Rating:</strong> {peli.vote_average}</p>
        <p><strong>Fecha de estreno:</strong> {peli.release_date}</p>
        <p><strong>Duración:</strong> {peli.runtime} minutos</p>
        <p><strong>Géneros:</strong> {peli.genres.map(g => g.name).join(", ")}</p>
        <p><strong>Sinopsis:</strong> {peli.overview}</p>

        {/* SOLO SI ESTÁ LOGUEADO */}
        {/*si existe muestra el boton agregar fav sino, no muestra nada*/}
        {localStorage.getItem("usuarioLogueado") && (
          <button onClick={() => this.agregarFavorito()}>
            Agregar a favoritos
          </button>
        )}
      </div>
    );
  }
}

export default Detalle;