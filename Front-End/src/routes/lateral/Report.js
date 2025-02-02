import Lateral from "../../components/lateral/Lateral";
import Reporte from "../../components/lateral/Reporte";
import './../General.css';

function Report() {
  return (
    <>
      <div className="app-container">
        <Lateral />
        <main className="main-content">
          <Reporte />
        </main>
      </div>
    </>
  );
}

export default Report;
