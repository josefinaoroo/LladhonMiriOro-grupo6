import React, { useState, useEffect } from "react";
import "./NowPlaying.css";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import Movie from "../Movie/Movie";


function NowPlaying(props){
  const [datos, setdatos] = useState ([])
  const [valor, setvalor] = useState ("")
  const [loading, setloading] = useState (true)

  useEffect(
    () => {
      fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=22424f1be1f9ca8ae9a2dba99019226a&language=es-ES")
      .then(response => response.json())
      .then(data => {
        let peliculas = data.results.slice(0,4);
        let pelidescri= peliculas.map(function(peli){
          peli.verdescripcion= false;
          return peli;
        })
        setdatos(pelidescri)
        setloading(false)
      })
      .catch(error => console.log(error));
    }, []
  ) 
  function evitarSubmit(event) {
    event.preventDefault();
  }

  function controlarCambios(event) {
    setvalor(event.target.value)
  }
  
  function verDescripcion(id){
    let peliculasModificadas = datos.map(function(peli){
      if (peli.id === id){
        peli.verdescripcion = !peli.verdescripcion;
      }
      return peli;
    })
    setdatos (peliculasModificadas)
    }
    
    let peliculasFiltradas = datos.filter(elm =>
      elm.title.toLowerCase().includes(valor.toLowerCase())
    );

    return (
      <>
        <h2 className="alert alert-danger">Películas en Cartelera</h2>
            <section className="cards" id="">
          {
            datos.length === 0
              ? <Loader/>
              : peliculasFiltradas.map((elm, idx) => (
                  <Movie
                    key={idx}
                    dato={elm}
                  />
                  
                )) 
          }
          <a href="/moviesscreen" className="btn btn-danger">Ver todas</a>
        </section>
      </>
    );
  }


export default NowPlaying;