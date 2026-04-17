import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./screens/Login/Login";
import Home from "./screens/Home/Home";
import Favoritos from "./screens/Favoritos/Favoritos";
import NotFound from "./componentes/NotFound/NotFound";
import Footer from "./componentes/Footer/Footer";
import CrearCuenta from "./screens/CrearCuenta/CrearCuenta";
import Detalle from "./screens/Detalle/Detalle";
import SearchResults from "./screens/SearchResults/SearchResults";
import MoviesScreen from "./screens/MoviesScreen/MoviesScreen";
import MoviesScreenCartelera from "./screens/MoviesCarteleraScreen/MoviesCarteleraScreen";

//recordar login /:busqueda --> esto es para obtener la info que ingresa el usuario
//chequear que se pone en notfound (habiamos puesto estrellita)

function App() {
  return (
    <>
    <React.Fragment>
      <Switch>
        <Route path="/" exact= {true} component={Home}/>
        <Route path="/moviesscreen" component={MoviesScreen}/>
        <Route path="/moviesscreencartelera" component={MoviesScreenCartelera}/>
        <Route path="/login" component={Login}/> 
        <Route path="/favoritos" component={Favoritos}/>
        <Route path="/crearcuenta" component={CrearCuenta}/>
        <Route path="/detalle/:id" component={Detalle} />
        <Route path="/search" component={SearchResults}/>
        <Route component={NotFound}/>

      </Switch>
      <Footer/>
    </React.Fragment>
   </>
  );
}

export default App;
