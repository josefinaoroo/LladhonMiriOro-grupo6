import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loader from "../../componentes/Loader/Loader";
import Cookies from "universal-cookie";
import Header from "../../componentes/Header/Header";
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
      <>
        <Header/>
        <section className="row cards">
        {this.state.resultados.map((elm, idx) => (
          <article key={idx} className="single-card-movie">
            <img className="card-img-top"
              src={`https://image.tmdb.org/t/p/w500${elm.poster_path}`}
              alt={elm.title}
            />
            <h5 className="card-title">{elm.title}</h5>
            <Link to={`/detalle/${elm.id}`} className="btn btn-danger mt-2 d-block">
              Ir a detalle
            </Link>
            {cookies.get("user") && (
              <button>Agregar a favoritos</button>
            )}
          </article>
        ))}
      </section>
      </>
    );
  }
}

export default SearchResults;