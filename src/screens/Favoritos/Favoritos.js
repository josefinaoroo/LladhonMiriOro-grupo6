import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import Loader from "../../componentes/Loader/Loader";

const cookies = new Cookies();

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      loading: true,
    };
  }

  componentDidMount() {
    const cookie = cookies.get("user-auth-cookie");
    if (!cookie) {
      this.props.history.push("/login");
      return;
    }

    let favoritos = localStorage.getItem("favoritos");

    if (favoritos === null) {
      this.setState({ loading: false });
      return;
    }

    favoritos = JSON.parse(favoritos);

    favoritos.forEach((id) => {
      fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=22424f1be1f9ca8ae9a2dba99019226a&language=es-ES")
        .then((res) => res.json())
        .then((data) => {
          this.setState((estadoAnterior) => ({
            peliculas: [...estadoAnterior.peliculas, data],
            loading: false,
          }));
        })
        .catch((err) => console.log(err));
    });
  }

  eliminarFavorito(id) {
    let favoritos = localStorage.getItem("favoritos");
    favoritos = JSON.parse(favoritos);

    const nuevaLista = favoritos.filter((favId) => favId !== id);
    localStorage.setItem("favoritos", JSON.stringify(nuevaLista));

    const peliculas = this.state.peliculas.filter((p) => p.id !== id);
    this.setState({ peliculas });
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    return (
      <div>
        <h1>Mis Favoritos</h1>

        {this.state.peliculas.length === 0 ? (
          <p>No tenés películas favoritas.</p>
        ) : (
          this.state.peliculas.map((peli) => (
            <div key={peli.id}>
              <Link to={"/detalle/" + peli.id}>
                <img
                  src={"https://image.tmdb.org/t/p/w500" + peli.poster_path}
                  alt={peli.title}
                  width="150"
                />
                <h3>{peli.title}</h3>
              </Link>
              <button onClick={() => this.eliminarFavorito(peli.id)}>
                Eliminar de favoritos
              </button>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Favoritos;