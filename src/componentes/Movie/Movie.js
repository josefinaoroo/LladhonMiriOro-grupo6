import React, { Component } from "react";
import { Link } from "react-router-dom";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verDescripcion: false
    };
  }

  verDescripcion() {
    this.setState({
      verDescripcion: !this.state.verDescripcion
    });
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
              className="btn btn-danger btn-sm"
            >
              {this.state.verDescripcion ? "Ver menos" : "Descripción"}
            </button>

            {
              this.state.verDescripcion
              ? <p className="card-text mt-2">{this.props.dato.overview}</p>
              : null
            }
            <Link to={`/movies/${this.props.dato.id}`} className="btn btn-danger mt-2 d-block">
              Ir a detalle
            </Link>
          </div>
        </div>
      </article>
    );
  }
}

export default Movie;