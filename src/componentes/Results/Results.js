import { useState, useEffect } from "react";
import Header from "../Header/Header.js";
import Loader from "../Loader/Loader.js";
import Movie from "../Movie/Movie.js";

function Results(props) {
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const busqueda = props.match.params.busqueda;
    const tipo = props.match.params.tipo;

    fetch(`https://api.themoviedb.org/3/search/${tipo}?query=${busqueda}&api_key=a016baaa9f1f222d6f473a9acae180a0`)
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          setResultados(data.results);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Header />
      <section className="row cards">
        {resultados.length === 0 ?
          <Loader /> :
          resultados.map((elm, idx) => (
            <Movie key={idx} dato={elm} />
          ))
        }
      </section>
    </>
  );
}

export default Results;