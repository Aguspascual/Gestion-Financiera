import Lateral from "../../components/lateral/Lateral";
import Ingreso1 from "../../components/lateral/Ingreso-1"
import './../General.css';

function Ingreso() {
  return (
    <>
      <div className="app-container">
        <Lateral />
        <main className="main-content">
          <Ingreso1/>
        </main>
      </div>
    </>
  );
}

export default Ingreso;
