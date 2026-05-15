import React, { useState } from "react";
import MoviesHome from "../../componentes/MoviesHome/MoviesHome";
import NowPlaying from "../../componentes/NowPlaying/NowPlaying";
import Header from "../../componentes/Header/Header";
import Search from "../Search/Search";

function Home (props){
  const [valor, setvalor] = useState ("")

  function enviarBusqueda(event) {
  event.preventDefault();

  props.history.push(`/results/movie/${valor}`);
}
  

  function controlarCambios(event) {
    setvalor(event.target.value)
  }
  
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


export default Home;