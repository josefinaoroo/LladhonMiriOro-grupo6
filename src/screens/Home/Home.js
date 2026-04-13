import React, { Component } from "react";
import MoviesHome from "../../componentes/MoviesHome/MoviesHome";
import NowPlaying from "../../componentes/NowPlaying/NowPlaying";

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
        <form
          className="filter-form px-0 mb-3"
          onSubmit={(event) => this.enviarBusqueda(event)}
        >
          <input
            type="text"
            placeholder="Buscar"
            onChange={(event) => this.controlarCambios(event)}
            value={this.state.valor}
          />
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