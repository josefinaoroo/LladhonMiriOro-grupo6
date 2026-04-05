import React, { Component } from "react";
import "./NowPlaying.css"

class NowPlaying extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [],
      valor: ""
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
        <h2 className="alert alert-primary">Películas en cartel</h2>

        <a href="peliculasencartel" className="btn btn-info">Ver todas</a>

        <section className="cards" id="">
          {
            this.state.datos.length === 0
              ? <h3>Cargando...</h3>
              : peliculasFiltradas.map((elm, idx) => (
                  <article className="single-card-movie" key={idx}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${elm.poster_path}`}
                      className="card-img-top"
                      alt={elm.title}
                    />
                    <div className="cardBody">
                      <h5 className="card-title">{elm.title}</h5>

                      <button onClick={() => this.verDescripcion(elm.id)}>
                        {elm.verdescripcion ? "Ver menos" : "Descripción"}
                      </button>

                      {elm.verdescripcion ? <p className="card-text">{elm.overview}</p> : null}

                      <a href={`movie.html?id=${elm.id}`} className="btn btn-primary">
                        Ir a detalle
                      </a>
                    </div>
                  </article>
                ))
          }
        </section>
      </>
    );
  }
}

export default NowPlaying;