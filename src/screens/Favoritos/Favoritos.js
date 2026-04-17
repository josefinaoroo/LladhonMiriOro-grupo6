import React, { Component } from "react";
import Cookies from "universal-cookie";
import FavoritoItem from "../../componentes/Favorito/Favorito";
const cookies = new Cookies(); 

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritos: [] //cuando se carguen se van a guardar acá 
    };
  }

  componentDidMount() {
    // Verificar cookie de sesión
    const cookie = cookies.get("user"); 
    if (!cookie) {
      this.props.history.push("/login");
      ;
    }

    // Traer favoritos del localStorage
    const storage = localStorage.getItem("favoritos"); 

    if (storage !== null) {
      this.setState({ favoritos: JSON.parse(storage) });
    }
  }

  eliminarFavorito(id) {
    // Filtrar el que queremos eliminar
    let nuevos = this.state.favoritos.filter(i => i !== id); 
    //El filter() lo usamos para quedarnos con todos los fav - el id que queremos borrar 
    // Guardar de nuevo en localStorage
    localStorage.setItem("favoritos", JSON.stringify(nuevos));
    this.setState({ favoritos: nuevos });
  }

  render() {
    // Separar películas y series
    const peliculas = this.state.favoritos.filter(i => i === "movie");
    const series = this.state.favoritos.filter(i => i === "tv");

    return (
      <div>
        <h2>Películas favoritas</h2>
        {peliculas.map(pelicula => (
//.map() lo usamos para renderizar un favitem por cd peli, le pasa el item con toda la info a eliminar (=series)
          <FavoritoItem
            key={pelicula.id}
            item={pelicula}
            eliminar={(id) => this.eliminarFavorito(id)}
          />
        ))}

        <h2>Series favoritas</h2>
        {series.map(serie => (
          <FavoritoItem
            key={serie.id}
            item={serie}
            eliminar={(id) => this.eliminarFavorito(id)}
          />
        ))}
      </div>
    );
  }
}

export default Favoritos;