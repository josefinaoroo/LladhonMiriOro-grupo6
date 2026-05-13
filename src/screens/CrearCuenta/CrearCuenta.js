import { useState } from "react";
import Header from "../../componentes/Header/Header";

function CrearCuenta(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function enviarFormulario(event) {
    event.preventDefault();

    let usuarios = localStorage.getItem("usuarios");

    if (usuarios === null) {
      usuarios = [];
    } else {
      usuarios = JSON.parse(usuarios);
    }

    if (password.length < 6) {
      return setError("La contraseña debe tener mínimo 6 caracteres");
    }

    let existe = usuarios.filter(usuario => usuario.email === email);

    if (existe.length > 0) {
      return setError("El email ya está registrado");
    }

    let nuevoUsuario = {
      email: email,
      password: password
    };

    usuarios.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    setEmail("");
    setPassword("");
    setError("");

    alert("¡Cuenta creada con éxito!");
    props.history.push("/login");
  }

  function controlarEmail(event) {
    setEmail(event.target.value);
    setError("");
  }

  function controlarPassword(event) {
    setPassword(event.target.value);
    setError("");
  }

  return (
    <>
      <Header />
      <h2 className="alert alert-danger">Registrarse</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={(event) => enviarFormulario(event)}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(event) => controlarEmail(event)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(event) => controlarPassword(event)}
              />
            </div>
            <button type="submit" className="btn btn-danger btn-block">
              Crear cuenta
            </button>
          </form>
          <p className="mt-3 text-center">
            ¿Ya tenés cuenta? <a href="/login">Iniciar sesión</a>
          </p>
        </div>
        {error !== "" ? <p>{error}</p> : null}
      </div>
    </>
  );
}

export default CrearCuenta;