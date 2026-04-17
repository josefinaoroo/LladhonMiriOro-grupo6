import { Component } from "react";
import Cookies from "universal-cookie";
import Header from "../../componentes/Header/Header";

class CrearCuenta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",    //capturar lo que escribe el usuario en el input --> estado
      password: "",
      error: ""
    };
  }

  // que no se envíe el formulario
  enviarFormulario(event) {
    event.preventDefault();

    let usuarios = localStorage.getItem("usuarios"); 

    if (usuarios === null) {
    usuarios = [];
    } else {
    usuarios = JSON.parse(usuarios); //si hay --> lo convierte en un array
    }

    // para la validación de la contraseña
    if (this.state.password.length < 6) {
      return this.setState({
        error: "La contraseña debe tener mínimo 6 caracteres"
      });
    }

    // validación del email repetido
    let existe = false;

    for (let i = 0; i < usuarios.length; i++) { 
    if (usuarios[i].email === this.state.email) {
        existe = true;
    }
    }
    if (existe) {
      return this.setState({
        error: "El email ya está registrado"
      });
    }

    // crear usuario
    let nuevoUsuario = {
      email: this.state.email,
      password: this.state.password
    };

    usuarios.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // aca se limpia el form
    this.setState({
      email: "",
      password: "",
      error: ""
    });

    alert("¡Cuenta creada con éxito!");
    this.props.history.push("/login");
  }

  controlarEmail(event) {
    this.setState({
      email: event.target.value,
      error: ""
    });
  }

  controlarPassword(event) {
    this.setState({
      password: event.target.value,
      error: ""
    });
  }

  render() {
    return (
        <>
        <Header/>
        <h2 className="alert alert-danger">Registrarse</h2>
        <div className="row justify-content-center">
            <div className="col-md-6">
                <form onSubmit={(event) => this.enviarFormulario(event)}>
                    <div className="form-group">
                        <input type="email" placeholder="Email" className="form-control"value={this.state.email}
                            onChange={(event) => this.controlarEmail(event)}/>
                    </div>
                    <div>
                        <input type="password" placeholder="Password" className="form-control" value={this.state.password}
                            onChange={(event) => this.controlarPassword(event)}/>
                    </div>
                    <button type="submit" className="btn btn-danger btn-block">Crear cuenta</button>
                </form>
                <p class="mt-3 text-center">¿Ya tenés cuenta? <a href="/login">Iniciar sesión</a></p>
            </div>
         {this.state.error !== "" ? <p>{this.state.error}</p> : null}
        </div>
        </>
        
    );
  }
}

export default CrearCuenta;