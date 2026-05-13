import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import FavoritoItem from "../../componentes/Favorito/Favorito";
import Header from "../../componentes/Header/Header";

const cookies = new Cookies();

function Favoritos(props) {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const cookie = cookies.get("user");
    if (!cookie) {
      props.history.push("/login");
    }

    const storage = localStorage.getItem("favoritos");

    if (storage !== null) {
      setFavoritos(JSON.parse(storage));
    }
  }, []);

  function eliminarFavorito(id) {
    let nuevos = favoritos.filter(i => i.id !== id);
    localStorage.setItem("favoritos", JSON.stringify(nuevos));
    setFavoritos(nuevos);
  }

  const peliculas = favoritos.filter(i => i.tipo === "movie");
  const series = favoritos.filter(i => i.tipo === "tv");

  return (
    <div>
      <Header />
      <h2 className="alert alert-danger">Películas favoritas</h2>
      <section className="row cards">
        {peliculas.map(pelicula => (
          <FavoritoItem
            key={pelicula.id}
            item={pelicula}
            eliminar={(id) => eliminarFavorito(id)}
          />
        ))}
      </section>
      <h2 className="alert alert-danger">Series favoritas</h2>
      <section>
        {series.map(serie => (
          <FavoritoItem
            key={serie.id}
            item={serie}
            eliminar={(id) => eliminarFavorito(id)}
          />
        ))}
      </section>
    </div>
  );
}

export default Favoritos;