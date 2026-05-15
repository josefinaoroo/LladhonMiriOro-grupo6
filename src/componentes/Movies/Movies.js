import React, { useState, useEffect } from "react";
import Movie from "../Movie/Movie";
import "./Movies.css"

function Movies (props){
  const [datos, setdatos] = useState([])
  const [peliculasFiltradas, setpeliculasFiltradas] = useState ([])
  const [valor, setvalor] = useState ("")
  const [pagina, setpagina] = useState (1)

  useEffect(
    () => {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=22424f1be1f9ca8ae9a2dba99019226a&language=es-ES&page=${pagina}`)
      .then(response => response.json())
      .then(data => {
        setdatos(data.results)
        setpeliculasFiltradas(data.results)
        setpagina(2)
        ;
      })
      .catch(error => console.log(error));
    }, []
  ) 
  
  function cargarMas() { 
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=22424f1be1f9ca8ae9a2dba99019226a&language=es-ES&page=${pagina}`)
      .then(response => response.json())
      .then(data => {
        setdatos(datos.concat(data.results))
        setpeliculasFiltradas(peliculasFiltradas.concat(data.results))
        setpagina(pagina + 1)
      })
      .catch(error => console.log(error));
  }
  function evitarSubmit(evento) {
    evento.preventDefault();
  }
  function controlCambios(evento){
        setvalor(evento.target.value)        
        filtrarPeliculas(evento.target.value)
    }

  
  function filtrarPeliculas(textoAFiltrar) {
    setpeliculasFiltradas(datos.filter((elm) => elm.title.toLowerCase().includes(textoAFiltrar.toLowerCase())))
  }

    return (
      <div>
        <form className="filter-form px-0 mb-3" onSubmit={(evento) => evitarSubmit(evento)}>
                    <label className="label-filtrar">
                        Filtrar pelicula: </label>
                    <input type="text" onChange={(evento)=> controlCambios(evento)} value={valor}/>
                </form>
        <h2 className="alert alert-danger">Películas</h2>
        <section className="cards">
          {
            peliculasFiltradas.length === 0
            ? <h3>Cargando...</h3>
            : peliculasFiltradas.map((elm, idx) => (
                  <Movie
                    key={idx}
                    dato={elm}
                  />
                ))
          }
        </section>

        {
          pagina < peliculasFiltradas.length
          ?
          <button onClick={() => cargarMas()} className="btn btn-danger">
            Cargar más
          </button>
          :
          null
        }
      </div>
    );
  }

export default Movies;