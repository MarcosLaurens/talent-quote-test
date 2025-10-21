import { useState } from "react";
import "./App.css";

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  const obtenerProductos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://talentquotez.app.n8n.cloud/webhook/687b4a36-f018-41b3-afe3-16c7b6d5bd03"
      );

      if (!response.ok) throw new Error("Error al obtener productos");

      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error(error);
      alert("Hubo un error al obtener los productos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Prueba Talent Quote</h1>
      <button onClick={obtenerProductos} className="btn">
        {loading ? "Cargando..." : "Obtener productos"}
      </button>

      <div className="containeraa">
        {productos.length > 0 ? (
          productos.map((prod, index) => (
            <div key={index} className="card">
              <h3>{prod.title || prod.name || `Producto ${index + 1}`}</h3>
              <p>{prod.description || "Sin descripción"}</p>
              {prod.price && <p>💲{prod.price}</p>}
            </div>
          ))
        ) : (
          !loading && <p>No hay productos aún</p>
        )}
      </div>
    </div>
  );
}

export default App;
