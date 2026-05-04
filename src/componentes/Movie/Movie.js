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

  componentDidMount() {
  this.setState({
    esFavorito: this.chequearFavoritoInicial(this.props.dato.id)
  });
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
  titulo: peli.title ? peli.title : peli.name,
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

chequearFavoritoInicial(id) {
  let favoritos = localStorage.getItem("favoritos");

  if (favoritos === null) {
    return false;
  }

  favoritos = JSON.parse(favoritos);

  let resultado = favoritos.filter(fav => fav.id === id);

  return resultado.length > 0;
}

eliminarFavorito() {
  let favoritos = localStorage.getItem("favoritos");

  if (favoritos !== null) {
    favoritos = JSON.parse(favoritos);

    let nuevos = favoritos.filter(fav => fav.id !== this.props.dato.id);

    localStorage.setItem("favoritos", JSON.stringify(nuevos));

    this.setState({
      esFavorito: false
    });

    alert("Eliminado de favoritos");
  }
}



  render() {

    const tipo = this.props.dato.name ? "tv" : "movie";

    return (
      <article className="col-md-3 mb-4">
        <div className="card h-100">
          <img
            className="card-img-top"
            src={`https://image.tmdb.org/t/p/w500${this.props.dato.poster_path}`}
            alt={this.props.dato.title}
          />

          <div className="card-body">
          <h5 className="card-title"> {this.props.dato.title ? this.props.dato.title : this.props.dato.name}
</h5>
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

        <Link to={`/detalle/${tipo}/${this.props.dato.id}`} className="btn btn-danger mt-2 d-block">
          Ir a detalle
          </Link>
           {cookies.get("user") && (
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
          </div>
        </div>
      </article>
    );
  }
}

export default Movie;