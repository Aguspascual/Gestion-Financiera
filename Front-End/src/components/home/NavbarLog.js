import './NavbarLogStyles.css'
import  Logo  from "../../assets/logo-tam-1.png";
import { Link } from "react-router-dom";

function NavbarLog() {
  return (
    <>
      <nav className="navbar">
      <div className="navbar-logo">
          <Link to="/"
          onClick={() => {
            window.location.href = "/";
          }}
          >
          <img src={Logo} alt="Logo STATS" />
          </Link>
          <h2 className="nombre">STATS</h2> 
        </div>
      </nav>
    </>
  )
}

export default NavbarLog