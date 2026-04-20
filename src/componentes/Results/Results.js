
import React, {Component} from "react";
import Header from "../Header/Header.js";

//Se importa el componente pelicula, que se renderiza si lo que se busca coincide con algo
import Loader from "../Loader/Loader.js";
import Movie from "../Movie/Movie.js";


//Se crea un componente con estado.
//El super lo que hace es que conecta con el componente padre y toma las props. Nos permite usar el this.props. 
//Elc componente tiene un estado que tiene la variable resultados donde van a ir los elementos de la API que coincidan con lo que se esta buscando. 
class Results extends Component{   
    constructor(props) {
        super(props);
        this.state = {
            resultados: [],

        };
    }

    //Cuando se carga por primera vez el componente, se crea las variable de lo que se busco y el tipo que se selecciono.
    //Luego se hace el fetch de la API con un endpoint modificado dependiendo de lo que se busco. Eso se guarda todo en el estado para despues recorrerlo

    componentDidMount() {
        const busqueda = this.props.match.params.busqueda; 
        const tipo = this.props.match.params.tipo; 
        
        fetch(`https://api.themoviedb.org/3/search/${tipo}?query=${busqueda}&api_key=a016baaa9f1f222d6f473a9acae180a0`)
            .then(res => res.json())
            .then(data => {
                if(data.results){
                    this.setState({
                        resultados: data.results,
                        
                    });
                }
            })
            .catch(err => console.log(err));
    }

    //El render tiene un if ternario, si en el estado no hay nada muestra el loader, si si hay algo muestra el componente pelicula. 
    render(){
    return (
        <>
        <Header />
        <section className="row cards">
            {this.state.resultados.length === 0 ?
            <Loader/>:
            this.state.resultados.map((elm, idx) => (
            <Movie key={idx} dato={elm} />
))
        }
        </section>
        </>
        );
    
}}

export default Results