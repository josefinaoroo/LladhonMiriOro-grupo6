import React, { Component } from "react";
import "./Detalle.css";
import Loader from "../../componentes/Loader/Loader";
import Cookies from "universal-cookie";
import Header from "../../componentes/Header/Header";
const cookies = new Cookies();

class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelicula: null,
      loading: true,
      esFavorito: false
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;

    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=22424f1be1f9ca8ae9a2dba99019226a&language=es-ES`)
      .then(res => res.json())
      .then(data => {
      
        this.setState({
        pelicula: data,
        loading: false,
        esFavorito: this.chequearFavoritoInicial(data.id)

    });

})
      .catch(err => console.log(err));
  }
agregarFavorito() {
  let favoritos = localStorage.getItem("favoritos");

  if (favoritos === null) {
    favoritos = [];
  } else {
    favoritos = JSON.parse(favoritos);
  }

  let peli = this.state.pelicula;

  let objeto = {
  id: peli.id,
  titulo: peli.title,
  tipo: "movie",
  poster_path: peli.poster_path
};

  let existe = favoritos.filter(fav => fav.id === peli.id);

  if (existe.length === 0) {
    favoritos.push(objeto);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    this.setState ({
      esFavorito: true
    });

    alert("Agregado a favoritos");
  }
}

esFavorito() {
  let favoritos = localStorage.getItem("favoritos");

  if (favoritos === null) {
    return false;
  }

  favoritos = JSON.parse(favoritos);

  let resultado = favoritos.filter(fav => fav.id === this.state.pelicula.id);

  return resultado.length > 0;
}

eliminarFavorito() {
  let favoritos = localStorage.getItem("favoritos");

  if (favoritos !== null) {
    favoritos = JSON.parse(favoritos);

    let nuevos = favoritos.filter(fav => fav.id !== this.state.pelicula.id);

    localStorage.setItem("favoritos", JSON.stringify(nuevos));

    this.setState({
      esFavorito: false
    });

    alert("Eliminado de favoritos");
  }
}

chequearFavoritoInicial(id) {
  let favoritos = localStorage.getItem("favoritos");

  if (favoritos === null) {
    return false;
  }

  favoritos = JSON.parse(favoritos);

  let resultado = favoritos.filter(fav => fav.id === id);

  return resultado.length > 0;
}

  render() {
    if (this.state.loading) {
    return <Loader />;
    }

    let peli = this.state.pelicula;

    return (
      <div className="detalle-container">
        <Header/>
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

        {cookies.get("user")  && (
          this.state.esFavorito ? (
          <button
          onClick={() => this.eliminarFavorito()}
        className="btn btn-danger mt-2"
          >
             Eliminar de favoritos
           </button>
        ) : (
       <button
         onClick={() => this.agregarFavorito()}
        className="btn btn-danger mt-2"
    >
             Agregar a favoritos
    </button>
  )
)}

        {/* SOLO SI ESTÁ LOGUEADO */}
        {/*si existe muestra el boton agregar fav sino, no muestra nada*/}
        
      </div>
    );
  }
}

export default Detalle;