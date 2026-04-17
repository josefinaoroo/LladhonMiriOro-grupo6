import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loader from "../../componentes/Loader/Loader";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultados: [],
      loading: true
    };
  }

  componentDidMount() {
    this.buscarPeliculas();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.buscarPeliculas();
    }
  }

  buscarPeliculas() {
    let query = new URLSearchParams(this.props.location.search);
    let busqueda = query.get("busqueda");

    if (!busqueda) {
      this.setState({
        resultados: [],
        loading: false
      });
      return;
    }

    this.setState({
      resultados: [],
      loading: true
    });

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=22424f1be1f9ca8ae9a2dba99019226a&query=${busqueda}&language=es-ES`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          resultados: data.results || [],
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    if (this.state.resultados.length === 0) {
      return <p>No se encontraron resultados</p>;
    }

    return (
      <section className="cards">
        {this.state.resultados.map((elm, idx) => (
          <article key={idx} className="single-card-movie">
            <img
              src={`https://image.tmdb.org/t/p/w500${elm.poster_path}`}
              alt={elm.title}
            />

            <h5>{elm.title}</h5>

            <Link to={`/detalle/${elm.id}`}>
              Ir a detalle
            </Link>

            {cookies.get("user") && (
              <button>Agregar a favoritos</button>
            )}
          </article>
        ))}
      </section>
    );
  }
}

export default SearchResults;