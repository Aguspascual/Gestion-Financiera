import Lateral from "../../components/lateral/Lateral";
import Egreso1 from "../../components/lateral/Egreso-1";
import './../General.css';

function Egreso() {
  return (
    <>
      <div className="app-container">
        <Lateral />
        <main className="main-content">
          <Egreso1/>
        </main>
      </div>
    </>
  );
}

export default Egreso;
