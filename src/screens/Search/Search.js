import React, { Component } from "react";
import { withRouter } from "react-router-dom"; 

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            tipo: "movie"
        };
    }

    //El enviarcambios es una funcion que cuando se llama, evita el comportamiento default y ademas con el push history, me lleva la nueva pagina.
    //El push va a llevarnos a la pagina donde este lo que se busco y guardo en el estado con la funcion controlCambios(e)
    enviarCambios(e) {
        e.preventDefault();
        this.props.history.push(`/results/${this.state.tipo}/${this.state.value}`);
    }

    //Esta funcion lo que hace es que agarra el value de lo que se escribe en el input y lo guarda en el state. Este valor lo toma la funcion enviarCambios para llevarnos a la nueva pagina
    controlCambios(e) {
        this.setState({
            value: e.target.value
        });
    }
    // Controlo el valor del select
    controlSelect(e) {
        this.setState({ 
            tipo: e.target.value });
    }

    render() {
        return (
            <form onSubmit={(e) => this.enviarCambios(e)} className="search-form">
                <input 
                    type="text" 
                    onChange={(e) => this.controlCambios(e)} 
                    value={this.state.value}
                    className=""
                    name="searchData"
                />
                <button type="submit" className="btn btn-success btn-sm">Buscar</button>
                <select onChange={(e) => this.controlSelect(e)} value={this.state.tipo}>
                    <option value="movie">Películas</option>
                    <option value="tv">Series</option>
                </select>
            </form>
        ); 
            }

}

export default withRouter(Search);