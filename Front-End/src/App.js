import './styles.css';
import Home from './routes/home/Home';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './routes/auth/LoginPage';
import SignUpPage from './routes/auth/SignUpPage';
import Dashboard from './routes/lateral/Dashboard';
import Historial from './routes/lateral/Historial';
import Egreso from './routes/lateral/Egreso';
import Ingreso from './routes/lateral/Ingreso';
import RestorePage from './routes/auth/Restore';
import RestorePassword from './routes/auth/RestorePassword';
import Report from './routes/lateral/Report';
import Calificacion from './routes/lateral/Calificacion';
import ChangePassword1 from './routes/lateral/ChangePassword1';


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path ="/" element={<Home/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/historial" element={<Historial/>}/>
          <Route path="/egreso" element={<Egreso/>}/>
          <Route path="/ingreso" element={<Ingreso/>}/>
          <Route path="/restore" element={<RestorePage />} />
          <Route path="/restore-password" element={<RestorePassword/>} />
          <Route path="/report" element={<Report/>} />
          <Route path="/calificacion" element={<Calificacion/>} />
          <Route path="/restablecerContraseña" element={<ChangePassword1/>} />
        </Routes>
    </div>
  );
}

export default App;
