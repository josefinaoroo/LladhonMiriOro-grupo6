import React, { Component } from "react";
import MoviesHome from "../../componentes/MoviesHome/MoviesHome";
import NowPlaying from "../../componentes/NowPlaying/NowPlaying";
import Header from "../../componentes/Header/Header";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valor: ""
    };
  }

  enviarBusqueda(event) {
  event.preventDefault();

  this.props.history.push(
    `/search?busqueda=${this.state.valor}`
  );
}
  

  controlarCambios(event) {
    this.setState({
      valor: event.target.value
    });
  }

  render() {
    return (
      <>
      <Header/>
        <form
          className="search-form"
          onSubmit={(event) => this.enviarBusqueda(event)}
        >
          <input
            type="text"
            placeholder="¿Qué estás buscando?"
            onChange={(event) => this.controlarCambios(event)}
            value={this.state.valor}
          />
          <button type="submit" className="btn btn-danger btn-sm">Buscar</button>
        </form>

        <main>
          <MoviesHome />
          <NowPlaying />
        </main>
      </>
    );
  }
}

export default Home;