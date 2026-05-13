import { useState } from "react";
import Cookies from "universal-cookie";
import Header from "../../componentes/Header/Header";

const cookies = new Cookies();

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function iniciarSesion(e) {
    e.preventDefault();

    let usuarios = localStorage.getItem("usuarios");

    if (usuarios !== null) {
      usuarios = JSON.parse(usuarios);
    } else {
      usuarios = [];
    }

    let usuarioCorrecto = usuarios.filter(
      usuario => usuario.email === email && usuario.password === password
    );

    if (usuarioCorrecto.length === 0) {
      setError("Credenciales incorrectas");
      return;
    }

    cookies.set("user", email, { path: "/" });

    setEmail("");
    setPassword("");
    setError("");

    props.history.push("/");
  }

  return (
    <>
      <Header />
      <h2 className="alert alert-danger">Iniciar sesión</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={(e) => iniciarSesion(e)}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-danger btn-block">
              Ingresar
            </button>
            <p className="mt-3 text-center">
              ¿No tenés cuenta? <a href="/crearcuenta">Registrarse</a>
            </p>
            {error !== "" ? <p>{error}</p> : null}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;