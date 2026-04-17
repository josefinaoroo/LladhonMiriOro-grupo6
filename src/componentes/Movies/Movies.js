import React, { Component } from "react";
import Movie from "../Movie/Movie";
import "./Movies.css"

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [],
      peliculasFiltradas: [],
      valor: "",
      pagina: 1
    };
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=22424f1be1f9ca8ae9a2dba99019226a&language=es-ES&page=${this.state.pagina}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          datos: data.results,
          peliculasFiltradas: data.results,
          pagina: 2
        });
      })
      .catch(error => console.log(error));
  }

  cargarMas() { 
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=22424f1be1f9ca8ae9a2dba99019226a&language=es-ES&page=${this.state.pagina}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          datos: this.state.datos.concat(data.results),
          peliculasFiltradas: this.state.peliculasFiltradas.concat(data.results),
          pagina: this.state.pagina + 1
        });
      })
      .catch(error => console.log(error));
  }
  evitarSubmit(evento) {
    evento.preventDefault();
  }
  controlCambios(evento){
        this.setState({
            valor: evento.target.value
        },() => this.filtrarPeliculas(this.state.valor)
        )
    }

  
  filtrarPeliculas(textoAFiltrar) {
    this.setState({
      peliculasFiltradas: this.state.datos.filter((elm) => elm.title.toLowerCase().includes(textoAFiltrar.toLowerCase()))
    });
  }

  render() {
    return (
      <div>
        <form className="filter-form px-0 mb-3" onSubmit={(evento) => this.evitarSubmit(evento)}>
                    <label className="label-filtrar">
                        Filtrar pelicula: </label>
                    <input type="text" onChange={(evento)=> this.controlCambios(evento)}/>
                </form>
        <h2 className="alert alert-danger">Películas</h2>
        <section className="cards">
          {
            this.state.peliculasFiltradas.length === 0
            ? <h3>Cargando...</h3>
            : this.state.peliculasFiltradas.map((elm, idx) => (
                  <Movie
                    key={idx}
                    dato={elm}
                  />
                ))
          }
        </section>

        {
          this.state.pagina < this.state.peliculasFiltradas.length
          ?
          <button onClick={() => this.cargarMas()} className="btn btn-danger">
            Cargar más
          </button>
          :
          null
        }
      </div>
    );
  }
}

export default Movies;