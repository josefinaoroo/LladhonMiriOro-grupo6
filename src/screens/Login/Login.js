import React, { Component } from "react";
import Cookies from "universal-cookie";

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
    }

    // 👉 GUARDAR COOKIE
    cookies.set("user-auth-cookie", this.state.email, { path: "/" });

    // 👉 REDIRECCIÓN
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
      <form onSubmit={(e) => this.iniciarSesion(e)}>
        <input
          type="email"
          value={this.state.email}
          onChange={(e) => this.setState({ email: e.target.value })}
        />

        <input
          type="password"
          value={this.state.password}
          onChange={(e) => this.setState({ password: e.target.value })}
        />

        <button type="submit">Ingresar</button>

        {this.state.error !== "" ? <p>{this.state.error}</p> : null}
      </form>
    );
  }
}

export default Login;