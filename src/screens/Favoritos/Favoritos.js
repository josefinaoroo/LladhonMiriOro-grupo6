import React, { Component } from "react";
import Cookies from "universal-cookie";
import FavoritoItem from "../../componentes/Favorito/Favorito";
import Header from "../../componentes/Header/Header";
const cookies = new Cookies(); 

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritos: [] 
    };
  }

  componentDidMount() {
  
    const cookie = cookies.get("user"); 
    if (!cookie) {
      this.props.history.push("/login");
      ;
    }

    
    const storage = localStorage.getItem("favoritos"); 

    if (storage !== null) {
      this.setState({ favoritos: JSON.parse(storage) });
    }
  }

  eliminarFavorito(id) {
    let nuevos = this.state.favoritos.filter(i => i.id !== id); 
    localStorage.setItem("favoritos", JSON.stringify(nuevos));
    this.setState({ favoritos: nuevos });
  }

  render() {
    const peliculas = this.state.favoritos.filter(i => i.tipo === "movie");
    const series = this.state.favoritos.filter(i => i.tipo === "tv");

    return (
      <div>
        <Header/>
        <h2 className="alert alert-danger">Películas favoritas</h2>
        <section className="row cards">
        {peliculas.map(pelicula => (

          <FavoritoItem
            key={pelicula.id}
            item={pelicula}
            eliminar={(id) => this.eliminarFavorito(id)}
          />
        ))}
        </section>
        <h2 className="alert alert-danger">Series favoritas</h2>
        <section>
            {series.map(serie => (
          <FavoritoItem
            key={serie.id}
            item={serie}
            eliminar={(id) => this.eliminarFavorito(id)}
          />
        ))}
        </section>
      </div>
    );
  }
}

export default Favoritos;