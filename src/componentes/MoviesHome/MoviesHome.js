import React, { Component } from "react";
import "./MoviesHome.css"
import Movie from "../Movie/Movie";
import Loader from "../Loader/Loader";


class MoviesHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [],
      valor: "",
    };
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=22424f1be1f9ca8ae9a2dba99019226a&language=es-ES")
      .then(response => response.json())
      .then(data => {
        let peliculas = data.results.slice(0,4);
        let pelidescri= peliculas.map(function(peli){
          peli.verdescripcion= false;
          return peli;
        })
         this.setState({
            datos: pelidescri
          })
        
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

  
render() {
    let peliculasFiltradas = this.state.datos.filter(elm =>
      elm.title.toLowerCase().includes(this.state.valor.toLowerCase())
    );
    console.log(peliculasFiltradas);
    

    return (
      <>
        <h2 className="alert alert-danger">Películas más populares</h2>
        <section className="cards">
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
        </section>
        <a href="/moviesscreen" className="btn btn-danger">Ver todas</a>
      </>
    );
  }
}

export default MoviesHome;