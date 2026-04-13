import React, { Component } from "react";
import "./NowPlaying.css";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import Movie from "../Movie/Movie";


class NowPlaying extends Component {
  constructor(props) {
    super(props);
    this.state = {
    datos: [],
    valor: "",
    loading: true
  };
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=22424f1be1f9ca8ae9a2dba99019226a&language=es-ES")
      .then(response => response.json())
      .then(data => {
        let peliculas = data.results.slice(0,4);
        let pelidescri= peliculas.map(function(peli){
          peli.verdescripcion= false;
          return peli;
        })
         this.setState({
          datos: pelidescri,
          loading: false
        });
        
      })
      .catch(error => console.log(error));
  }

  evitarSubmit(event) {
    event.preventDefault();
  }

  controlarCambios(event) {
    this.setState({
      valor: event.target.value
    });
  }
  verDescripcion(id){
    let peliculasModificadas = this.state.datos.map(function(peli){
      if (peli.id === id){
        peli.verdescripcion = !peli.verdescripcion;
      }
      return peli;
    })
    this.setState({
      datos: peliculasModificadas
    })
    }

  
render() {
    let peliculasFiltradas = this.state.datos.filter(elm =>
      elm.title.toLowerCase().includes(this.state.valor.toLowerCase())
    );

    return (
      <>
        <h2 className="alert alert-danger">Películas en Cartelera</h2>
            <section className="cards" id="">
          {
            this.state.datos.length === 0
              ? <Loader/>
              : peliculasFiltradas.map((elm, idx) => (
                  <Movie
                    key={idx}
                    dato={elm}
                  />
                  
                )) 
          }
          <a href="/movies" className="btn btn-danger">Ver todas</a>
        </section>
      </>
    );
  }
}

export default NowPlaying;