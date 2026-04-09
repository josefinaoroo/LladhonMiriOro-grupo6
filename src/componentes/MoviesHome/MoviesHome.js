import React, { Component } from "react";
import "./MoviesHome.css";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

class MoviesHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [],
      valor: "",
      loading: true,
    };
  }
  //esto reenderiza cuando se monta la pagina
  //fetch: trae info API y desestructura apenas de abre todo lo de la API
  //DidUpdate: cuando hay un update en un componente --> no refresa todo, sino el componente
  //slice --> agarra de la API 4 peliculas 
  //pelidescri --> realiza un map de las peliculas que me trajo 
  componentDidMount() {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=22424f1be1f9ca8ae9a2dba99019226a&language=es-ES") 
      .then(response => response.json())
      .then(data => {
          this.setState(() => {

            let peliculas = data.results.slice(0,4);
            //le agregamos al array el atributo verdescripcion con valor false 
            let pelidescri = peliculas.map(function(peli){
            peli.verdescripcion = false;
            return peli
            
        });
        
        this.setState({
            datos: pelidescri,
            loading: false
        });

        },);
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
//como parametro --> id. a esa propia id nos fijamos el valor que tiene verdescripcion (atributo que agregamos arriba)
//compara el id y cambia el valor que tiene verdescripcion --> asi trabaja las tarjetas de manera autonoma
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
        <h2 className="alert alert-primary">Películas más populares</h2>

          <Link to="/peliculas" className="btn btn-info">Ver todas</Link>
        <section className="cards" id="">
          {
            this.state.datos.length === 0
              ? <Loader />
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

                      <Link to={`/detalle/${elm.id}`} className="btn btn-primary">
                        Ir a detalle
                      </Link>
                    </div>
                  </article>
                ))
          }
        </section>
      </>
    );
  }
}

export default MoviesHome;