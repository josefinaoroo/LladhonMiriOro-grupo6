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

  evitarSubmit(event) {
    event.preventDefault();
  }

  controlarCambios(event) {
    this.setState({
      valor: event.target.value
    });
  }

  render() {
    return (
      <>
        <form className="filter-form px-0 mb-3"action="" method="get" onSubmit={(event) => this.evitarSubmit(event)}>
          <input type="text" name="filter" placeholder="Buscar" onChange={(event) => this.controlarCambios(event)} value={this.state.valor}
          />
        </form>

        <main>
          <MoviesHome />
          <NowPlaying/>
        </main>
      </>
    );
  }
}

export default Home;