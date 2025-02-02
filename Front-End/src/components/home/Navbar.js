import { Component } from "react";
import "./NavbarStyles.css";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo-tam-1.png";

class Navbar extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <nav className="NavbarItems">
        <div className="navbar-logo">
          <Link to="/">
            <img src={Logo} alt="Logo STATS" />
          </Link>
        </div>

        {/* Icono del menú hamburguesa */}
        <div className="menu-icons" onClick={this.handleClick}>
          <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        {/* Menú desplegable en móviles */}
        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.url} className={item.cName}>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Botón Iniciar Sesión solo visible en móvil dentro del menú hamburguesa */}
        <div className="button-container">
          <Link to="/login">
            <button className="btnIniciar">Iniciar Sesión</button>
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;
