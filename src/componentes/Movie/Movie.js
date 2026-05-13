import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verDescripcion: false,
      esFavorito: false
    };
  }

  verDescripcion() {
    this.setState({
      verDescripcion: !this.state.verDescripcion
    });
  }
   agregarFavorito() {
    let favoritos = localStorage.getItem("favoritos");

    if (favoritos === null) {
      favoritos = [];
    } else {
      favoritos = JSON.parse(favoritos);
    }

    let peli = this.props.dato;

    let objeto = {
      id: peli.id,
      titulo: peli.title,
      tipo: "movie",
      poster_path: peli.poster_path
    };
    let encontrados = favoritos.filter(fav=> fav.id === this.props.dato.id);
    let existe = encontrados.length > 0;

    favoritos.push(objeto);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    this.setState({ esFavorito: true });
  }
  eliminarFavorito(){
    let favoritos = localStorage.getItem("favoritos");

    if (favoritos === null){
      favoritos = [];
    } else {
      favoritos = JSON.parse(favoritos);
    }
    favoritos = favoritos.filter(fav => fav.id !== this.props.dato.id);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    this.setState({esFavorito: false})
  }

//CAMBIAR EL DETALLE COMO ESTA EN EL PROYECTO OG
  render() {
    return (
      <article className="col-md-3 mb-4">
        <div className="card h-100">
          <img
            className="card-img-top"
            src={`https://image.tmdb.org/t/p/w500${this.props.dato.poster_path}`}
            alt={this.props.dato.title}
          />

          <div className="card-body">
            <h5 className="card-title">{this.props.dato.title}</h5>

            <button
              onClick={() => this.verDescripcion()}
              className="btn btn-danger"
            >
              {this.state.verDescripcion ? "Ver menos" : "Descripción"}
            </button>

           {this.state.verDescripcion 
               ? <p className="card-text mt-2">
               {this.props.dato.overview}...
                        </p>
                : null
        }
            <Link to={`/detalle/${this.props.dato.id}`} className="btn btn-danger mt-2 d-block">
              Ir a detalle
            </Link>

           {cookies.get("user") && (
  <button
    onClick={() => this.setState.esFavorito ? this.eliminarFavorito() : this.agregarFavorito()}
    className="btn btn-danger mt-2"
  >
    {this.setState.esFavorito ? "Eliminar de favoritos" : "Agregar a favoritos"}
  </button>
)}
          </div>
        </div>
      </article>
    );
  }
}
export default Movie;