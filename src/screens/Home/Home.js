import React, { Component } from "react";
import MoviesHome from "../../componentes/MoviesHome/MoviesHome";
import NowPlaying from "../../componentes/NowPlaying/NowPlaying";
import Header from "../../componentes/Header/Header";
import Search from "../Search/Search";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valor: ""
    };
  }

  enviarBusqueda(event) {
  event.preventDefault();

  this.props.history.push(`/results/movie/${this.state.valor}`);
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
        <Search />
        <main>
          <MoviesHome />
          <NowPlaying />
        </main>
      </>
    );
  }
}

export default Home;