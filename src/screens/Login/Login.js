import React, { Component } from "react";
import Cookies from "universal-cookie";
import Header from "../../componentes/Header/Header";

const cookies = new Cookies();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  iniciarSesion(e) {
    e.preventDefault();

    let usuarios = localStorage.getItem("usuarios");

    if (usuarios !== null) {
      usuarios = JSON.parse(usuarios);
    } else {
      usuarios = [];
    }

    let usuarioCorrecto = usuarios.filter(usuario =>
      usuario.email === this.state.email &&
      usuario.password === this.state.password
    );

    if (usuarioCorrecto.length === 0) {
      this.setState({
        error: "Credenciales incorrectas"
      });
      return;
      ;
    }

    // GUARDAR COOKIE
    cookies.set("user", this.state.email, { path: "/" });

    // REDIRECCIÓN
    this.props.history.push("/");

    // limpiar
    this.setState({
      email: "",
      password: "",
      error: ""
    });
  }

  render() {
    return (
        <>
        <Header/>
          <h2 class="alert alert-danger">Iniciar sesión</h2>
        <div className= "row justify-content-center">
            <div class="col-md-6">
                 <form onSubmit={(e) => this.iniciarSesion(e)}>
                    <div className="form-group">
                        <input type="email" placeholder="Email" className="form-control" value={this.state.email} 
                        onChange={(e) => this.setState({ email: e.target.value })}/>
            </div>
            <div>
                <input type="password" placeholder="Password" className= "form-control"value={this.state.password}
                 onChange={(e) => this.setState({ password: e.target.value })}/>
            </div>

         <button type="submit" className="btn btn-danger btn-block">Ingresar</button>
         <p class="mt-3 text-center">¿No tenés cuenta? <a href="/crearcuenta">Registrarse</a></p>
        {this.state.error !== "" ? <p>{this.state.error}</p> : null}
      </form>
            </div>
        </div>
        
        </>
    )
  }
}

export default Login;