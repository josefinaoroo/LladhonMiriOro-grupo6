import { useState } from "react";
import { withRouter } from "react-router-dom";

function Search(props) {
  const [value, setValue] = useState("");
  const [tipo, setTipo] = useState("movie");

  function enviarCambios(e) {
    e.preventDefault();
    props.history.push(`/results/${tipo}/${value}`);
  }

  function controlCambios(e) {
    setValue(e.target.value);
  }

  function controlSelect(e) {
    setTipo(e.target.value);
  }

  return (
    <form onSubmit={(e) => enviarCambios(e)} className="search-form">
      <input
        type="text"
        onChange={(e) => controlCambios(e)}
        value={value}
        name="searchData"
      />
      <button type="submit" className="btn btn-danger btn-sm">Buscar</button>
      <select onChange={(e) => controlSelect(e)} value={tipo}>
        <option value="movie">Películas</option>
        <option value="tv">Series</option>
      </select>
    </form>
  );
}

export default withRouter(Search);