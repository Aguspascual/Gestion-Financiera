import Lateral from "../../components/lateral/Lateral";
import Calificar from "../../components/lateral/Calificar";
import './../General.css';

function Dashboard() {
  return (
    <>
      <div className="app-container">
        <Lateral />
        <main className="main-content">
          <Calificar  />
        </main>
      </div>
    </>
  );
}

export default Dashboard;
