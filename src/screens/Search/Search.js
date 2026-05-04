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

    
    enviarCambios(e) {
        e.preventDefault();
        this.props.history.push(`/results/${this.state.tipo}/${this.state.value}`);
    }

   
    controlCambios(e) {
        this.setState({
            value: e.target.value
        });
    }
    
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
                <button type="submit" className="btn btn-danger btn-sm">Buscar</button>
                <select onChange={(e) => this.controlSelect(e)} value={this.state.tipo}>
                    <option value="movie">Películas</option>
                    <option value="tv">Series</option>
                </select>
            </form>
        ); 
            }

}

export default withRouter(Search);