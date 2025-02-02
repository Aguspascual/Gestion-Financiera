import Lateral from "../../components/lateral/Lateral";
import ChangePassword from "../../components/lateral/ChangePassword";
import './../General.css';

function ChangePassword1() {
  return (
    <>
      <div className="app-container">
        <Lateral />
        <main className="main-content">
          <ChangePassword/>
        </main>
      </div>
    </>
  );
}

export default ChangePassword1;