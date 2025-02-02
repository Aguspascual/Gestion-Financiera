import Lateral from "../../components/lateral/Lateral";
import Dashboard1 from "../../components/lateral/Dashboard1";
import './../General.css';

function Dashboard() {
  return (
    <>
      <div className="app-container">
        <Lateral />
        <main className="main-content">
          <Dashboard1  />
        </main>
      </div>
    </>
  );
}

export default Dashboard;
