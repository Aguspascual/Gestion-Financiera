import Lateral from "../../components/lateral/Lateral";
import Historial1 from "../../components/lateral/Historial1";
import './../General.css';

function Historial() {
  return (
    <>
      <div className="app-container">
        <Lateral />
        <main className="main-content">
          <Historial1 />
        </main>
      </div>
    </>
  );
}

export default Historial;
