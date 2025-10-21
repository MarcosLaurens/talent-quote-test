import { useState } from "react";
import "./App.css";

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  const obtenerProductos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://appluis.app.n8n.cloud/webhook/94de3f6f-f053-4214-b996-542a6141ff4c"
      );

      if (!response.ok) throw new Error("Error al obtener usuarios");

      const data = await response.json();
      const dataArr = [data];
      setProductos(dataArr);
    } catch (error) {
      console.error(error);
      alert("Hubo un error al obtener los usuarios");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Prueba Talent Quote</h1>
      <button onClick={obtenerProductos} className="btn">
        {loading ? "Cargando..." : "Obtener usuarios"}
      </button>
      <div className="containeraa">
        {productos.length > 0
          ? productos.map((prod, index) => (
              <div key={index} className="card">
                <span>id: {prod.id}</span>
                <span>nombre: {prod.name}</span>
                <span>email: {prod.email}</span>
                <span>estado: {prod.state}</span>
              </div>
            ))
          : !loading && <p>No hay usuarios aún</p>}
      </div>
    </div>
  );
}

export default App;
