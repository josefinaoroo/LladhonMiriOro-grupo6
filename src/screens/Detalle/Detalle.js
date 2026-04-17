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

  let existe = favoritos.some(fav => fav.id === peli.id);

  if (!existe) {
    favoritos.push(objeto);
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

        {/* SOLO SI ESTÁ LOGUEADO */}
        {/*si existe muestra el boton agregar fav sino, no muestra nada*/}
        
      </div>
    );
  }
}

export default Detalle;